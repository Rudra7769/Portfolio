import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
const projectMockup1 = "/placeholder.svg";
const projectMockup2 = "/placeholder.svg";
const projectMockup3 = "/placeholder.svg";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Dashboard Platform",
    description: "A comprehensive analytics dashboard with real-time data visualization and AI-powered insights for business intelligence.",
    image: projectMockup1,
    techStack: ["React", "TypeScript", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "E-Commerce Marketplace",
    description: "Full-stack e-commerce platform with payment integration, inventory management, and advanced search capabilities.",
    image: projectMockup2,
    techStack: ["Next.js", "TailwindCSS", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Smart Task Manager",
    description: "AI-powered task management app with natural language processing, smart scheduling, and team collaboration features.",
    image: projectMockup3,
    techStack: ["React", "Firebase", "OpenAI", "Material-UI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 via-primary/30 to-transparent opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
      
      {/* Card */}
      <div className="relative h-full overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-cyber-lg">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-cyber"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-primary/50 bg-transparent text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-cyber"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-primary text-primary-foreground shadow-cyber transition-all duration-300 hover:shadow-cyber-lg"
              asChild
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          </div>
        </div>

        {/* Hover overlay effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div
        className="absolute inset-0 animate-grid-flow"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
          className="mb-16 text-center"
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
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore my latest work showcasing cutting-edge technologies and innovative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
