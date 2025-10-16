import { motion, useInView } from "framer-motion";
import { Sparkles, Mail, Star, Award, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";

// MovingBanner component
const MovingBanner = () => {
  const skills = [
    "User Research",
    "UX Design", 
    "App Design",
    "Dashboard",
    "Wireframe",
    "Prototype",
    "Brand Identity",
    "Visual Design",
    "Frontend Development",
    "React Development"
  ];

  // Create a longer array for seamless loop
  const extendedSkills = [...skills, ...skills];

  return (
    <div className="w-full overflow-hidden bg-primary py-4 sm:py-6 relative mt-12 sm:mt-20">
      {/* White line above banner */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>
      
      {/* Moving white line that covers text */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-6 sm:h-8 bg-white/30 transform -translate-y-1/2"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {extendedSkills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center mx-8"
          >
            <span className="text-primary-foreground text-lg md:text-xl font-medium">
              {skill}
            </span>
            <span className="mx-8 text-primary-foreground/60">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
  };

  return (
    <section ref={ref} id="contact" className="py-20 px-6 relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Section Header */}
          <div className="mb-8 inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              CONTACT
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-muted-foreground">Have an Awesome Project</span>
            <br />
            <span className="text-muted-foreground">Idea? </span>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Let's Discuss
            </span>
          </h2>

          {/* Email Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-20 pr-32 py-6 rounded-full bg-muted/30 border-0 focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground text-lg font-medium"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Send
              </button>
            </div>
          </motion.form>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span>4.9/5 Average Ratings</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>25+ Winning Awards</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Certified Product Designer</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;