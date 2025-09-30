import { ArrowUpRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Green glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(96,255,103,0.2),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto text-center relative">
        <div className="inline-block">
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              TURN YOUR IDEAS
              <br />
              INTO REALITY
            </h2>
            <div className="absolute -top-12 right-1/4 w-24 h-24 rounded-full bg-accent flex items-center justify-center hover-scale cursor-pointer group">
              <ArrowUpRight className="w-8 h-8 text-accent-foreground group-hover:rotate-45 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
