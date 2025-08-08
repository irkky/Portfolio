import { useEffect, useState } from "react";
import { GraduationCap, Briefcase, MapPin, Languages, Download, ChevronDown, ChevronUp, Mail, Github, Linkedin } from "lucide-react";
import AnimatedSection, { AnimatedStagger, StaggerItem } from "@/components/AnimatedSection";
import ProfileCard from "@/components/ProfileCard";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const personalInfo = [
  {
    icon: GraduationCap,
    title: "Education",
    content: "BTech in Information Technology\nDr. A. P. J. Abdul Kalam Technical University",
  },
  {
    icon: Briefcase,
    title: "Experience",
    content: "1+ Years\nAI/ML Development",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Varanasi, India\nRemote Available",
  },
  {
    icon: Languages,
    title: "Languages",
    content: "Hindi (Native)\nEnglish (Fluent)",
  },
];

const experience = [
  {
    period: "June, 2024 - July, 2024",
    role: "Python Development Intern",
    company: "Tehchtitude Tribe Pvt. Ltd.",
    description:
      "",
    highlights: [
      "Developed Python applications for various internal and client-facing projects. Assisted in deep learning tasks, including data preprocessing, model training, and data analysis.",
    ],
  },
];

export default function Profile() {
  const [openExp, setOpenExp] = useState<number | null>(null);
  const { toast } = useToast();

  const resumeUrl = "https://drive.google.com/file/d/1v9eyXKAhLOKmBCcF5o7a9k1RsgbbLIl1/view?usp=sharing"; // replace with your public resume path

  const handleCopy = async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: `${label ?? "Value"} copied`, description: `${text} copied to clipboard.` });
    } catch (e) {
      toast({ title: "Copy failed", description: "Could not copy to clipboard.", variant: "destructive" });
    }
  };

  // Small animated counters to add subtle interactivity (keeps structure unchanged)
  const [projects, setProjects] = useState(12);
  const [clients, setClients] = useState(3);
  const [kLoC, setKLoC] = useState(42);
  const [animatedProjects, setAnimatedProjects] = useState(0);
  const [animatedClients, setAnimatedClients] = useState(0);
  const [animatedKLoC, setAnimatedKLoC] = useState(0);

  useEffect(() => {
    // simple animation loops that count up when component mounts
    let raf: number;
    const start = performance.now();
    const duration = 900; // ms

    const loop = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setAnimatedProjects(Math.floor(t * projects));
      setAnimatedClients(Math.floor(t * clients));
      setAnimatedKLoC(Math.floor(t * kLoC));
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResume = () => {
    // open resume and notify user
    window.open(resumeUrl, "_blank");
    toast({ title: "Resume", description: "Opened resume in a new tab." });
  };

  return (
    <PageTransition>
      <div className="py-16 bg-background transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full shadow-sm"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              A passionate developer with a love for creating innovative solutions and exceptional user experiences — focused on practical, well-engineered AI/ML applications.
            </motion.p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <AnimatedSection variant="slideLeft" delay={0.15} className="flex justify-center lg:justify-start">
              <ProfileCard
                name="Rishabh Kannaujiya"
                title="AI/ML Developer"
                handle="irkky"
                status="Available"
                contactText="Contact Me"
                iconUrl=""
                avatarUrl="https://github.com/irkky/Portfolio/blob/246a7aafe69a8090988ef71de70e096337ad8552/public/photo%20for%20profile.png?raw=true"
                grainUrl="https://raw.githubusercontent.com/irkky/Portfolio/refs/heads/main/public/grain.webp"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={true}
                onContactClick={() => window.location.href = "/contact"}
              />
            </AnimatedSection>

            <AnimatedSection variant="slideRight" delay={0.25} className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  My journey into AI and machine learning began during my B.Tech in Information Technology, where I discovered how powerful algorithms could transform raw data into actionable insights. What started as a keen interest in Python scripting soon grew into a passion for designing end-to-end AI solutions — from automating document analysis to building real-time detection systems for smart cities.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through internships and self-driven projects, I've worked with TensorFlow, LangChain, Hugging Face, and cloud platforms like GCP. I prioritize clean, maintainable code and scalable pipelines that deliver tangible results.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={handleResume} className="flex items-center gap-2">
                    <Download size={16} />
                    Download Resume
                  </Button>

                  <Button variant="ghost" onClick={() => handleCopy("Varanasi, India", "Location")}>Copy Location</Button>

                  <Button variant="outline" onClick={() => window.open("mailto:rishabhkrkannaujiya@gmail.com") } title="Email me">
                    <Mail size={14} />
                    <span className="ml-2">Email</span>
                  </Button>

                  <Button variant="ghost" onClick={() => window.open("https://github.com/irkky", "_blank") } title="GitHub profile">
                    <Github size={14} />
                    <span className="ml-2">GitHub</span>
                  </Button>

                  <Button variant="ghost" onClick={() => window.open("https://www.linkedin.com/in/rishabh-kr-kannaujiya/", "_blank") } title="LinkedIn profile">
                    <Linkedin size={14} />
                    <span className="ml-2">LinkedIn</span>
                  </Button>
                </div>

                {/* Small interactive stats section removed as requested */}

              </div>

              <AnimatedStagger className="grid sm:grid-cols-2 gap-4" staggerDelay={0.08}>
                {personalInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <StaggerItem
                      key={index}
                      variant="scale"
                      className="bg-card p-4 rounded-lg border border-border hover:shadow-lg transition-all duration-150 hover:-translate-y-1 relative"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="text-primary" size={20} />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{info.content}</p>
                        </div>
                      </div>

                      {/* copy action tucked into each info card */}
                      <div className="absolute top-3 right-3">
                        <button
                          className="text-xs px-2 py-1 rounded-md border border-border bg-transparent hover:bg-muted-foreground/5"
                          onClick={() => handleCopy(info.content.replace(/\n/g, ", "), info.title)}
                          title={`Copy ${info.title}`}
                        >
                          Copy
                        </button>
                      </div>
                    </StaggerItem>
                  );
                })}
              </AnimatedStagger>
            </AnimatedSection>
          </div>

          {/* Experience Timeline */}
          <AnimatedSection variant="fadeUp" delay={0.12}>
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">Professional Experience</h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="p-6 bg-card border border-border rounded-xl relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-accent opacity-20" />

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-sm text-primary font-semibold">{exp.period}</div>
                      <div className="text-lg font-semibold text-foreground">{exp.role}</div>
                      <div className="text-muted-foreground">{exp.company}</div>
                    </div>

                    <div className="flex-shrink-0">
                      <Button variant="outline" size="sm" onClick={() => setOpenExp(openExp === index ? null : index)}>
                        {openExp === index ? (
                          <span className="flex items-center gap-2"><ChevronUp size={14} /> Hide</span>
                        ) : (
                          <span className="flex items-center gap-2"><ChevronDown size={14} /> Details</span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 text-muted-foreground leading-relaxed">{exp.description}</div>

                  {openExp === index && (
                    <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-4 list-disc pl-5 text-muted-foreground space-y-2">
                      {exp.highlights?.map((h, i2) => (
                        <li key={i2}>{h}</li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Floating contact action */}
        <div className="fixed right-6 bottom-6 z-50">
          <Button className="rounded-full p-3 shadow-2xl" onClick={() => (window.location.href = "/contact") } title="Contact">
            <Mail />
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
