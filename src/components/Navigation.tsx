import { Sparkles, ChevronDown, Menu, X } from "lucide-react";
import ShinyText from "./ShinyText";
import { useEffect, useRef, useState } from "react";

const Navigation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for measuring exact positions to perfectly overlap during crossfade
  const leftOriginalRef = useRef<HTMLDivElement | null>(null);
  const rightOriginalRef = useRef<HTMLDivElement | null>(null);
  const leftStickyInnerRef = useRef<HTMLDivElement | null>(null);
  const rightStickyInnerRef = useRef<HTMLDivElement | null>(null);

  const [leftStart, setLeftStart] = useState(0);
  const [rightStart, setRightStart] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = 300; // scroll distance for smooth but responsive effect
      const p = Math.min(window.scrollY / max, 1);
      setScrollProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure offsets so sticky ovals start exactly over originals (no visible time lapse)
  useEffect(() => {
    const measure = () => {
      const lo = leftOriginalRef.current;
      const ro = rightOriginalRef.current;
      const lsi = leftStickyInnerRef.current;
      const rsi = rightStickyInnerRef.current;
      if (lo && lsi) {
        const loRect = lo.getBoundingClientRect();
        const lsiRect = lsi.getBoundingClientRect();
        setLeftStart(loRect.left - lsiRect.left);
      }
      if (ro && rsi) {
        const roRect = ro.getBoundingClientRect();
        const rsiRect = rsi.getBoundingClientRect();
        setRightStart(roRect.left - rsiRect.left);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Simple smooth easing that follows scroll perfectly
  const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
  const blend = easeOutQuad(scrollProgress);

  // Smooth scroll function
  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Compute transforms so sticky starts exactly where originals are, then moves to edge
  const leftTranslate = leftStart * (1 - blend);
  const rightTranslate = rightStart * (1 - blend);

  return (
    <>
      {/* Original Navigation (unaltered alignment) */}
      <nav className="w-full bg-transparent absolute top-0 left-0 right-0 z-50 font-sans antialiased">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between pt-8 pb-6">
            
            {/* Left side - Profile Photo and Name */}
            <div
              ref={leftOriginalRef}
              className="flex items-center gap-4 will-change-[opacity,transform]"
              style={{ opacity: 1 - blend }}
            >
            <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="/profile.png" 
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
              <button 
                onClick={() => handleNavClick('home')}
                className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('projects')}
                className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400"
              >
                Projects
              </button>
              <button 
                onClick={() => handleNavClick('skills')}
                className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400"
              >
                Skills
              </button>
              <button 
                onClick={() => handleNavClick('experience')}
                className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400"
              >
                Experience
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-white transition-colors duration-200 text-sm font-medium hover:text-green-400"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Right side - Download CV Button */}
            <div ref={rightOriginalRef} className="will-change-[opacity,transform]" style={{ opacity: 1 - blend }}>
              <a href="/path-to-your-cv.pdf" download className="border border-white/20 px-6 py-2 rounded-full text-base font-medium hover:border-white/40 hover:bg-white/10 transition-all duration-300 text-white">
                <ShinyText text="Download CV" speed={3} />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl mx-6 p-4 border border-white/10 space-y-3">
              <button 
                onClick={() => handleNavClick('home')}
                className="block w-full text-left text-white transition-colors duration-200 text-sm font-medium hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/10"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className="block w-full text-left text-white transition-colors duration-200 text-sm font-medium hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/10"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('projects')}
                className="block w-full text-left text-white transition-colors duration-200 text-sm font-medium hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/10"
              >
                Projects
              </button>
              <button 
                onClick={() => handleNavClick('skills')}
                className="block w-full text-left text-white transition-colors duration-200 text-sm font-medium hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/10"
              >
                Skills
              </button>
              <button 
                onClick={() => handleNavClick('experience')}
                className="block w-full text-left text-white transition-colors duration-200 text-sm font-medium hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/10"
              >
                Experience
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left text-white transition-colors duration-200 text-sm font-medium hover:text-green-400 py-2 px-3 rounded-lg hover:bg-white/10"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Sticky Left Oval (appears after scrolling) */}
      <div className="fixed top-0 left-0 z-50">
        <div className="px-6 lg:px-8 pt-8">
          <div
            ref={leftStickyInnerRef}
            className="flex items-center gap-4 will-change-[transform,opacity]"
            style={{ transform: `translate3d(${leftTranslate}px, 0, 0)`, opacity: blend, pointerEvents: blend > 0.5 ? 'auto' : 'none' }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="/profile.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white">
              <h2 className="text-lg font-semibold">Rudra Ingole</h2>
              <p className="text-sm text-gray-400">Full Stack Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Right Oval (appears after scrolling) */}
      <div className="fixed top-0 right-0 z-50">
        <div className="px-6 lg:px-8 pt-8">
          <div
            ref={rightStickyInnerRef}
            className="will-change-[transform,opacity]"
            style={{ transform: `translate3d(${rightTranslate}px, 0, 0)`, opacity: blend, pointerEvents: blend > 0.5 ? 'auto' : 'none' }}
          >
            <a href="/path-to-your-cv.pdf" download className="border border-white/20 px-6 py-2 rounded-full text-base font-medium hover:border-white/40 hover:bg-white/10 transition-all duration-300 text-white">
              <ShinyText text="Download CV" speed={3} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
