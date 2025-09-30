import { Button } from "./ui/button";
import LiquidEther from "./ui/LiquidEther";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pb-20 px-6 overflow-hidden">
      {/* LiquidEther animated background */}
      <div className="absolute inset-0">
        <LiquidEther
          colors={['#60FF67', '#39FF14', '#00FF41']}
          mouseForce={80}
          cursorSize={200}
          isViscous={true}
          viscous={35}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={1.8}
          takeoverDuration={0.3}
          autoResumeDelay={1500}
          autoRampDuration={0.6}
          BFECC={true}
          dt={0.016}
          className="opacity-75"
        />
      </div>
      
      <div className="container mx-auto max-w-7xl px-8">
        <div className="flex items-start justify-between pt-24">
          {/* Left side - Hero text and image */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-12">
              DESIGNING EXPERIENCES<br />
              THAT CONNECT, INSPIRE,<br />
              AND CONVERT
            </h1>
            
            <div className="w-80 h-48">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&h=300&fit=crop" 
                alt="Team collaboration - people working together on creative projects"
                className="rounded-lg w-full h-full object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Right side - Services list and CTA positioned vertically */}
          <div className="w-80 flex flex-col items-start pt-20">
            <div className="mb-12">
              <ul className="space-y-2 text-sm font-normal text-white">
                <li className="hover:text-accent transition-colors cursor-pointer">WEBFLOW DEVELOPMENT</li>
                <li className="hover:text-accent transition-colors cursor-pointer">BRAND IDENTITY DESIGN</li>
                <li className="hover:text-accent transition-colors cursor-pointer">CONTENT STRATEGY</li>
                <li className="hover:text-accent transition-colors cursor-pointer">PRODUCT DESIGN</li>
              </ul>
            </div>

            {/* Plus icon and description */}
            <div className="flex items-start gap-4 mb-8">
              <div className="text-white text-xl font-light mt-1">+</div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Turning ambitious ideas into meaningful digital products and brand identities that endure.
              </p>
            </div>

            <Button variant="neon" className="rounded-full px-6 py-2 font-medium text-sm text-black bg-accent hover:bg-accent/90 transition-all duration-300">
              CONTACT US
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
