import React, { useEffect, useMemo, useRef, useState } from 'react';

// A globe-like skills visualization with a glowing center, orbital rings,
// skill icons arranged along the top, and bezier connections to the core.
// Designed to visually match the provided reference.

export type SkillIcon = {
  src: string;
  alt: string;
};

interface SkillsGlobeProps {
  iconsTop?: SkillIcon[]; // icons shown in the top row
  iconsRings?: SkillIcon[]; // small icons distributed along the rings
  // Back-compat: if `icons` is provided we use it as iconsTop
  icons?: SkillIcon[];
  className?: string;
}

const DEFAULT_TOP_ICONS: SkillIcon[] = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', alt: 'Figma' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', alt: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', alt: 'Express' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', alt: 'Next.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', alt: 'TailwindCSS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', alt: 'Docker' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', alt: 'Git' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', alt: 'GitHub' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', alt: 'Vite' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg', alt: 'C' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', alt: 'C++' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', alt: 'Python' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg', alt: 'Redux' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', alt: 'Prisma' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', alt: 'HTML5' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', alt: 'CSS3' },
];

const DEFAULT_RING_ICONS: SkillIcon[] = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', alt: 'TailwindCSS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', alt: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', alt: 'Vite' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', alt: 'Express' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', alt: 'Docker' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', alt: 'GitHub' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', alt: 'Git' },
];

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const SkillsGlobe: React.FC<SkillsGlobeProps> = ({ iconsTop, iconsRings, icons, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1000, h: 700 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const topIcons = iconsTop ?? icons ?? DEFAULT_TOP_ICONS;
  const ringIcons = iconsRings ?? DEFAULT_RING_ICONS;

  const layout = useMemo(() => {
    const { w, h } = size;
    const centerX = w / 2;
    const baseY = h * 0.78; // base of orb and rings
    const orbR = clamp(Math.min(w, h) * 0.15, 120, 220);

    // Two rows of icons at top, slightly staggered
    const iconSize = clamp(Math.min(w, h) * 0.08, 48, 72);
    const rowGap = iconSize * 1.2;
    const topY0 = h * 0.12; // first row Y
    const topY1 = topY0 + rowGap; // second row Y

    // split icons into two rows with equal counts
    // If the total is odd, drop the last icon to keep rows perfectly even
    const total = topIcons.length;
    const perRow = Math.floor(total / 2);
    const usable = perRow * 2;
    const trimmed = topIcons.slice(0, usable);
    const rowA = trimmed.slice(0, perRow);
    const rowB = trimmed.slice(perRow, usable);

    const pad = Math.max(24, w * 0.08);
    const stepA = rowA.length > 1 ? (w - pad * 2) / (rowA.length - 1) : 0;
    const stepB = rowB.length > 1 ? (w - pad * 2) / (rowB.length - 1) : 0;

    const itemsA = rowA.map((_, i) => ({ x: pad + stepA * i, y: topY0 }));
    // small horizontal offset for second row for a staggered look
    const offset = (rowB.length > 1 ? stepB : 0) * 0.5;
    const itemsB = rowB.map((_, i) => ({ x: pad + offset + stepB * i, y: topY1 }));

    // bezier connector end target just above orb
    const targetY = baseY - orbR * 0.65;

    return {
      centerX,
      baseY,
      orbR,
      iconSize,
      rows: [itemsA, itemsB],
      topYs: [topY0, topY1],
      targetY,
    };
  }, [size, topIcons.length]);

  const stroke = 'rgba(97, 255, 102, 0.55)'; // #61FF66 with opacity
  const strokeSoft = 'rgba(97, 255, 102, 0.25)';

  // Wave animation states
  const [waveOffset, setWaveOffset] = useState(0);
  const [ringTime, setRingTime] = useState(0); // seconds elapsed for ring rotation
  const animationRef = useRef<number>();

  useEffect(() => {
    // Wave moves left->right then right->left by oscillating the phase over time
    // phase = A * sin(omega * t)
    const PHASE_AMPLITUDE = Math.PI * 2;     // how far the phase swings (radians)
    const DIRECTION_SPEED = 0.35;            // how fast it switches direction
    let start = performance.now();
    const animate = (timestamp: number) => {
      const elapsed = (timestamp - start) / 1000;
      const phase = PHASE_AMPLITUDE * Math.sin(elapsed * DIRECTION_SPEED);
      setWaveOffset(phase);
      setRingTime(elapsed);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Calculate wave displacement for icons
  const getWaveDisplacement = (x: number, baseY: number, amplitude = 25) => {
    // Create a wave that moves from left to right
    const waveX = (x / size.w) * Math.PI * 3; // 3 wavelengths across width
    const displacement = Math.sin(waveX - waveOffset) * amplitude;
    return { x, y: baseY + displacement };
  };

  // Animated connector with wave motion
  const AnimatedWaveConnector: React.FC<{
    originalStart: { x: number; y: number };
    waveStart: { x: number; y: number };
    centerX: number;
    targetY: number;
    isSecond: boolean;
    idx: number;
    size: { w: number; h: number };
    stroke: string;
  }> = ({ originalStart, waveStart, centerX, targetY, isSecond, idx, size, stroke }) => {
    const bend = isSecond ? 0.24 : 0.18;
    
    // Control points that follow the wave motion
    const c1x = waveStart.x;
    const c1y = waveStart.y + size.h * (isSecond ? 0.22 : 0.26);
    const c2x = centerX + (waveStart.x - centerX) * bend;
    const c2y = targetY - size.h * 0.09;

    const d = `M ${waveStart.x} ${waveStart.y + layout.iconSize * 0.5} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${centerX} ${targetY}`;

    return (
      <path
        d={d}
        stroke={stroke}
        strokeWidth={1.4}
        fill="none"
        strokeDasharray="5,5"
        style={{
          strokeDashoffset: waveOffset * 60 + idx * 10
        }}
      />
    );
  };

  return (
    <div
      ref={ref}
      className={`relative w-full h-[720px] md:h-[760px] ${className ?? ''}`}
>
      {/* Local animation keyframes */}
      <style>{`
        @keyframes starPulse { 
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(97,255,102,.5)) drop-shadow(0 0 16px rgba(97,255,102,.35)); }
          50% { transform: scale(1.06); filter: drop-shadow(0 0 18px rgba(97,255,102,.85)) drop-shadow(0 0 28px rgba(97,255,102,.55)); }
        }
        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitRotateReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes tentacleFloat {
          0%, 100% { stroke-dashoffset: 0; }
          50% { stroke-dashoffset: 20; }
        }
      `}</style>
      {/* SVG overlay for lines, connectors and rings */}
      <svg className="absolute inset-0" width="100%" height="100%" viewBox={`0 0 ${size.w} ${size.h}`}>
        {/* Wave-animated connectors from icons to orb */}
        {layout.rows.flat().map((pt, idx) => {
          const wavePosition = getWaveDisplacement(pt.x, pt.y, 15);
          return (
            <AnimatedWaveConnector
              key={`curve-${idx}`}
              originalStart={pt}
              waveStart={wavePosition}
              centerX={layout.centerX}
              targetY={layout.targetY}
              isSecond={idx >= layout.rows[0].length}
              idx={idx}
              size={size}
              stroke={strokeSoft}
            />
          );
        })}

        {/* Orbital rings (ellipses) - solid complete rings */}
        {[1, 0.75, 0.5].map((scale, i) => {
          const rx = Math.max(layout.orbR * 2.2 * scale, layout.orbR * 1.2);
          const ry = layout.orbR * 0.75 * scale;
          return (
            <ellipse
              key={`ring-${i}`}
              cx={layout.centerX}
              cy={layout.baseY}
              rx={rx}
              ry={ry}
              stroke={stroke}
              strokeWidth={1.5}
              fill="none"
              opacity={0.5 - i * 0.08}
            />
          );
        })}
      </svg>

      {/* Glowing center sphere - reduced size */}
      <div
        className="absolute"
        style={{
          left: `${layout.centerX}px`,
          top: `${layout.baseY}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer glow layers */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            width: `${layout.orbR * 1.8}px`,
            height: `${layout.orbR * 1.8}px`,
            background: 'radial-gradient(circle, rgba(97,255,102,0.3) 0%, rgba(97,255,102,0.1) 40%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            animation: 'glowPulse 3s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            width: `${layout.orbR * 1.4}px`,
            height: `${layout.orbR * 1.4}px`,
            background: 'radial-gradient(circle, rgba(97,255,102,0.4) 0%, rgba(97,255,102,0.2) 50%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            animation: 'glowPulse 2s ease-in-out infinite',
          }}
        />
        {/* Main glowing sphere - smaller */}
        <div
          className="rounded-full relative"
          style={{
            width: `${layout.orbR * 1.1}px`,
            height: `${layout.orbR * 1.1}px`,
            background: 'radial-gradient(circle at 35% 35%, rgba(200,255,200,0.9), rgba(97,255,102,0.95) 40%, rgba(50,180,55,0.8))',
            boxShadow: `
              0 0 ${layout.orbR * 0.4}px rgba(97,255,102,0.8),
              0 0 ${layout.orbR * 0.8}px rgba(97,255,102,0.6),
              0 0 ${layout.orbR * 1.2}px rgba(97,255,102,0.4),
              inset 0 0 ${layout.orbR * 0.3}px rgba(255,255,255,0.3)
            `,
            animation: 'starPulse 4s ease-in-out infinite',
          }}
        >
        </div>
      </div>

      {/* Top icons in two rows - with wave animation */}
      {layout.rows.flat().map((pt, idx) => {
        const ic = topIcons[idx];
        if (!ic) return null;
        
        // Apply wave motion to icon position
        const wavePosition = getWaveDisplacement(pt.x, pt.y, 20);
        
        return (
          <div
            key={ic.alt + idx}
            className="absolute rounded-full bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-sm transition-transform duration-75"
            style={{
              left: wavePosition.x - layout.iconSize / 2,
              top: wavePosition.y - layout.iconSize / 2,
              width: layout.iconSize,
              height: layout.iconSize,
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-white/0" />
            <img
              src={ic.src}
              alt={ic.alt}
              className="w-2/3 h-2/3 object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              loading="lazy"
            />
          </div>
        );
      })}

      {/* Small icons distributed along the rings (left and right clusters only) */}
      <div className="absolute inset-0 pointer-events-none">
        {(() => {
          const ringScales = [1, 0.75, 0.5];
          const spinSpeeds = [12, 9, 6]; // deg/sec, clockwise
          const perRingCounts = [4, 3, 2]; // reduced icons per ring (about half)
          const sizePx = clamp(Math.min(size.w, size.h) * 0.022, 10, 16);
          const nodes: React.ReactNode[] = [];
          let idx = 0;
          ringScales.forEach((scale, r) => {
            const rx = Math.max(layout.orbR * 2.2 * scale, layout.orbR * 1.2);
            const ry = layout.orbR * 0.75 * scale;
            const offsetDeg = -ringTime * spinSpeeds[r]; // negative for clockwise
            // Distribute icons evenly around the FULL ring (360°)
            const count = perRingCounts[r];
            const step = count > 0 ? 360 / count : 0;
            for (let j = 0; j < count; j++) {
              const deg = (j * step + offsetDeg) % 360;
              const th = (deg * Math.PI) / 180;
              const x = layout.centerX + rx * Math.cos(th);
              const y = layout.baseY + ry * Math.sin(th);
              const icon = ringIcons[idx++ % ringIcons.length];
              nodes.push(
                <div key={`ring-${r}-${j}`} className="absolute"
                     style={{ left: x - sizePx / 2, top: y - sizePx / 2, width: sizePx, height: sizePx }}>
                  <img src={icon.src} alt={icon.alt}
                       style={{ filter: 'grayscale(1) saturate(0) contrast(1.05) brightness(1.05)', opacity: 0.55 }}
                       className="w-full h-full object-contain" />
                </div>
              );
            }
          });
          return nodes;
        })()}
      </div>

    </div>
  );
};

export default SkillsGlobe;

