import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  testimonial: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200&h=200&fit=crop",
    rating: 5,
    testimonial: "Rudra transformed our entire digital presence with exceptional skill and creativity. The new platform exceeded all expectations and boosted our user engagement by 300%.",
    project: "E-commerce Platform Redesign"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "Innovation Labs",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop",
    rating: 5,
    testimonial: "Working with Rudra was a game-changer. His technical expertise and attention to detail resulted in a flawless application that our team uses daily with zero issues.",
    project: "Custom Dashboard Development"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Digital Solutions",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop",
    rating: 5,
    testimonial: "The level of professionalism and innovation Rudra brings to every project is outstanding. Our mobile app launch was a huge success thanks to his expertise.",
    project: "Mobile App Development"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Sparkles className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-400 uppercase tracking-wider">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Clients Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real feedback from clients who trusted me to bring their vision to life
          </p>
        </motion.div>


        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/10 p-8 md:p-12">
            {/* Quote Icon */}
            <motion.div
              className="absolute top-8 left-8 text-green-500/20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Quote className="w-16 h-16" />
            </motion.div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12"
              >
                {/* Avatar and Info */}
                <div className="flex-shrink-0 text-center lg:text-left">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative mx-auto lg:mx-0 mb-6"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-green-500/30 relative">
                      <img
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent" />
                    </div>
                    {/* Floating badge */}
                    <motion.div
                      className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐ {currentTestimonial.rating}.0
                    </motion.div>
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{currentTestimonial.name}</h3>
                    <p className="text-green-400 font-semibold">{currentTestimonial.role}</p>
                    <p className="text-sm text-gray-400">{currentTestimonial.company}</p>
                    <p className="text-xs text-gray-500">{currentTestimonial.location}</p>
                    <div className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                      {currentTestimonial.project}
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 space-y-6">
                  {/* Star Rating */}
                  <div className="flex justify-center lg:justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl leading-relaxed text-gray-200 italic">
                    "{currentTestimonial.testimonial}"
                  </blockquote>

                  {/* Navigation */}
                  <div className="flex items-center justify-center lg:justify-start gap-4 pt-6">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevTestimonial}
                      className="rounded-full border-white/20 hover:border-green-500/50 hover:bg-green-500/10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex
                              ? "bg-green-500 w-8"
                              : "bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextTestimonial}
                      className="rounded-full border-white/20 hover:border-green-500/50 hover:bg-green-500/10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
