import { motion } from "framer-motion";
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Code,
  Coffee,
  Sparkles
} from "lucide-react";

const navigationLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { 
    name: "GitHub", 
    href: "https://github.com/Rudra7769",
    icon: Github,
    hoverColor: "hover:text-gray-300"
  },
  { 
    name: "LinkedIn", 
    href: "https://linkedin.com/in/rudraingole", 
    icon: Linkedin,
    hoverColor: "hover:text-blue-400"
  },
  { 
    name: "Twitter", 
    href: "https://twitter.com/rudraingole", 
    icon: Twitter,
    hoverColor: "hover:text-sky-400"
  },
];

const quickContact = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "rudraingole10@gmail.com",
    href: "mailto:rudraingole10@gmail.com"
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "+91 9699620387",
    href: "tel:+919699620387"
  },
  { 
    icon: MapPin, 
    label: "Location", 
    value: "Pune, India",
    href: "#"
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black/50 backdrop-blur-sm border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <Code className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Rudra Ingole</h3>
              </div>
              <p className="text-gray-400 text-lg max-w-md">
                Full Stack Developer passionate about creating exceptional digital experiences. 
                Let's build something amazing together.
              </p>
            </div>
            
            {/* Quick Contact */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold mb-4">Quick Contact</h4>
              {quickContact.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-all duration-300 group"
                >
                  <contact.icon className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                  <span className="text-sm">{contact.value}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-white font-semibold">Navigation</h4>
            <div className="space-y-3">
              {navigationLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="block text-gray-400 hover:text-green-400 transition-all duration-300 text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social & Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h4 className="text-white font-semibold">Let's Connect</h4>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className={`flex items-center gap-3 text-gray-400 ${social.hoverColor} transition-all duration-300 text-sm group`}
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </div>
            
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 p-4 bg-green-500/10 rounded-xl border border-green-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span className="text-green-400 text-sm font-medium">Available for work</span>
              </div>
              <p className="text-xs text-gray-400">
                Currently accepting new projects for 2025
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Large Brand Text */}
            <div className="flex-1">
              <motion.div 
                className="text-4xl md:text-6xl lg:text-8xl font-black text-white/10 leading-none select-none"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                RUDRA INGOLE
              </motion.div>
            </div>
            
            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center hover:bg-green-500/30 hover:border-green-500/50 transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors" />
            </motion.button>
          </div>
          
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
