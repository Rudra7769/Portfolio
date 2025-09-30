import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    id: "001",
    title: "AGENCY WEBSITE DESIGN",
    year: "2025",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
  },
  {
    id: "002",
    title: "MOBILE APP DESIGN",
    year: "2025",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800",
  },
  {
    id: "003",
    title: "DASHBOARD DESIGN",
    year: "2025",
    image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?q=80&w=800",
  },
  {
    id: "004",
    title: "SAAS WEBSITE DESIGN",
    year: "2025",
    image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?q=80&w=800",
  },
];

const ProjectsSection = () => {
  return (
    <section id="work" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-sm text-muted-foreground">PROJECT</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Recent Projects</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Our work is more than design - it's the result of deep thinking, fresh ideas, and fearless execution across disciplines.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg bg-card border border-border hover-glow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{project.id}</div>
                  <div className="font-medium">{project.title}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">// {project.year}</span>
                  <button className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    VIEW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="neon" size="lg" className="rounded-full">
            <span>VIEW ALL PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
