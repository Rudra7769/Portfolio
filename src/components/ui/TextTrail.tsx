import React, { useEffect, useRef } from 'react';
import {
  CanvasTexture,
  Clock,
  OrthographicCamera,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
  LinearFilter,
} from 'three';

const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const loadFont = async (fam: string) => {
  // Ensure font is loaded before drawing
  // @ts-ignore
  if ('fonts' in document) await (document as any).fonts.load(`64px "${fam}"`);
};

const BASE_VERT = `
  varying vec2 v_uv;
  void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_uv = uv;
  }
`;

const SIMPLEX = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);} 
float snoise3(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 k0=vec4(lessThan(b0,0.));
  vec4 k1=vec4(lessThan(b1,0.));
  vec4 a0=b0-floor(b0+.5);
  vec4 a1=b1-floor(b1+.5);
  vec3 m0=max(.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.);
  vec3 m1=max(.5-vec3(dot(x3,x3)),0.);
  vec3 x0_=x0-a0.x*k0.x-a0.y*k0.y;
  vec3 x1_=x1-a0.z*k0.z-a0.w*k0.w;
  vec3 x2_=x2-a1.x*k1.x-a1.y*k1.y;
  vec3 x3_=x3-a1.z*k1.z-a1.w*k1.w;
  m0=m0*m0; m1=m1*m1;
  return 42.*(dot(m0*m0,vec3(dot(x0_,x0_),dot(x1_,x1_),dot(x2_,x2_)))+dot(m1*m1,vec3(dot(x3_,x3_))));
}`;

const MAIN_FRAG = `
  uniform sampler2D u_trail;
  uniform sampler2D u_text;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_intensity;
  varying vec2 v_uv;
  ${SIMPLEX}
  void main(){
    vec2 uv = v_uv;
    vec4 trail = texture2D(u_trail, uv);
    vec4 text = texture2D(u_text, uv);
    float noise = snoise3(vec3(uv * 10.0, u_time * 0.5));
    float trailMask = smoothstep(0.1, 0.9, trail.r);
    vec3 color = u_color;
    float alpha = text.a * trailMask * u_intensity;
    alpha *= 1.0 + 0.3 * sin(u_time * 3.0 + noise * 10.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

const TRAIL_FRAG = `
  uniform sampler2D u_prev;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_decay;
  varying vec2 v_uv;
  void main(){
    vec2 uv = v_uv;
    vec4 prev = texture2D(u_prev, uv);
    vec2 mouseUV = u_mouse / u_resolution;
    float dist = distance(uv, mouseUV);
    float brush = 1.0 - smoothstep(0.0, 0.1, dist);
    float trail = max(prev.r * u_decay, brush);
    gl_FragColor = vec4(trail, trail, trail, 1.0);
  }
`;

interface TextTrailProps {
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  intensity?: number;
  decay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TextTrail: React.FC<TextTrailProps> = ({
  text = 'HELLO',
  fontFamily = 'Arial',
  fontSize = 64,
  color = '#ffffff',
  intensity = 1.0,
  decay = 0.95,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WebGLRenderer>();
  const sceneRef = useRef<Scene>();
  const cameraRef = useRef<OrthographicCamera>();
  const materialRef = useRef<ShaderMaterial>();
  const trailMaterialRef = useRef<ShaderMaterial>();
  const trailTargetRef = useRef<WebGLRenderTarget>();
  const trailTarget2Ref = useRef<WebGLRenderTarget>();
  const textTextureRef = useRef<CanvasTexture>();
  const clockRef = useRef<Clock>();
  const mouseRef = useRef<Vector2>(new Vector2(0, 0));
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    const scene = new Scene();
    sceneRef.current = scene as any;

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const clock = new Clock();
    clockRef.current = clock;

    const createTextTexture = async () => {
      await loadFont(fontFamily);
      const textCanvas = document.createElement('canvas');
      textCanvas.width = width * window.devicePixelRatio;
      textCanvas.height = height * window.devicePixelRatio;
      const ctx = textCanvas.getContext('2d')!;
      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = `${fontSize * window.devicePixelRatio}px "${fontFamily}"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
      const texture = new CanvasTexture(textCanvas);
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      textTextureRef.current = texture;
      return texture;
    };

    const trailTarget = new WebGLRenderTarget(width, height, { minFilter: LinearFilter, magFilter: LinearFilter });
    trailTargetRef.current = trailTarget;
    const trailTarget2 = new WebGLRenderTarget(width, height, { minFilter: LinearFilter, magFilter: LinearFilter });
    trailTarget2Ref.current = trailTarget2;

    const trailMaterial = new ShaderMaterial({
      vertexShader: BASE_VERT,
      fragmentShader: TRAIL_FRAG,
      uniforms: {
        u_prev: { value: null },
        u_mouse: { value: mouseRef.current },
        u_resolution: { value: new Vector2(width * window.devicePixelRatio, height * window.devicePixelRatio) },
        u_time: { value: 0 },
        u_decay: { value: decay }
      }
    });
    trailMaterialRef.current = trailMaterial as any;

    createTextTexture().then(textTexture => {
      const [r, g, b] = hexToRgb(color);
      const material = new ShaderMaterial({
        vertexShader: BASE_VERT,
        fragmentShader: MAIN_FRAG,
        uniforms: {
          u_trail: { value: trailTarget.texture },
          u_text: { value: textTexture },
          u_time: { value: 0 },
          u_resolution: { value: new Vector2(width * window.devicePixelRatio, height * window.devicePixelRatio) },
          u_color: { value: new Vector3(r / 255, g / 255, b / 255) },
          u_intensity: { value: intensity }
        },
        transparent: true
      });
      materialRef.current = material as any;

      const geometry = new PlaneGeometry(2, 2);
      const mesh = new Mesh(geometry, material);
      (scene as any).add(mesh);
    });

    const renderFullscreen = (mat: ShaderMaterial) => {
      const geo = new PlaneGeometry(2, 2);
      const mesh = new Mesh(geo, mat);
      const tempScene = new Scene();
      tempScene.add(mesh);
      renderer.render(tempScene, camera);
      geo.dispose();
    };

    const animate = () => {
      const time = clock.getElapsedTime();

      if (trailMaterialRef.current && trailTargetRef.current && trailTarget2Ref.current) {
        trailMaterialRef.current.uniforms.u_time.value = time;
        trailMaterialRef.current.uniforms.u_prev.value = trailTargetRef.current.texture;
        renderer.setRenderTarget(trailTarget2Ref.current);
        renderFullscreen(trailMaterialRef.current);
        const tmp = trailTargetRef.current;
        trailTargetRef.current = trailTarget2Ref.current;
        trailTarget2Ref.current = tmp;
      }

      if (materialRef.current && trailTargetRef.current) {
        materialRef.current.uniforms.u_time.value = time;
        materialRef.current.uniforms.u_trail.value = trailTargetRef.current.texture;
      }

      renderer.setRenderTarget(null);
      if (scene && camera) renderer.render(scene as any, camera);

      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (event.clientX - r.left) * window.devicePixelRatio;
      const y = (r.height - (event.clientY - r.top)) * window.devicePixelRatio;
      mouseRef.current.set(x, y);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, r.width);
      const h = Math.max(1, r.height);
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      renderer.setSize(w, h, false);
      if (trailMaterialRef.current) {
        trailMaterialRef.current.uniforms.u_resolution.value = new Vector2(w * window.devicePixelRatio, h * window.devicePixelRatio);
      }
      if (materialRef.current) {
        materialRef.current.uniforms.u_resolution.value = new Vector2(w * window.devicePixelRatio, h * window.devicePixelRatio);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      renderer.dispose();
      trailTargetRef.current?.dispose();
      trailTarget2Ref.current?.dispose();
      textTextureRef.current?.dispose();
    };
  }, [text, fontFamily, fontSize, color, intensity, decay]);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};

export default TextTrail;
