import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

// 🧠 Skill icons (you can add or remove as you like)
const allIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  
];

// 🎨 Main Component
const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // 🧩 Setup Matter.js Engine
    const engine = Engine.create();
    engine.world.gravity.y = 0.7;
    engineRef.current = engine;

    // 🖼️ Create Renderer
    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });

    // 🧱 Create Boundaries
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true, render: { visible: false } });
    World.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // 🖱️ Add Mouse Interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(engine.world, mouseConstraint);

    // 🏃 Run Engine & Renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // 🧹 Cleanup on Unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  const startAnimation = () => {
    if (isAnimating || !engineRef.current) return;
    setIsAnimating(true);

    const { World, Bodies } = Matter;
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;

    // 🪄 Add icons as falling objects
    const iconBodies = allIcons.map((icon, i) =>
      Bodies.circle(
        60 + (i * (width - 120)) / 13, // evenly space all 14 icons across width
        50, // same Y position so they all start together
        30,
        {
          restitution: 0.9,
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

    World.add(engineRef.current.world, iconBodies);
  };

  return (
    <section id="skills" className="py-20 px-6 relative z-0 overflow-hidden">
      <div className="container mx-auto max-w-7xl text-center">
        {/* ✨ Header */}
        <div className="flex items-center gap-3 justify-center mb-4">
          <Sparkles className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-400 uppercase tracking-wider">
            Skills
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Technical Expertise
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          A visual representation of my most-used technologies — falling into place!
        </p>

        {/* 🧩 Falling Icons Container */}
        <div
          ref={containerRef}
          onClick={startAnimation}
          className="relative w-full h-[400px] rounded-xl border border-green-500/30 bg-black/40 backdrop-blur-sm cursor-pointer"
        />
      </div>
    </section>
  );
};

export default SkillsSection;