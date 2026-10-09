import { useState } from "react";
import { ArrowRight, FileText, ScanLine, Video, Scissors, BookOpen, MessageSquare, Cat, Library, PenTool, Phone } from "lucide-react";

const illustrations = [
  { icon: FileText, steps: ["Document", "Analysis", "Summary"] },
  { icon: ScanLine, steps: ["Image", "Detection", "Alert"] },
  { icon: Video, steps: ["Cameras", "Frames", "Vision"] },
  { icon: Scissors, steps: ["Image", "Mask", "Cutout"] },
  { icon: BookOpen, steps: ["Article", "Language", "Insights"] },
  { icon: MessageSquare, steps: ["Question", "Model", "Response"] },
  { icon: Cat, steps: ["Prompt", "Model", "Image"] },
  { icon: Library, steps: ["Question", "Retrieval", "Answer"] },
  { icon: PenTool, steps: ["Research", "Draft", "Review"] },
  { icon: Phone, steps: ["Call", "AI", "Conversation"] },
];

export default function ProjectArtwork({ project }: { project: { id: number; image: string; imageLabel?: string; title: string } }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const { icon: Icon, steps } = illustrations[project.id - 1] || illustrations[0];
  return (
    <div className="project-cover relative aspect-[16/10] overflow-hidden border-b border-border">
      {project.image && failedImage !== project.image ? (
        <>
          <img src={project.image} alt={`${project.title}: ${project.imageLabel || "application screenshot"}`} width={1440} height={960} loading="lazy" onError={() => setFailedImage(project.image)} className="w-full h-full object-cover object-center" />
          <span className="absolute bottom-3 left-3 bg-background text-foreground rounded-md px-2 py-1 text-[10px] tracking-wider uppercase">{project.imageLabel || "Application screenshot"}</span>
        </>
      ) : (
        <div className="h-full flex flex-col justify-between p-5 sm:p-6" role="img" aria-label={`${project.title} workflow illustration: ${steps.join(" to ")}`}>
          <div className="flex items-start justify-between"><Icon className="text-primary" size={30} strokeWidth={1.25} /><span className="text-[10px] uppercase tracking-[.18em] text-muted-foreground">Workflow illustration</span></div>
          <div className="flex items-center justify-between gap-1">
            {steps.map((step, index) => <div className="contents" key={step}><span className="rounded-lg border border-border bg-card px-2 py-3 text-[11px] sm:text-xs text-foreground">{step}</span>{index < 2 && <ArrowRight className="text-primary shrink-0" size={14} />}</div>)}
          </div>
          <span className="text-[10px] tracking-[.2em] text-muted-foreground">{String(project.id).padStart(2, "0")} / RISHABH'S PROJECTS</span>
        </div>
      )}
    </div>
  );
}
