import { Button } from "./ui/button";
import LiquidEther from "./ui/LiquidEther";
import TextType from "./ui/TextType";
import { Mail } from "lucide-react"; // Add this import

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pb-20 px-6 overflow-hidden">
      {/* LiquidEther animated background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#60FF67', '#39FF14', '#00FF41']}
          mouseForce={80}
          cursorSize={100}
          isViscous={true}
          viscous={35}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={false}
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
      
      <div className="relative z-10 container mx-auto max-w-7xl px-8 pointer-events-none">
        <div className="flex items-start justify-center pt-32">
          
          {/* Left side - Hero text + image + description+button beside image */}
          <div className="flex-1 max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white mb-12 uppercase">
              <div>
                <TextType 
                  text={["CRAFTING DIGITAL PRODUCTS"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  loop={false}
                />
              </div>
              <div className="my-4">
                <TextType 
                  text={["WITH CODE, CREATIVITY,"]}
                  typingSpeed={75}
                  initialDelay={2000}
                  pauseDuration={1500}
                  showCursor={false}
                  loop={false}
                />
              </div>
              <div>
                <TextType 
                  text={["AND PURPOSE."]}
                  typingSpeed={75}
                  initialDelay={4000}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  loop={false}
                />
              </div>
            </h1>

            {/* Image + sentence+button side by side */}
            <div className="flex items-start gap-80">
              {/* Image */}
              <div className="w-96 h-64 flex-shrink-0">
                <img 
                  src="image1.jpg" 
                  alt="Team collaboration - people working together on creative projects"
                  className="rounded-lg w-full h-full object-cover shadow-lg"
                />
              </div>

             {/* Sentence + button */}
                <div className="pt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-white text-xl font-light mt-1">+</div>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre max-w-xl">
                      Passionate about building digital products that are simple, creative, and impactful.<br/>
                      Bringing imagination to life through design and development.
                    </p>
                  </div>

                  <Button 
                    variant="neon" 
                    className="rounded-full px-3 py-1.5 font-medium text-sm text-black bg-white border border-green-500 hover:bg-gray-100 transition-all duration-300 pointer-events-auto flex items-center gap-1"
                  >
                    <span className="bg-green-500 rounded-full flex items-center justify-center w-7 h-7">
                      <span className="text-white font-bold text-[12px]">&gt;</span>
                    </span>
                    CONTACT US
                  </Button>
                </div>
            </div>
          </div>

          {/* Right side - Services list */}
<div className="w-80 flex flex-col items-start pt-20 pr-16">
  <ul className="text-sm font-normal text-white pointer-events-auto uppercase leading-relaxed">
    <li className="hover:text-accent transition-colors cursor-pointer whitespace-nowrap">
      DESIGNING CLEAN, MODERN WEBSITES
    </li>
    <li className="hover:text-accent transition-colors cursor-pointer whitespace-nowrap">
      BUILDING FAST & INTERACTIVE APPS
    </li>
    <li className="hover:text-accent transition-colors cursor-pointer whitespace-nowrap">
      CRAFTING SEAMLESS USER EXPERIENCES
    </li>
    <li className="hover:text-accent transition-colors cursor-pointer whitespace-nowrap">
      BRINGING IDEAS TO LIFE WITH CODE
    </li>
  </ul>
</div>



        </div>
      </div>
    </section>
  );
};

export default HeroSection;
