import { Sparkles } from "lucide-react";
import SkillsGlobe from "./SkillsGlobe";
import Particles from "./Particles";

// 🎨 Main Component
const SkillsSection = () => {

  return (
    <section id="skills" className="py-20 px-6 relative z-0 overflow-hidden">
      {/* Particles Background for entire section */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']} // White particles
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="container mx-auto max-w-7xl text-center relative z-10">
        {/* ✨ Header */}
        <div className="flex items-center gap-3 justify-center mb-4">
          <Sparkles className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-400 uppercase tracking-wider">
            Skills
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Technical Expertise
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-12 px-4">
          A builder at heart, I thrive on transforming concepts into fast, functional, and visually striking web applications that push boundaries.
        </p>
        
        {/* Skills Globe Visualization */}
        <div className="mt-8 md:mt-16">
          <SkillsGlobe />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;