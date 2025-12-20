import { useEffect, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";

const projects = [
  {
    id: 1,
    title: "LegalMate",
    description:
      "AI-powered tool to quickly analyze legal documents, extract key info, detect risks, and generate summaries saving time and effort.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flegalmateindia.com%2Fwp-content%2Fuploads%2F2024%2F03%2FLegalMate-Law-Firm-Logo-2.png&f=1&nofb=1&ipt=2e0632657fd80d2eb999d5087694d280d40c53d49395d6c1997ca439c6a5aac1&auto=format&fit=crop&w=800&h=500",
    technologies: ["React", "Node.js", "MongoDB", "Google Cloud Platform"],
    category: "Web",
    demoUrl: "https://legal-document-analysis-system.vercel.app/",
    githubUrl:
      "https://github.com/irkky/LegalMate---AI-Powered-Legal-Document-Analysis-System",
  },
  {
    id: 2,
    title: "AI powered Accident Detection System",
    description:
      "An application that detects accidents in images and triggers emergency responses using AI. Built for rapid emergency response integration & smart city applications.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftpp.hikvision.com%2FCommon%2FImages%2FCache%2F86c89780a40f4caf8e645812bac576c3.jpg&f=1&nofb=1&ipt=28dfd7ad300e505aa49cc3e5f104195ece71a7222522251f3ac5d71efe38e3e4&auto=format&fit=crop&w=800&h=500",
    technologies: ["Python", "Google Cloud Platform", "Streamlit", "Twilio"],
    category: "Computer Vision",
    demoUrl:
      "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_ai-python-genai-activity-7321617472279769090-NIcF?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/AI-powered-Accident-Detection-System",
  },
  {
    id: 3,
    title: "Multi Camera CCTV Video Processing",
    description:
      "A comprehensive system for processing and analyzing multi-camera CCTV footage using advanced computer vision techniques.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F02%2F95%2F45%2F83%2F1000_F_295458329_5acHhOLvs9ZLIpcsLlFmUyU44KKwITtE.jpg&f=1&nofb=1&ipt=e40d50462cc9c6ae0bed6727da1af15879eae2d64fce784b2ae829682d46fb3e&auto=format&fit=crop&w=800&h=500",
    technologies: ["TensorFlow", "OpenCV", "Python", "NumPy", "Computer Vision"],
    category: "Computer Vision",
    demoUrl:
      "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_computervision-python-tensorflow-activity-7220721661187170304-iCvG?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/Multi-Camera-CCTV-Video-Processing",
  },
  {
    id: 4,
    title: "AI Powered Background Remover",
    description:
      "An AI-powered tool that removes backgrounds from images, enhancing visual content for various applications. Ideal for e-commerce, social media, and content creation.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.aiarty.com%2Fimages%2Fai-image-matting%2Findex%2Fgallery-img2.png&f=1&nofb=1&ipt=4b5576a92b237b27d76388f6b6457d523dfb73939bd4ec71cc54e64539cbc9ef&auto=format&fit=crop&w=800&h=500",
    technologies: ["PyTorch", "Python", "Streamlit", "Hugging Face", "NumPy", "Pandas", "OpenCV"],
    category: "Computer Vision",
    demoUrl:
      "https://ai-powered-background-remover-586czjzdqxbhwjzz3uugb9.streamlit.app/",
    githubUrl: "https://github.com/irkky/AI-Powered-Background-Remover",
  },
  {
    id: 5,
    title: "WebLexis",
    description:
      "A web application that scrapes articles from the web, analyzes their language, and provides insights into readability, sentiment, and more.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FIO-Yc07Pifk%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=56e233150968d0a5305d76d362632c57e526370f23bba9d28cf04bee236bd9ef&auto=format&fit=crop&w=800&h=500",
    technologies: ["Python", "NLTK", "Pandas", "Selenium"],
    category: "Web Scraping",
    githubUrl:
      "https://github.com/irkky/WebLexis-Scraping-and-Analyzing-the-Language-of-Articles",
  },
  {
    id: 6,
    title: "LangChain-ChatBot",
    description:
      "A chatbot application built using LangChain, integrating various AI models to provide intelligent responses and interactions.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.w3villa.com%2Fassets%2F400%2Foriginal%2F14-June-web-Blog.jpg&f=1&nofb=1&ipt=7d65fb73487bd5f43943db0285d805a283761ff1243de43be8e6c2f7c8e566f1&auto=format&fit=crop&w=800&h=500",
    technologies: ["LangChain", "OpenAI", "Streamlit", "Python"],
    category: "GenAI",
    demoUrl:
      "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_langchain-gpt-openai-activity-7107355860850421760-dJul?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/LangChain-ChatBot",
  },
  {
    id: 7,
    title: "My-pet-cat",
    description:
      "A fun project that generates images of a pet cat using AI, showcasing the capabilities of generative models in creating realistic images.",
    image: "https://huggingface.co/btwitsRishabh/my-pet-cat/resolve/main/sample_images/xzg_(2).jpg",
    technologies: ["Hugging Face", "Python"],
    category: "GenAI",
    demoUrl: "https://huggingface.co/irkky/my-pet-cat",
    githubUrl: "https://huggingface.co/irkky/my-pet-cat/tree/main",
  },
  {
    id: 8,
    title: "Medical-RAG-Streamlit-Application",
    description:
      "An intelligent RAG-based Medical Assistant built with Streamlit, LangChain, and Llama 3.1.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-thumbnails.huggingface.co%2Fsocial-thumbnails%2Fspaces%2Fsubikshanand%2FRAG_Medical-Bot.png&f=1&nofb=1&ipt=5d0394d01778d1817f7ec0267465380cdcb19880a4f4bdb7dacc4093f6c82f1d",
    technologies: ["Hugging Face", "Streamlit", "LangChain", "Llama 3.1", "Pinecone", "Python"],
    category: "GenAI",
    demoUrl: "https://github.com/irkky/Medical-RAG-Streamlit-Application",
    githubUrl: "https://github.com/irkky/Medical-RAG-Streamlit-Application",
  },
  {
    id: 8,
    title: "AI-Blog-Agent",
    description:
      "A production-grade multi-agent content creation system powered by Google ADK and Gemini 2.5",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOVP.HH2vYHAA_iCXAovdyM3USgHgFo%3Fpid%3DApi%26ucfimg%3D1&f=1",
    technologies: ["Streamlit", "Python", "Google ADK", "Gemini 2.5"],
    category: "GenAI",
    demoUrl: "https://www.kaggle.com/code/rishabhkannaujiya/ai-blog-agent-capstone-submission-concierge",
    githubUrl: "https://github.com/irkky/AI-Blog-Agent",
  },
  {
    id: 9,
    title: "Autodialer-AI-Powered-Calling-System",
    description:
      "Ruby on Rails application that transforms outbound calling through seamless AI-driven automation.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nextiva.com%2Fblog%2Fwp-content%2Fuploads%2Fsites%2F10%2F2024%2F08%2FAI-Call-Center-2.webp&f=1&nofb=1&ipt=176d3df9bed6376d7bf971ef80f2fba792f5faf0fc4e0df0489c17f1c455a91e",
    technologies: ["Ruby on Rails", "Gemini 2.5", "twilio", "PostgreSQL"],
    category: "GenAI",
    demoUrl: "https://github.com/irkky/Autodialer-AI-Powered-Calling-System",
    githubUrl: "https://github.com/irkky/Autodialer-AI-Powered-Calling-System",
  },
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "Web", label: "Web Apps" },
  { id: "GenAI", label: "GenAI" },
  { id: "Computer Vision", label: "Computer Vision" },
  { id: "Web Scraping", label: "Web Scraping" },
];

