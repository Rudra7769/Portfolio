import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-20 px-6 overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(96,255,103,0.15),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Hero text and image */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              DESIGNING EXPERIENCES THAT CONNECT, INSPIRE, AND CONVERT
            </h1>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200" 
                alt="Team collaboration"
                className="rounded-lg w-full object-cover h-[300px] hover-scale"
              />
            </div>
          </div>

          {/* Right side - Services list and CTA */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>
                <span className="text-muted-foreground text-sm">SERVICES</span>
              </div>
              
              <ul className="space-y-4 text-xl">
                <li className="hover:text-accent transition-colors cursor-pointer">WEBFLOW DEVELOPMENT</li>
                <li className="hover:text-accent transition-colors cursor-pointer">BRAND IDENTITY DESIGN</li>
                <li className="hover:text-accent transition-colors cursor-pointer">CONTENT STRATEGY</li>
                <li className="hover:text-accent transition-colors cursor-pointer">PRODUCT DESIGN</li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Turning ambitious ideas into meaningful digital products and brand identities that endure.
              </p>
              <Button variant="neon" size="lg" className="rounded-full">
                <span>CONTACT US</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
