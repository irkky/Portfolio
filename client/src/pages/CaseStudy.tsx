import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import ProjectArtwork from "@/components/ProjectArtwork";
import { projects } from "./Projects";

// Project descriptions are grounded in the linked public repositories.
// Tradeoffs and takeaways explain the documented design; they are not personal quotes.
const studies: Record<string, {
  eyebrow: string; subtitle: string; context: string; status: string;
  problem: string; approach: string; steps: string[];
  tradeoff: string; takeaway: string; outcome: string; scope: string;
  stack: string[]; video?: string;
}> = {
  legalmate: {
    eyebrow: "01 / Document intelligence",
    subtitle: "From dense documents to a clearer review workflow.",
    context: "Group-04 · REC Bijnor",
    status: "Team project · Public frontend",
    problem: "Legal professionals need to find important entities and potential risks without losing the context of the original document.",
    approach: "LegalMate combines document upload, text extraction, entity recognition, and AI summaries in a React application. It was developed by Ajitesh Mishra, Ratan Yadav, and Rishabh Kumar Kannaujiya.",
    steps: ["React · PDF, DOCX or TXT upload", "Express · File handling and text extraction", "Mistral + Compromise · Summary and entities", "MongoDB · Document history"],
    tradeoff: "Separate extraction from interpretation: structured entities and generated summaries answer different review questions. A readable summary should remain connected to the source document.",
    takeaway: "The useful interface brings the document, extracted information, and interpretation together so a reviewer can compare them.",
    outcome: "A documented upload-to-summary workflow with a publicly accessible upload interface and document library.",
    scope: "The screenshots show the public frontend. They do not establish backend availability or analysis accuracy; generated interpretations still need human review.",
    stack: ["React", "Express", "MongoDB", "Mistral 8x7B", "Compromise NLP"],
  },
  "accident-detection": {
    eyebrow: "02 / Computer vision",
    subtitle: "Connecting image analysis to an alert workflow.",
    context: "Python · Service integration",
    status: "Prototype · Recorded demo",
    problem: "A traffic-monitoring concept needs more than an image classification: a suspected incident must connect to location information and an actionable notification.",
    approach: "The Python application uses Streamlit for image input, Gemini for accident analysis, Google Places for nearby hospitals, and Twilio for SMS. Detection, hospital lookup, and messaging have separate service modules.",
    steps: ["Streamlit · Image input", "Gemini · Accident analysis", "Google Places · Hospital lookup", "Twilio · SMS notification"],
    tradeoff: "Hosted services reduce the amount of infrastructure needed for a prototype, but network failures and model errors can affect the entire notification flow.",
    takeaway: "Detection quality and successful message delivery are separate engineering questions. Both need evaluation before a real-world alerting deployment.",
    outcome: "A documented image-to-alert prototype, with source code and a linked demonstration of the project.",
    scope: "No field-validation dataset or measured accuracy is published in this case study. This is a prototype, not a verified emergency-response system.",
    stack: ["Python", "Streamlit", "Gemini", "Google Places", "Twilio"],
  },
  "ai-blog-agent": {
    eyebrow: "03 / Agent workflows",
    subtitle: "Making the steps of AI-assisted writing visible.",
    context: "AI Agents Intensive · Capstone project",
    status: "Capstone · Recorded demo",
    problem: "Turning a topic into an article involves research, structure, drafting, revision, and presentation. A single generated response makes those stages difficult to inspect.",
    approach: "AI Blog Agent coordinates specialized agents with Google ADK and Gemini. The project provides Streamlit and command-line entry points, session context, structured logs, and an evaluation stage.",
    steps: ["Research · Gather context", "Outline and draft · Build the article", "Critique and SEO · Refine the output", "Evaluation · Inspect quality scores"],
    tradeoff: "Separating stages makes intermediate outputs inspectable, while adding model calls and context-management work. The documented truncation strategy bounds the text carried between stages.",
    takeaway: "An evaluation score helps diagnose a workflow; it is not a substitute for checking the article's sources and factual claims.",
    outcome: "A published capstone write-up, a recorded walkthrough, and a documented workflow with per-agent logging.",
    scope: "Quality scores are model-generated assessments. No independently verified speed or quality improvement is claimed here.",
    stack: ["Python", "Google ADK", "Gemini 2.5", "Streamlit"],
    video: "kQpODXEVUUI",
  },
};

