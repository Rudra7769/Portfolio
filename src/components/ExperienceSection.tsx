import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Sparkles, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import RippleGrid from "./RippleGrid";

interface TimelineItem {
  id: number;
  type: "experience" | "education";
  title: string;
  organization: string;
  duration: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: "experience",
    title: "Senior Frontend Developer",
    organization: "Tech Innovations Inc.",
    duration: "2022 - Present",
    description: "Leading frontend development with React, TypeScript, and modern web technologies. Built scalable UI systems.",
  },
  {
    id: 2,
    type: "experience",
    title: "Frontend Developer",
    organization: "Digital Solutions Ltd.",
    duration: "2020 - 2022",
    description: "Developed responsive web applications and implemented design systems using React and TailwindCSS.",
  },
  {
    id: 3,
    type: "education",
    title: "B.Sc. Computer Science",
    organization: "University of Technology",
    duration: "2016 - 2020",
    description: "Graduated with honors. Specialized in web development, algorithms, and software engineering principles.",
  },
  {
    id: 4,
    type: "experience",
    title: "Frontend Developer Intern",
    organization: "StartUp Ventures",
    duration: "2019 - 2020",
    description: "Contributed to building modern web interfaces and learned industry best practices in agile development.",
  },
];

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  onItemInView?: (index: number) => void;
}

const TimelineCard = ({ item, index, onItemInView }: TimelineCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) onItemInView?.(index);
  }, [isInView, index, onItemInView]);

  const Icon = item.type === "experience" ? Briefcase : GraduationCap;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1] // Custom ease curve for smoother motion
        }
      } : {}}
      className={`relative flex items-center gap-8 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } mb-20 lg:mb-24`}
      style={{ perspective: "1200px" }}
    >
      {/* Card */}
      <div className="w-full lg:w-5/12">
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ 
            scale: 1.03,
            y: -5,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          animate={isHovered ? {
            y: [0, -5, 0],
            transition: {
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          } : {}}
          className="group relative rounded-2xl bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border border-glass-border p-8 overflow-hidden shadow-lg"
          style={{
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-neon-glow/10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Rotating border effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(45deg, transparent, hsl(var(--neon-green)), transparent)",
              opacity: 0,
            }}
            animate={isHovered ? {
              opacity: [0, 0.3, 0],
              rotate: [0, 360],
            } : {}}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          />
          
          {/* Glow effect on hover */}
          <motion.div 
            className="absolute inset-0 rounded-2xl bg-neon-green/10"
            initial={{ opacity: 0 }}
            animate={isHovered ? { 
              opacity: [0, 0.5, 0],
              scale: [1, 1.1, 1]
            } : { opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
          
          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              animate={isHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="p-3 rounded-xl bg-neon-green/20 border-2 border-neon-green/40 relative overflow-hidden"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-neon-green/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <Icon className="w-6 h-6 text-neon-green relative z-10" />
              </motion.div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <motion.span
                  animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {item.duration}
                </motion.span>
              </div>
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className="w-4 h-4 text-neon-green/60" />
              </motion.div>
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold text-foreground mb-3 group-hover:text-neon-green transition-colors"
              animate={isHovered ? { 
                textShadow: [
                  "0 0 0px hsl(var(--neon-green))",
                  "0 0 20px hsl(var(--neon-green))",
                  "0 0 0px hsl(var(--neon-green))"
                ]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {item.title}
            </motion.h3>
            
            <motion.p 
              className="text-neon-green font-semibold mb-4 text-lg"
              animate={isHovered ? { x: [0, 10, 0] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {item.organization}
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0.8 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
            >
              {item.description}
            </motion.p>
          </div>

          {/* Corner accent with animation */}
          <motion.div 
            className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-radial from-neon-green/20 to-transparent rounded-full blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Lightning bolt decoration */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-20"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Zap className="w-8 h-8 text-neon-green" />
          </motion.div>
        </motion.div>
      </div>

      {/* Center dot with crazy animation */}
      <div className="relative flex-shrink-0 z-20">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={isInView ? { 
            scale: 1, 
            rotate: 360 
          } : { 
            scale: 0, 
            rotate: 0 
          }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.15 + 0.3,
            rotate: { duration: 1, delay: index * 0.15 + 0.3 }
          }}
          className="relative w-8 h-8"
        >
          {/* Outer pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 2, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full bg-neon-green/50"
          />
          
          {/* Middle ring */}
          <motion.div
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 0, 0.6],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-neon-green/70"
          />
          
          {/* Core dot */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(97,255,102,0.6)",
                "0 0 40px rgba(97,255,102,1)",
                "0 0 20px rgba(97,255,102,0.6)",
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-2 rounded-full bg-neon-green"
          />
        </motion.div>
      </div>

      {/* Spacer for alignment */}
      <div className="hidden lg:block w-5/12" />
    </motion.div>
  );
};

const ExperienceSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [visibleCount, setVisibleCount] = useState(0);
  const handleItemInView = (i: number) => setVisibleCount(prev => Math.max(prev, i + 1));
  const progress = Math.min(visibleCount / timelineData.length, 1);

  return (
    <section id="experience" className="relative min-h-screen bg-background py-20 px-4 overflow-hidden">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <RippleGrid 
          enableRainbow={false} 
          gridColor="#61FF66" 
          rippleIntensity={0.05} 
          gridSize={10} 
          gridThickness={15} 
          mouseInteraction={true} 
          mouseInteractionRadius={1.2} 
          opacity={0.4} 
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header - Simple style matching Skills section */}
        <div className="text-center mb-24">
          {/* Header with icon and label */}
          <div className="flex items-center gap-3 justify-center mb-4">
            <Sparkles className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Experience
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience & Education
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            I’m passionate about building technology that feels futuristic — blending modern web architecture, automation, and IoT connectivity to shape smarter, more responsive experiences.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center progress line that grows as items appear */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 hidden lg:block">
            {/* Track */}
            <div className="absolute inset-0 rounded-full bg-gray-800/50" />
            {/* Progress */}
            <motion.div
              className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-green-400 via-green-500 to-green-600"
              style={{ 
                boxShadow: `
                  0 0 10px rgba(34,197,94,1),
                  0 0 20px rgba(34,197,94,0.9),
                  0 0 40px rgba(34,197,94,0.7),
                  0 0 60px rgba(34,197,94,0.5),
                  inset 0 0 10px rgba(255,255,255,0.3)
                `
              }}
              initial={{ height: 0 }}
              animate={{ height: `${Math.round(progress * 100)}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-0">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} onItemInView={handleItemInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;