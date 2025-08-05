import { Link } from "wouter";
import { Code, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import SplashCursor from "@/components/SplashCursor";

const stats = [
  { value: "15+", label: "Projects Completed" },
  { value: "1+", label: "Years Experience" },
  { value: "25+", label: "Happy Clients" },
  { value: "15+", label: "Technologies" },
];

export default function Home() {
  return (
    <PageTransition>
      <SplashCursor />
      <div>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hi, I'm <span className="text-primary">Rishabh Kumar Kannaujiya</span>
              </motion.h1>
              <motion.h2 
                className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                GenAI Developer & AI/ML Engineer
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Crafting cutting-edge AI/ML solutions with modern generative intelligence frameworks.
                Passionate about developing scalable GenAI applications that deliver meaningful impact.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/projects">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <Code className="mr-2" size={20} />
                    Explore Projects
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                    <Mail className="mr-2" size={20} />
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ChevronDown className="text-muted-foreground" size={24} />
          </motion.div>
        </section>
        
        {/* Quick Stats Section */}
        <AnimatedSection>
          <section className="py-16 bg-card">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, staggerChildren: 0.1 }}
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-200">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </PageTransition>
  );
}
