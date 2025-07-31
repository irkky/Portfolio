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
  "React": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Node.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "MongoDB": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "React Native": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Firebase": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Redux": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Vue.js": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "D3.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Python": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Express.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "PostgreSQL": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Docker": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  "GraphQL": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Socket.io": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Flutter": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.category === activeFilter
  );

  return (
    <PageTransition>
      <div className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Featured Projects
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-primary mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                A collection of projects that showcase my skills and passion for creating exceptional digital experiences.
              </motion.p>
            </div>
          </AnimatedSection>
          
          {/* Project Filter Buttons */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filters.map((filter, index) => (
                <motion.div
                  key={filter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => setActiveFilter(filter.id)}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${
                      activeFilter === filter.id 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-card text-foreground hover:text-primary border-border hover:border-primary"
                    }`}
                  >
                    {filter.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
          
          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-border"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <motion.span 
                        key={tech} 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${techColors[tech] || "bg-muted text-muted-foreground"}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.a 
                      href={project.demoUrl} 
                      className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </motion.a>
                    <motion.a 
                      href={project.githubUrl} 
                      className="text-muted-foreground hover:text-foreground font-medium transition-colors flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} className="mr-1" />
                      GitHub
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
