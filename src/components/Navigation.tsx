import { Sparkles, ChevronDown } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="w-full bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-lg tracking-wide">CIRKA</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium">
              Home
            </a>
            <a href="#about" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium">
              About
            </a>
            <a href="#work" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium">
              Work
            </a>
            <a href="#pricing" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium">
              Pricing
            </a>
            <div className="relative">
              <button className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium">
                Pages
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
