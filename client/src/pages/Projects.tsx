import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";

const projects = [
  {
    id: 1,
    title: "LegalMate",
    description: "AI-powered tool to quickly analyze legal documents, extract key info, detect risks, and generate summaries saving time and effort.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flegalmateindia.com%2Fwp-content%2Fuploads%2F2024%2F03%2FLegalMate-Law-Firm-Logo-2.png&f=1&nofb=1&ipt=2e0632657fd80d2eb999d5087694d280d40c53d49395d6c1997ca439c6a5aac1&auto=format&fit=crop&w=800&h=500",
    technologies: ["React", "Node.js", "MongoDB", "Google Cloud Platform"],
    category: "Web",
    demoUrl: "https://legal-document-analysis-system.vercel.app/",
    githubUrl: "https://github.com/irkky/LegalMate---AI-Powered-Legal-Document-Analysis-System"
  },
  {
    id: 2,
    title: "AI powered Accident Detection System",
    description: "An application that detects accidents in images and triggers emergency responses using AI. Built for rapid emergency response integration & smart city applications.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftpp.hikvision.com%2FCommon%2FImages%2FCache%2F86c89780a40f4caf8e645812bac576c3.jpg&f=1&nofb=1&ipt=28dfd7ad300e505aa49cc3e5f104195ece71a7222522251f3ac5d71efe38e3e4&auto=format&fit=crop&w=800&h=500",
    technologies: ["Python", "Google Cloud Platform", "Streamlit", "Twilio"],
    category: "Computer Vision",
    demoUrl: "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_ai-python-genai-activity-7321617472279769090-NIcF?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/AI-powered-Accident-Detection-System"
  },
  {
    id: 3,
    title: "Multi Camera CCTV Video Processing",
    description: "A comprehensive system for processing and analyzing multi-camera CCTV footage using advanced computer vision techniques.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F02%2F95%2F45%2F83%2F1000_F_295458329_5acHhOLvs9ZLIpcsLlFmUyU44KKwITtE.jpg&f=1&nofb=1&ipt=e40d50462cc9c6ae0bed6727da1af15879eae2d64fce784b2ae829682d46fb3e&auto=format&fit=crop&w=800&h=500",
    technologies: ["TensorFlow", "OpenCV", "Python", "NumPy", "Computer Vision"],
    category: "Computer Vision",
    demoUrl: "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_computervision-python-tensorflow-activity-7220721661187170304-iCvG?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/Multi-Camera-CCTV-Video-Processing"
  },
  {
    id: 4,
    title: "AI Powered Background Remover",
    description: "An AI-powered tool that removes backgrounds from images, enhancing visual content for various applications. Ideal for e-commerce, social media, and content creation.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.aiarty.com%2Fimages%2Fai-image-matting%2Findex%2Fgallery-img2.png&f=1&nofb=1&ipt=4b5576a92b237b27d76388f6b6457d523dfb73939bd4ec71cc54e64539cbc9ef&auto=format&fit=crop&w=800&h=500",
    technologies: ["PyTorch", "Python", "Streamlit", "Hugging Face", "NumPy", "Pandas", "OpenCV"],
    category: "Computer Vision",
    demoUrl: "https://ai-powered-background-remover-586czjzdqxbhwjzz3uugb9.streamlit.app/",
    githubUrl: "https://github.com/irkky/AI-Powered-Background-Remover"
  },
  {
    id: 5,
    title: "WebLexis",
    description: "A web application that scrapes articles from the web, analyzes their language, and provides insights into readability, sentiment, and more.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FIO-Yc07Pifk%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=56e233150968d0a5305d76d362632c57e526370f23bba9d28cf04bee236bd9ef&auto=format&fit=crop&w=800&h=500",
    technologies: ["Python", "NLTK", "Pandas", "Selenium"],
    category: "Web Scraping",
    githubUrl: "https://github.com/irkky/WebLexis-Scraping-and-Analyzing-the-Language-of-Articles"
  },
  {
    id: 6,
    title: "LangChain-ChatBot",
    description: "A chatbot application built using LangChain, integrating various AI models to provide intelligent responses and interactions.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.w3villa.com%2Fassets%2F400%2Foriginal%2F14-June-web-Blog.jpg&f=1&nofb=1&ipt=7d65fb73487bd5f43943db0285d805a283761ff1243de43be8e6c2f7c8e566f1&auto=format&fit=crop&w=800&h=500",
  technologies: ["LangChain", "OpenAI", "Streamlit", "Python"],
    category: "GenAI",
    demoUrl: "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_langchain-gpt-openai-activity-7107355860850421760-dJul?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/LangChain-ChatBot"
  },
  {
    id: 7,
    title: "My-pet-cat",
    description: "A fun project that generates images of a pet cat using AI, showcasing the capabilities of generative models in creating realistic images.",
    image: "https://huggingface.co/btwitsRishabh/my-pet-cat/resolve/main/sample_images/xzg_(2).jpg",
    technologies: ["Hugging Face", "Python"],
    category: "GenAI",
    demoUrl: "https://huggingface.co/irkky/my-pet-cat",
    githubUrl: "https://huggingface.co/irkky/my-pet-cat/tree/main"
  }
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "Web", label: "Web Apps" },
  { id: "GenAI", label: "GenAI" },
  { id: "Computer Vision", label: "Computer Vision" },
  { id: "Web Scraping", label: "Web Scraping" },
];

const techColors: { [key: string]: string } = {
  "React": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Streamlit": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Computer Vision": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "NLTK": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "OpenAI": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Selenium": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "OpenCV": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Twilio": "bg-yellow-200 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-400",
  "Google Cloud Platform": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Next.js": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  "Tailwind CSS": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "TypeScript": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "TensorFlow": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "LangChain": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Hugging Face": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "FastAPI": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Flask": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Django": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "NumPy": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Pandas": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Scikit-learn": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "PyTorch": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Keras": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "JavaScript": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  "HTML": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "CSS": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Bootstrap": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Sass": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "jQuery": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Angular": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Node.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "MongoDB": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "React Native": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
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
                transition={{ duration: 0.1}}
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
                <div className="p-4 space-y-2">
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
                  <div className="flex gap-5 justify-between">
                    <motion.a 
                      href={project.demoUrl} 
                      className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} className="mr-1.5" />
                      Live Demo
                    </motion.a>
                    <motion.a 
                      href={project.githubUrl} 
                      className="text-muted-foreground hover:text-foreground font-medium transition-colors flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
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
