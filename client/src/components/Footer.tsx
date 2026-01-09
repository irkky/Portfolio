import { Link } from "wouter";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SiKaggle } from "react-icons/si";

const socialLinks = [
  { icon: Github, href: "https://github.com/irkky", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rishabh-kr-kannaujiya/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/i_rkky", label: "X formally-Twitter" },
  { icon: SiKaggle, href: "https://www.kaggle.com/rishabhkannaujiya", label: "Kaggle" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "AI/ML Solutions",
  "GenAI & Prompt Engineering",
  "Python Development",
  "Deep Learning",
];


export default function Footer() {
  return (
    <footer className="bg-card border-t py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Quote that makes me tick</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Just as electricity transformed almost everything 100 years ago, 
              today I actually have a hard time thinking of an industry that 
              I don't think AI will transform in the next several years. -- Andrew Ng
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2026 Rishabh Kumar Kannaujiya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
