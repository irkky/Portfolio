import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "web",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A React Native app for team collaboration with real-time updates and offline functionality.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    technologies: ["React Native", "Firebase", "Redux"],
    category: "mobile",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Interactive dashboard for visualizing complex data sets with real-time updates and custom reports.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    technologies: ["Vue.js", "D3.js", "Python"],
    category: "web",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "RESTful API Service",
    description: "Scalable API service with authentication, rate limiting, and comprehensive documentation.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    technologies: ["Express.js", "PostgreSQL", "Docker"],
    category: "api",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Social Media Platform",
    description: "Full-stack social platform with real-time messaging, media sharing, and user interactions.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    technologies: ["React", "GraphQL", "Socket.io"],
    category: "web",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    description: "Cross-platform fitness app with workout tracking, progress analytics, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    technologies: ["Flutter", "Node.js", "MongoDB"],
    category: "mobile",
    demoUrl: "#",
    githubUrl: "#"
  }
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
  { id: "mobile", label: "Mobile" },
  { id: "api", label: "APIs" },
];

const techColors: { [key: string]: string } = {
  "React": "bg-blue-100 text-blue-800",
  "Node.js": "bg-green-100 text-green-800",
  "MongoDB": "bg-purple-100 text-purple-800",
  "React Native": "bg-blue-100 text-blue-800",
  "Firebase": "bg-yellow-100 text-yellow-800",
  "Redux": "bg-red-100 text-red-800",
  "Vue.js": "bg-blue-100 text-blue-800",
  "D3.js": "bg-green-100 text-green-800",
  "Python": "bg-orange-100 text-orange-800",
  "Express.js": "bg-green-100 text-green-800",
  "PostgreSQL": "bg-blue-100 text-blue-800",
  "Docker": "bg-gray-100 text-gray-800",
  "GraphQL": "bg-purple-100 text-purple-800",
  "Socket.io": "bg-yellow-100 text-yellow-800",
  "Flutter": "bg-blue-100 text-blue-800",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.category === activeFilter
  );

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-custom mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-primary-custom mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A collection of projects that showcase my skills and passion for creating exceptional digital experiences.
          </p>
        </div>
        
        {/* Project Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-lg ${
                activeFilter === filter.id 
                  ? "bg-primary-custom text-white" 
                  : "bg-white text-slate-600 hover:text-primary-custom"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-custom mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${techColors[tech] || "bg-gray-100 text-gray-800"}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a 
                    href={project.demoUrl} 
                    className="text-primary-custom hover:text-blue-600 font-medium transition-colors flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  <a 
                    href={project.githubUrl} 
                    className="text-slate-600 hover:text-secondary-custom font-medium transition-colors flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} className="mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
