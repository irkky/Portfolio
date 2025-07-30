import { Link } from "wouter";
import { Code, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "15+", label: "Projects Completed" },
  { value: "1+", label: "Years Experience" },
  { value: "25+", label: "Happy Clients" },
  { value: "15+", label: "Technologies" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-custom mb-6">
              Hi, I'm <span className="text-primary-custom">Rishabh Kumar Kannaujiya</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-600 mb-8 font-light">
              GenAI Developer & AI/ML Engineer
            </h2>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Crafting cutting‑edge AI/ML solutions with modern generative intelligence frameworks.
              Passionate about developing scalable GenAI applications that deliver meaningful impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/projects">
                <Button className="bg-primary-custom hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Code className="mr-2" size={20} />
                  Explore Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                  <Mail className="mr-2" size={20} />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-slate-400" size={24} />
        </div>
      </section>
      
      {/* Quick Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-custom mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
