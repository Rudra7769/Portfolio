import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const WhySection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">WHY CHOOSE US</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">Why Brands Choose Cirka</h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              We are a passionate creative agency with over 10 years of experience in branding, design, digital marketing, storytelling, and impactful product strategy.
            </p>

            <Button variant="neon" size="lg" className="rounded-full">
              <span>CONTACT US</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[200px] font-bold text-muted/10 leading-none">
              10
            </div>
            <div className="absolute top-1/2 right-12 -translate-y-1/2 text-sm text-muted-foreground writing-mode-vertical-rl transform rotate-180">
              YEARS OF EXPERIENCE
            </div>
            <img 
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600"
              alt="Experience"
              className="rounded-lg w-full object-cover hover-scale"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
