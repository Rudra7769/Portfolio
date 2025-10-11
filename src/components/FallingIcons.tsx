import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const techIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
];

const FallingIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const iconElements: HTMLImageElement[] = [];
    const numIcons = 20;

    const createIcon = () => {
      const icon = document.createElement('img');
      const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
      icon.src = randomIcon;
      icon.alt = "Tech Icon";
      icon.className = 'w-6 h-6 absolute opacity-0';
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = '-50px';
      container.appendChild(icon);
      iconElements.push(icon);
      return icon;
    };

    const animateIcon = (icon: HTMLImageElement) => {
      const tween = gsap.fromTo(icon,
        { y: -50, opacity: 0 },
        {
          y: container.offsetHeight + 50,
          opacity: 0.2,
          duration: 5 + Math.random() * 5,
          ease: 'none',
          repeat: -1,
          delay: Math.random() * 5,
          paused: true,
          onRepeat: () => {
            icon.style.left = `${Math.random() * 100}%`;
          }
        }
      );
      animationsRef.current.push(tween);
      return tween;
    };

    // Create icons
    for (let i = 0; i < numIcons; i++) {
      const icon = createIcon();
      animateIcon(icon);
    }

    return () => {
      observer.disconnect();
      iconElements.forEach(icon => {
        gsap.killTweensOf(icon);
        icon.remove();
      });
      animationsRef.current = [];
    };
  }, []);

  // Handle visibility changes
  useEffect(() => {
    if (isVisible) {
      animationsRef.current.forEach(tween => tween.play());
    } else {
      animationsRef.current.forEach(tween => tween.pause());
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default FallingIcons;