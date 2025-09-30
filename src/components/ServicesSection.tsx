import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const services = [
  { id: "001", name: "APP DESIGN" },
  { id: "002", name: "UI/UX DESIGN" },
  { id: "003", name: "DEVELOPMENT" },
  { id: "004", name: "BRANDING" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">SERVICES</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">What We Do</h2>
            
            <p className="text-muted-foreground text-lg">
              Our work is more than design - it's the result of deep thinking, keen ideas, and fearless execution across disciplines.
            </p>

            <Button variant="neon" size="lg" className="rounded-full">
              <span>WORK WITH US</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="group flex items-center justify-between p-6 border-b border-border hover:border-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-muted group-hover:text-accent transition-colors">
                    {service.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {index === 1 && (
                    <div className="w-16 h-16 rounded-lg bg-muted/30 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-muted rounded" />
                    </div>
                  )}
                  <span className="text-sm text-muted-foreground">{service.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
