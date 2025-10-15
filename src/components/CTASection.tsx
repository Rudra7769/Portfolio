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
            <div className="absolute -top-6 -right-16 w-20 h-20 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 cursor-pointer group transition-all duration-300">
              <ArrowUpRight className="w-6 h-6 text-black group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
