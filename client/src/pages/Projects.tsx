import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import ProjectArtwork from "@/components/ProjectArtwork";
import { createPortal } from "react-dom";
import { ExternalLink, Github, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  imageLabel?: string;
  technologies: string[];
  category: string;
  slug?: string;
  demoLabel?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "legalmate",
    demoLabel: "Live app",
    title: "LegalMate",
    description:
      "AI-powered tool to quickly analyze legal documents, extract key info, detect risks, and generate summaries saving time and effort.",
    image: "/project-media/legalmate-home.webp",
    technologies: ["React", "Node.js", "MongoDB", "Mistral 8x7B"],
    category: "Web",
    demoUrl: "https://legal-document-analysis-system.vercel.app/",
    githubUrl: "https://github.com/irkky/LegalMate---AI-Powered-Legal-Document-Analysis-System",
  },
  {
    id: 2,
    slug: "accident-detection",
    demoLabel: "Watch demo",
    title: "Accident Detection",
    description:
      "An application that detects accidents in images and triggers emergency responses using AI. Built for rapid emergency response integration & smart city applications.",
    image: "",
    technologies: ["Python", "Gemini", "Streamlit", "Twilio"],
    category: "Computer Vision",
    demoUrl: "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_ai-python-genai-activity-7321617472279769090-NIcF?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/AI-powered-Accident-Detection-System",
  },
  {
    id: 3,
    demoLabel: "Watch demo",
    title: "Multi-Camera CCTV",
    description:
      "A comprehensive system for processing and analyzing multi-camera CCTV footage using advanced computer vision techniques.",
    image: "",
    technologies: ["TensorFlow", "OpenCV", "Python", "NumPy", "Computer Vision"],
    category: "Computer Vision",
    demoUrl: "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_computervision-python-tensorflow-activity-7220721661187170304-iCvG?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/Multi-Camera-CCTV-Video-Processing",
  },
  {
    id: 4,
    demoLabel: "Live app",
    title: "Background Remover",
    description:
      "An AI-powered tool that removes backgrounds from images, enhancing visual content for various applications. Ideal for e-commerce, social media, and content creation.",
    image: "",
    technologies: ["PyTorch", "Python", "Streamlit", "Hugging Face", "NumPy", "Pandas", "OpenCV"],
    category: "Computer Vision",
    demoUrl: "https://ai-powered-background-remover-586czjzdqxbhwjzz3uugb9.streamlit.app/",
    githubUrl: "https://github.com/irkky/AI-Powered-Background-Remover",
  },
  {
    id: 5,
    title: "WebLexis",
    description:
      "A web application that scrapes articles from the web, analyzes their language, and provides insights into readability, sentiment, and more.",
    image: "",
    technologies: ["Python", "NLTK", "Pandas", "Selenium"],
    category: "Web Scraping",
    githubUrl: "https://github.com/irkky/WebLexis-Scraping-and-Analyzing-the-Language-of-Articles",
  },
  {
    id: 6,
    demoLabel: "Watch demo",
    title: "LangChain Chatbot",
    description:
      "A chatbot application built using LangChain, integrating various AI models to provide intelligent responses and interactions.",
    image: "",
    technologies: ["LangChain", "OpenAI", "Streamlit", "Python"],
    category: "GenAI",
    demoUrl: "https://www.linkedin.com/posts/rishabh-kr-kannaujiya_langchain-gpt-openai-activity-7107355860850421760-dJul?utm_source=share&utm_medium=member_desktop&rcm=ACoAADSHLP4B3jdoLFGD8Jb2wdsg55ddJlGU3gE",
    githubUrl: "https://github.com/irkky/LangChain-ChatBot",
  },
  {
    id: 7,
    demoLabel: "Model",
    title: "My Pet Cat",
    description:
      "A fun project that generates images of a pet cat using AI, showcasing the capabilities of generative models in creating realistic images.",
    image: "",
    technologies: ["Hugging Face", "Python"],
    category: "GenAI",
    demoUrl: "https://huggingface.co/irkky/my-pet-cat",
    githubUrl: "https://huggingface.co/irkky/my-pet-cat/tree/main",
  },
  {
    id: 8,
    title: "Medical RAG Assistant",
    description:
      "An intelligent RAG-based Medical Assistant built with Streamlit, LangChain, and Llama 3.1.",
    image: "",
    technologies: ["Hugging Face", "Streamlit", "LangChain", "Llama 3.1", "Pinecone", "Python"],
    category: "GenAI",
    githubUrl: "https://github.com/irkky/Medical-RAG-Streamlit-Application",
  },
  {
    id: 9,
    slug: "ai-blog-agent",
    demoLabel: "Notebook",
    title: "AI Blog Agent",
    description:
      "A multi-agent writing workflow that coordinates research, drafting, review, and SEO with Google ADK and Gemini 2.5.",
    image: "/project-media/blog-agent-video.jpg",
    imageLabel: "Recorded demo preview",
    technologies: ["Streamlit", "Python", "Google ADK", "Gemini 2.5"],
    category: "GenAI",
    demoUrl: "https://www.kaggle.com/code/rishabhkannaujiya/ai-blog-agent-capstone-submission-concierge",
    githubUrl: "https://github.com/irkky/AI-Blog-Agent",
  },
  {
    id: 10,
    title: "AI Calling System",
    description:
      "Ruby on Rails application that transforms outbound calling through seamless AI-driven automation.",
    image: "",
    technologies: ["Ruby on Rails", "Gemini 2.5", "Twilio", "PostgreSQL"],
    category: "GenAI",
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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    if (!selectedProject) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedProject(null);
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [selectedProject]);

  const handleProjectKeyDown = (event: React.KeyboardEvent<HTMLElement>, project: Project) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedProject(project);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = [project.title, project.description, (project.technologies || []).join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => Number(Boolean(b.slug)) - Number(Boolean(a.slug)));

  return (
    <PageTransition>
      <div className="py-12 sm:py-20 bg-background">
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
                Applied AI, from document understanding to computer vision. Explore the work, then go deeper into the decisions behind it.
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
                    placeholder="Search projects or technologies"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span role="status" aria-live="polite" className="block mt-2 text-xs text-muted-foreground">
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
                      className="px-4 py-1.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all duration-200 shadow-sm focus:outline-none"
                      aria-pressed={active}
                      style={{
                        background: active ? "var(--primary)" : undefined,
                        color: active ? "var(--primary-foreground)" : undefined,
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
                className="bg-card rounded-xl transition-all duration-200 overflow-hidden border border-border hover:border-primary cursor-pointer relative flex flex-col"
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`View details for ${project.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, delay: index * 0.04 } }}
                whileHover="hover"
                variants={{ hover: { scale: 1.02 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(event) => handleProjectKeyDown(event, project)}
              >
                <ProjectArtwork project={project} />

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {project.slug && <span className="case-label mb-3">Featured case study</span>}
                  <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {(project.technologies || []).slice(0, 3).map((tech: string) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 rounded-full text-sm font-medium project-chip"
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-4 border-t border-border">
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
                          {project.demoLabel}
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
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                  {project.slug && <Link href={`/projects/${project.slug}`} onClick={e => e.stopPropagation()} className="project-button project-button-primary mt-5">Read case study <ArrowUpRight size={16} aria-hidden="true" /></Link>}
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && <div className="case-panel text-center my-8" role="status">
            <h3 className="text-xl mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-5">Try another technology or reset your filters.</p>
            <button className="project-button" onClick={() => { setSearch(""); setActiveFilter("all"); }}>Clear search and filters</button>
          </div>}

          {/* Modal */}
          {createPortal(<AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
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
                  ref={modalRef}
                  className="relative max-w-3xl w-full max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain bg-card rounded-2xl shadow-2xl border border-border"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="project-dialog-title"
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <div className="flex justify-between items-start p-4">
                    <div>
                      <h3 id="project-dialog-title" className="text-xl font-bold">{selectedProject.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedProject.category}</p>
                    </div>
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="rounded-full p-2 hover:bg-muted"
                      aria-label="Close project details"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 p-4">
                    <div className="overflow-hidden rounded-xl"><ProjectArtwork project={selectedProject} /></div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">{selectedProject.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {(selectedProject.technologies || []).map((t: string) => (
                            <span key={t} className="px-3 py-1 rounded-full text-sm project-chip">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedProject.slug && <Link href={`/projects/${selectedProject.slug}`} onClick={() => setSelectedProject(null)} className="project-button project-button-primary mb-4">Read the full case study <ArrowUpRight size={16} /></Link>}
                      <div className="flex flex-wrap gap-3 mt-auto">
                        {selectedProject.demoUrl && (
                          <a
                            href={selectedProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium"
                          >
                            <ExternalLink size={16} />
                            {selectedProject.demoLabel}
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
          </AnimatePresence>, document.body)}
        </div>
      </div>
    </PageTransition>
  );
}
