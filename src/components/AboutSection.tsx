import { Sparkles } from "lucide-react";

const stats = [
  {
    number: "160+",
    label: "Projects",
    description: "Delivered across various Client satisfaction Hubs based on worldwide.",
  },
  {
    number: "50+",
    label: "Team Members",
    description: "Professionals dedicated to delivering excellence and creative solutions.",
  },
  {
    number: "99%",
    label: "Success",
    description: "High client satisfaction based on worldwide reviews and feedback.",
  },
  {
    number: "50+",
    label: "Awards",
    description: "Recognized with numerous awards from top industry leaders.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-sm text-muted-foreground">ABOUT US</span>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-2xl md:text-3xl leading-relaxed">
            At Cirka, we don't just follow trends – we{" "}
            <span className="inline-block">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=100&h=100" 
                alt="team" 
                className="w-12 h-12 rounded-full object-cover mx-2 inline align-middle"
              />
            </span>{" "}
            challenge them. We create bold, strategic work that helps brands find their voice and connect with people in meaningful ways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4 group">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-5xl font-bold group-hover:text-accent transition-colors">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
