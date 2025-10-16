import { Button } from "./ui/button";
import LiquidEther from "./ui/LiquidEther";
import TextType from "./ui/TextType";
import { Mail } from "lucide-react"; // Add this import

const HeroSection = () => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          autoDemo={true}                // enable automatic wave animation
          autoSpeed={0.5}                // how fast the auto animation moves
          autoIntensity={1.6}            // strength of the auto waves
          takeoverDuration={0.3}
          autoResumeDelay={1000}         // delay before auto demo resumes after interaction
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
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-80">
              {/* Image */}
              <div className="w-full lg:w-96 h-64 flex-shrink-0">
                <img 
                  src="image1.jpg" 
                  alt="Team collaboration - people working together on creative projects"
                  className="rounded-lg w-full h-full object-cover shadow-lg"
                />
              </div>

             {/* Sentence + button */}
                <div className="pt-6 lg:pt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-white text-xl font-light mt-1">+</div>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre max-w-xl">
                      Passionate about building digital products that are simple, creative, and impactful.<br/>
                      Bringing imagination to life through design and development.
                    </p>
                  </div>

                  <div className="flex items-start lg:gap-80">
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={handleContactClick}
                        aria-label="Contact us"
                        className="inline-flex items-center rounded-full bg-white border border-green-500 text-black font-medium px-4 py-1.5 hover:bg-gray-100 transition-all duration-200 pointer-events-auto"
                      >
                        <span className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center -ml-1 mr-3 shadow-sm">
                          <span className="text-white font-bold text-base leading-none">&gt;</span>
                        </span>
                        <span className="uppercase text-sm tracking-wide">Contact Me</span>
                      </button>
                    </div>
                  </div>
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
