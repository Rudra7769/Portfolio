import { Sparkles, ChevronDown } from "lucide-react";
import ShinyText from "./ShinyText";

const Navigation = () => {
  return (
    <nav className="w-full bg-transparent absolute top-0 left-0 right-0 z-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between pt-8 pb-6">
          
          {/* Left side - Profile Photo and Name */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors duration-300">
              <img 
                src="/My pfp1.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white">
              <h2 className="text-lg font-semibold">Rudra Ingole</h2>
              <p className="text-sm text-gray-400">Full Stack Developer</p>
            </div>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-12 bg-white/5 backdrop-blur-md rounded-full px-8 py-3 border border-white/10">
            <a href="#home" className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400">
              Home
            </a>
            <a href="#about" className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400">
              About
            </a>
            <a href="#work" className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400">
              Work
            </a>
            <a href="#pricing" className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400">
              Pricing
            </a>
            <div className="relative">
              <button className="flex items-center gap-1 text-white transition-colors duration-200 text-sm font-medium hover:text-green-400">
                Pages
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <a href="#contact" className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400">
              Contact
            </a>
          </div>

          {/* Right side - Download CV Button */}
          <div>
            <a href="/path-to-your-cv.pdf" download className="border border-white/20 px-6 py-2 rounded-full text-base font-medium hover:border-white/40 hover:bg-white/10 transition-all duration-300 text-white">
              <ShinyText text="Download CV" speed={3} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
