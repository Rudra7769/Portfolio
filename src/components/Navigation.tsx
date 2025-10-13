import { Sparkles, ChevronDown } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="w-full bg-transparent absolute top-0 left-0 right-0 z-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between pt-8 pb-24">
          
          {/* Name/Logo */}
          <div className="flex items-center gap-4">
            <img src="/My pfp1.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <div className="text-white transition-colors duration-200 text-base font-thin tracking-wider hover:text-green-400">
              Rudra Ingole
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-16">
            <a href="#home" className="text-white transition-colors duration-200 text-base font-thin tracking-wider hover:text-green-400">
              Home
            </a>
            <a href="#about" className="text-white transition-colors duration-200 text-base font-thin tracking-wider hover:text-green-400">
              About
            </a>
            <a href="#work" className="text-white transition-colors duration-200 text-base font-thin tracking-wider hover:text-green-400">
              Work
            </a>
            <a href="#pricing" className="text-white transition-colors duration-200 text-base font-thin tracking-wider hover:text-green-400">
              Pricing
            </a>
            <div className="relative">
              <button className="flex items-center gap-1 text-white transition-colors duration-200 text-base font-thin tracking-wider hover:text-green-400">
                Pages
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <a href="#contact" className="text-white transition-colors duration-200 text-base font-thin tracking-wider hover:text-green-400">
              Contact
            </a>
          </div>

          {/* Download CV Button */}
          <div>
            <a href="/path-to-your-cv.pdf" download className="bg-green-500 text-white px-6 py-2 rounded-full text-base font-medium hover:bg-green-600 transition-colors duration-300">
              Download CV
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
