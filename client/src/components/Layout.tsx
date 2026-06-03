import Navigation from "./Navigation";
import Footer from "./Footer";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [pathname] = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "smooth";
    }, 10);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}