const techColors: { [key: string]: string } = {
  React: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Streamlit: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Computer Vision": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  NLTK: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  OpenAI: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Selenium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  OpenCV: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Twilio: "bg-yellow-200 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-400",
  "Google Cloud Platform":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Next.js": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  "Tailwind CSS": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "TypeScript": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  TensorFlow: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  LangChain: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Hugging Face": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  FastAPI: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Flask: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Django: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  NumPy: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Pandas: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Scikit-learn": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  PyTorch: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Keras: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  JavaScript: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  HTML: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  CSS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Bootstrap: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Sass: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  jQuery: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Angular: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Node.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  MongoDB: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "React Native": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Python: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Express.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  PostgreSQL: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Docker: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  GraphQL: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Socket.io": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Flutter: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    // close modal on Escape
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedProject(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = [project.title, project.description, (project.technologies || []).join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Featured Projects
              </motion.h2>
              <motion.div
                className="w-28 h-1 bg-gradient-to-r from-primary to-emerald-400 mx-auto mb-6 rounded"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                A collection of projects that showcase my skills and passion for creating exceptional digital
                experiences.
              </motion.p>
            </div>
          </AnimatedSection>

          {/* Controls: search + filters */}
          <AnimatedSection delay={0.15}>
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-8">
              <div className="flex items-center gap-3 w-full md:w-1/2">
                <label htmlFor="project-search" className="sr-only">
                  Search projects
                </label>
                <div className="relative w-full">
                  <input
                    id="project-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title, tech or description..."
                    className="w-full rounded-full border border-border bg-card px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {filteredProjects.length} found
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                {filters.map((filter, idx) => {
                  // small count badge for each filter
                  const count = projects.filter((p) => filter.id === "all" || p.category === filter.id).length;
                  const active = activeFilter === filter.id;
                  return (
                    <motion.button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      className={`px-4 py-1.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all duration-200 shadow-sm focus:outline-none ${{
                        true: "",
                      }}`}
                      aria-pressed={active}
                      style={{
                        background: active ? "var(--primary)" : undefined,
                        color: active ? "white" : undefined,
                        border: active ? "none" : "1px solid var(--border)",
                      }}
                    >
                      <span>{filter.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-card text-muted-foreground">{count}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform overflow-hidden border border-border cursor-pointer relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      hovered === project.id ? "scale-110" : ""
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x500?text=Project+Image";
                    }}
                  />

                  {/* subtle gradient overlay + quick-actions */}
                  <div
                    className={`absolute inset-0 flex items-end p-4 transition-all duration-300 ${
                      hovered === project.id ? "bg-black/30" : "bg-black/10"
                    }`}
                    aria-hidden
                  >
                    <div className="w-full flex justify-between items-center">
                      <div className="text-sm text-white font-semibold drop-shadow">{project.title}</div>
                      <div className="flex gap-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white/20 px-3 py-1 text-xs flex items-center gap-2 backdrop-blur"
                            title="Open demo in new tab"
                          >
                            <ExternalLink size={14} />
                            Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white/20 px-3 py-1 text-xs flex items-center gap-2 backdrop-blur"
                            title="View source on GitHub"
                          >
                            <Github size={14} />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {(project.technologies || []).map((tech: string) => (
                      <motion.span
                        key={tech}
                        className={`px-2 py-1 rounded-full text-sm font-medium ${techColors[tech] ||
                          "bg-muted text-muted-foreground"}`}
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                    <div className="flex items-center gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium flex items-center gap-2"
                        >
                          <ExternalLink size={14} />
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                        >
                          <Github size={14} />
                          Repo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setSelectedProject(null)}
                  aria-hidden
                />

                <motion.div
                  className="relative max-w-3xl w-full bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <div className="flex justify-between items-start p-4">
                    <div>
                      <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedProject.category}</p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="rounded-full p-2 hover:bg-muted"
                      aria-label="Close project details"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 p-4">
                    <div className="h-64 md:h-auto">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">{selectedProject.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {(selectedProject.technologies || []).map((t: string) => (
                            <span key={t} className={`px-3 py-1 rounded-full text-sm ${techColors[t] || "bg-muted text-muted-foreground"}`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        {selectedProject.demoUrl && (
                          <a
                            href={selectedProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white font-medium"
                          >
                            <ExternalLink size={16} />
                            View Demo
                          </a>
                        )}

                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border"
                          >
                            <Github size={16} />
                            View Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