export default function CaseStudy() {
  const [, params] = useRoute("/projects/:slug");
  const project = projects.find(item => item.slug === params?.slug);
  const study = studies[params?.slug || ""];
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  if (!project || !study) return <div className="max-w-6xl mx-auto px-6 py-24"><h1 className="text-3xl mb-5">Case study not found</h1><Link href="/projects" className="project-button">Back to projects</Link></div>;

  return <PageTransition variant="fade">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12"><ArrowLeft size={16} /> All projects</Link>
      <header className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center mb-12 sm:mb-20">
        <div>
          <p className="case-label mb-5">{study.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-5">{project.title}</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-7">{study.subtitle}</p>
          <p className="text-sm text-primary mb-6">{study.status}</p>
          <div className="flex flex-wrap gap-3">
            {project.demoUrl && <a className="project-button project-button-primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">{project.demoLabel}<ArrowUpRight size={16} /></a>}
            <a className="project-button" href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code<ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden"><ProjectArtwork project={project} /></div>
      </header>

      <div className="border-y border-border py-6 grid sm:grid-cols-2 gap-5 mb-12">
        <div><p className="case-label mb-2">Project context</p><p>{study.context}</p></div>
        <div><p className="case-label mb-2">Built with</p><div className="flex flex-wrap gap-2">{study.stack.map(tech => <span key={tech} className="project-chip rounded-full px-3 py-1 text-xs">{tech}</span>)}</div></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <section className="case-panel"><p className="case-label mb-4">The problem</p><h2 className="text-2xl mb-4">What needed solving</h2><p className="text-muted-foreground">{study.problem}</p></section>
        <section className="case-panel"><p className="case-label mb-4">The implementation</p><h2 className="text-2xl mb-4">How the project approaches it</h2><p className="text-muted-foreground">{study.approach}</p></section>
      </div>

      <section className="mb-12 sm:mb-16" aria-labelledby="architecture-title">
        <p className="case-label mb-3">Architecture</p><h2 id="architecture-title" className="text-3xl mb-7">A look at the workflow</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{study.steps.map((step, index) => <li key={step} className="case-panel"><span className="text-primary text-sm block mb-5">0{index + 1}</span><p className="font-medium">{step}</p></li>)}</ol>
        <p className="text-xs text-muted-foreground mt-4">Simplified workflow based on the project documentation.</p>
      </section>

      {project.id === 1 && <section className="mb-12"><p className="case-label mb-3">Inside the application</p><h2 className="text-3xl mb-6">The document upload experience</h2><figure className="rounded-2xl border border-border overflow-hidden"><a href="/project-media/legalmate-home.webp" target="_blank" rel="noopener noreferrer" aria-label="Open full LegalMate screenshot"><img src="/project-media/legalmate-home.webp" alt="LegalMate public interface with document upload and risk detection, entity recognition, and summary features" width={1440} height={960} loading="lazy" className="w-full" /></a><figcaption className="p-4 text-sm text-muted-foreground bg-card">Public frontend captured on 9 October 2026. No analysis result is simulated.</figcaption></figure></section>}

      {study.video && <section className="mb-12"><p className="case-label mb-3">Recorded walkthrough</p><h2 className="text-3xl mb-6">See the project in action</h2><div className="aspect-video rounded-2xl overflow-hidden border border-border bg-surface">{playingVideo === study.video ? <iframe className="w-full h-full" title="AI Blog Agent project walkthrough" src={`https://www.youtube-nocookie.com/embed/${study.video}?autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <button type="button" onClick={() => setPlayingVideo(study.video!)} className="relative w-full h-full flex flex-col justify-center items-center gap-3 text-white group"><img src="/project-media/blog-agent-video.jpg" alt="" width={480} height={360} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity" /><Play size={42} className="relative" /><span className="relative text-lg sm:text-xl font-medium">Play AI Blog Agent walkthrough</span><span className="relative text-xs sm:text-sm">Loads the project video from YouTube</span></button>}</div><a href={`https://www.youtube.com/watch?v=${study.video}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary inline-block mt-3">Watch on YouTube ↗</a></section>}

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <section className="case-panel"><p className="case-label mb-4">Engineering perspective</p><h2 className="text-2xl mb-4">The design tradeoff</h2><p className="text-muted-foreground">{study.tradeoff}</p></section>
        <section className="case-panel"><p className="case-label mb-4">Takeaway</p><h2 className="text-2xl mb-4">What the design illustrates</h2><p className="text-muted-foreground">{study.takeaway}</p></section>
      </div>

      <section className="case-panel mb-12"><p className="case-label mb-4">Outcome & scope</p><h2 className="text-2xl mb-4">What you can explore</h2><p className="mb-4">{study.outcome}</p><p className="text-muted-foreground text-sm mb-5">{study.scope}</p><a href={`${project.githubUrl}#readme`} target="_blank" rel="noopener noreferrer" className="text-primary text-sm underline underline-offset-4">Read the project documentation ↗</a></section>
      <nav aria-label="Other case studies" className="border-t border-border pt-8"><p className="case-label mb-5">Explore another project</p><div className="flex flex-wrap gap-3">{projects.filter(item => item.slug && item.id !== project.id).map(item => <Link className="project-button" key={item.id} href={`/projects/${item.slug}`}>{item.title}<ArrowUpRight size={16} /></Link>)}</div></nav>
    </div>
  </PageTransition>;
}
