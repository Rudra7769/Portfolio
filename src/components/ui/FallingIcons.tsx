import { useEffect, useRef } from "react";
import Matter from "matter-js";

const allIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
];

const FallingIcons = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // 🧠 Setup engine & world
    const engine = Engine.create();
    engine.world.gravity.y = 0.8;

    // 🖼️ Create renderer
    const render = Render.create({
      element: container,
      engine,
      canvas: canvasRef.current!,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });

    // 🧱 Walls and floor
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true, render: { visible: false } });
    World.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // 💫 Spawn all 14 icons at once across the top
    const iconBodies = allIcons.map((icon, i) =>
      Bodies.circle(
        60 + (i * (width - 120)) / 13, // evenly spaced across width
        50, // same start height
        30,
        {
          restitution: 0.9,
          friction: 0.001,
          frictionAir: 0.002,
          render: {
            sprite: {
              texture: icon,
              xScale: 0.6,
              yScale: 0.6,
            },
          },
        }
      )
    );
    World.add(engine.world, iconBodies);

    // 🖱️ Enable drag & drop
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(engine.world, mouseConstraint);

    // ⚙️ Run everything
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // 🧹 Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FallingIcons;
