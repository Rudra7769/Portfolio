import { ArrowUp } from "lucide-react";

const footerLinks = {
  main: [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Project", href: "#work" },
    { name: "Service", href: "#services" },
    { name: "Pricing Plan", href: "#pricing" },
  ],
  resources: [
    { name: "Style Guide", href: "#" },
    { name: "Licenses", href: "#" },
    { name: "Changelog", href: "#" },
    { name: "Password Protected", href: "#" },
    { name: "404", href: "#" },
  ],
  social: [
    { name: "LinkedIn", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Behance", href: "#" },
    { name: "X", href: "#" },
  ],
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          <div className="space-y-4">
            {footerLinks.main.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="space-y-4">
            {footerLinks.resources.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="space-y-4">
            {footerLinks.social.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <div>
            <div className="text-8xl md:text-9xl font-bold text-muted/20 mb-4">
              CIRKA STUDIO
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 All Rights Reserved by <span className="text-accent">Seelf</span>
            </p>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-16 h-16 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-colors group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 group-hover:text-accent transition-colors" />
          </button>
        </div>

        <div className="text-right mt-4">
          <a 
            href="https://webflow.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            Powered by Webflow
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
