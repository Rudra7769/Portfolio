import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-6 bg-card/30">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-sm text-muted-foreground">TESTIMONIALS</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Client's Feedback</h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="text-6xl font-bold text-accent">160+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-muted border-2 border-background overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=100&h=100&fit=crop`}
                    alt={`Client ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-6xl text-accent">"</div>
            <blockquote className="text-xl leading-relaxed">
              Thanks to Cirka's expertise, our platform is now more user-friendly than ever. Customers love the streamlined experience, <span className="text-accent">and we've seen a noticeable increase in retention rates.</span>
            </blockquote>
            
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&fit=crop"
                    alt="John David"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">JOHN DAVID</div>
                  <div className="text-sm text-muted-foreground">San Francisco, CA</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button variant="neon" size="icon" className="rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
