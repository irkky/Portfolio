import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/activities", label: "Activities" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    return location === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm shadow-sm z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-xl font-bold text-foreground">Rishabh's Portfolio</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b-2 border-transparent hover:border-primary transition-colors duration-200 px-1 py-2 ${
                    isActive(item.href) 
                      ? "text-primary border-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="text-muted-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href) 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
