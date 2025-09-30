import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-xl font-bold">CIRKA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-foreground hover:text-accent transition-colors">Home</a>
          <a href="#about" className="text-foreground hover:text-accent transition-colors">About</a>
          <a href="#work" className="text-foreground hover:text-accent transition-colors">Work</a>
          <a href="#pricing" className="text-foreground hover:text-accent transition-colors">Pricing</a>
          <a href="#pages" className="text-foreground hover:text-accent transition-colors">Pages</a>
          <a href="#contact" className="text-foreground hover:text-accent transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
