import { motion, useInView } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Calendar,
  Coffee,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

interface ContactInfo {
  icon: any;
  label: string;
  value: string;
  href: string;
  description: string;
}

interface SocialLink {
  icon: any;
  name: string;
  href: string;
  username: string;
  color: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "rudraingole10@gmail.com",
    href: "mailto:rudraingole10@gmail.com",
    description: "Send me an email"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9699620387",
    href: "tel:+919699620387",
    description: "Give me a call"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, India",
    href: "#",
    description: "Where I'm based"
  }
];

const socialLinks: SocialLink[] = [
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com/Rudra7769",
    username: "@rudraingole",
    color: "hover:text-gray-400"
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "https://linkedin.com/in/rudraingole",
    username: "@rudraingole",
    color: "hover:text-blue-400"
  },
  {
    icon: Twitter,
    name: "Twitter",
    href: "https://twitter.com/rudraingole",
    username: "@rudraingole",
    color: "hover:text-sky-400"
  }
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // You can replace this with actual form submission logic
    alert('Message sent successfully!');
  };

  return (
    <section ref={ref} id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-green-500/20 rounded-full blur-[80px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-3 justify-center mb-4">
            <Sparkles className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-400 uppercase tracking-wider">Let's Connect</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to bring your ideas to life? Let's discuss your project and create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Send Message</h3>
                <p className="text-gray-400">Fill out the form below and I'll get back to you within 24 hours.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-green-500/50 focus:bg-white/10 focus:outline-none transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-green-500/50 focus:bg-white/10 focus:outline-none transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-green-500/50 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="Project inquiry"
                  />
                </motion.div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-green-500/50 focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
                >
                  <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors duration-300">
                    <contact.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{contact.label}</h4>
                    <p className="text-green-400 font-medium">{contact.value}</p>
                    <p className="text-sm text-gray-400">{contact.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto group-hover:text-green-400 transition-colors duration-300" />
                </motion.a>
              ))}
            </div>


            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Connect on Social</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-gray-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{social.name}</div>
                      <div className="text-xs opacity-70">{social.username}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <h4 className="font-semibold text-white">Available for Projects</h4>
              </div>
              <p className="text-sm text-gray-400">
                I typically respond within 24 hours. Currently accepting new projects for Q1 2025.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;