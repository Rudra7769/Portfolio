import { Sparkles, ChevronDown } from "lucide-react";
import ShinyText from "./ShinyText";
import { useEffect, useRef, useState } from "react";

const Navigation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothedProgress, setSmoothedProgress] = useState(0);

  // Refs for measuring exact positions to perfectly overlap during crossfade
  const leftOriginalRef = useRef<HTMLDivElement | null>(null);
  const rightOriginalRef = useRef<HTMLDivElement | null>(null);
  const leftStickyInnerRef = useRef<HTMLDivElement | null>(null);
  const rightStickyInnerRef = useRef<HTMLDivElement | null>(null);

  const [leftStart, setLeftStart] = useState(0);
  const [rightStart, setRightStart] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = 200; // px of scroll for full effect
      const p = Math.min(window.scrollY / max, 1);
      setScrollProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth the scrollProgress to avoid jitter and match perceived speed
  useEffect(() => {
    let raf: number;
    const tick = () => {
      setSmoothedProgress(prev => {
        const next = prev + (scrollProgress - prev) * 0.25; // slightly snappier smoothing
        return Math.abs(next - prev) < 0.0005 ? scrollProgress : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollProgress]);

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

  // Compute transforms so sticky starts exactly where originals are, then moves to edge
  const leftTranslate = leftStart * (1 - smoothedProgress);
  const rightTranslate = rightStart * (1 - smoothedProgress);

  // Crossfade blend tied to progress; small ramp to avoid overlap artifacts
  const blend = Math.min(Math.max((smoothedProgress - 0.02) / 0.18, 0), 1);

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
            <div ref={rightOriginalRef} className="will-change-[opacity,transform]" style={{ opacity: 1 - blend }}>
              <a href="/path-to-your-cv.pdf" download className="border border-white/20 px-6 py-2 rounded-full text-base font-medium hover:border-white/40 hover:bg-white/10 transition-all duration-300 text-white">
                <ShinyText text="Download CV" speed={3} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Sticky Left Oval (appears after scrolling) */}
      <div className="fixed top-0 left-0 z-50">
        <div className="px-6 lg:px-8 pt-8">
          <div
            ref={leftStickyInnerRef}
            className="flex items-center gap-4 will-change-[transform,opacity]"
            style={{ transform: `translateX(${leftTranslate}px)`, opacity: blend, pointerEvents: blend > 0.5 ? 'auto' : 'none' }}
          >
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
        </div>
      </div>

      {/* Sticky Right Oval (appears after scrolling) */}
      <div className="fixed top-0 right-0 z-50">
        <div className="px-6 lg:px-8 pt-8">
          <div
            ref={rightStickyInnerRef}
            className="will-change-[transform,opacity]"
            style={{ transform: `translateX(${rightTranslate}px)`, opacity: blend, pointerEvents: blend > 0.5 ? 'auto' : 'none' }}
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
