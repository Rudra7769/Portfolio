import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
const projectMockup1 = "/placeholder.svg";
const projectMockup2 = "/placeholder.svg";
const projectMockup3 = "/placeholder.svg";
const projectMockup4 = "/placeholder.svg";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  client: string;
  year: string;
  services: string[];
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Lirante",
    description: "A comprehensive e-commerce platform with modern design and seamless user experience",
    image: projectMockup1,
    category: "E-Commerce Platform",
    client: "Lirante Corp",
    year: "2024",
    services: ["UI/UX Design", "Frontend Development", "Brand Identity"],
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Modern portfolio design showcasing creative projects with interactive elements",
    image: projectMockup2,
    category: "Portfolio Design",
    client: "Creative Studio",
    year: "2024",
    services: ["Web Design", "Development", "Animation"],
    liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Mobile App Design",
    description: "Innovative mobile application with focus on user experience and modern aesthetics",
    image: projectMockup3,
    category: "Mobile Design",
    client: "Tech Startup",
    year: "2023",
    services: ["Mobile Design", "Prototyping", "User Testing"],
    liveUrl: "https://example.com",
  },
];

const ProjectCard = ({ project, isActive }: { project: Project; isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ 
        opacity: isActive ? 1 : 0.85, 
        scale: isActive ? 1 : 0.98 
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-shrink-0 w-full max-w-lg mx-4 group will-change-transform"
    >
      {/* Main Card */}
      <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Project Image */}
        <div className="relative h-60 sm:h-80 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Project Title Overlay (default state) */}
          <div className="absolute bottom-6 left-6 right-6 transition-opacity duration-300 group-hover:opacity-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-white/90 text-sm">
              {project.category}
            </p>
          </div>

          {/* Hover Description Overlay */}
          <div className="pointer-events-none absolute left-4 right-4 bottom-6 rounded-2xl bg-background/30 backdrop-blur-xl border border-border/30 p-4 sm:p-5 md:p-7 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {/* Navigation Arrow */}
          <div className="absolute top-4 right-4 z-20">
            <div className="w-12 h-12 bg-muted/30 border border-border/50 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer hover:scale-110 group-hover:bg-primary group-hover:border-primary">
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 2500); // Faster: change slide every 2.5s

      return () => clearInterval(interval);
    }
  }, [isHovered, projects.length]);

  const slideVariants: Variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 } },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, scale: 0.98, transition: { duration: 0.22, ease: "easeInOut" } }),
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <div className="mb-4 inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Portfolio
            </span>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Recent Projects
            </span>
          </h2>
          
          <p className="max-w-2xl text-lg text-muted-foreground">
            Explore my latest work showcasing cutting-edge technologies and innovative solutions
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary-foreground" />
          </button>
          
          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary-foreground" />
          </button>

          {/* Carousel */}
          <div className="flex justify-center items-center min-h-[500px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                className="flex items-stretch justify-center w-full gap-8"
                key={currentIndex}
                variants={slideVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <ProjectCard 
                  project={projects[currentIndex]} 
                  isActive={true}
                />
                <ProjectCard 
                  project={projects[(currentIndex + 1) % projects.length]} 
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
