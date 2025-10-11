import { Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 relative z-0">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-4">
            <Mail className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-400 uppercase tracking-wider">Contact</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something exceptional.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <a 
            href="mailto:your.email@example.com"
            className="flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm text-white rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
          >
            <Mail className="w-6 h-6" />
            <span>your.email@example.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;