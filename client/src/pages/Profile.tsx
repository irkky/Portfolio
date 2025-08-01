import { GraduationCap, Briefcase, MapPin, Languages } from "lucide-react";
import AnimatedSection, { AnimatedStagger, StaggerItem } from "../components/AnimatedSection";

const personalInfo = [
  {
    icon: GraduationCap,
    title: "Education",
    content: "BTech in Information Technology\nDr. A. P. J. Abdul Kalam Technical University"
  },
  {
    icon: Briefcase,
    title: "Experience",
    content: "1+ Years\nAI/ML Development"
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Varanasi, India\nRemote Available"
  },
  {
    icon: Languages,
    title: "Languages",
    content: "Hindi (Native)\nEnglish (Fluent)"
  }
];

const experience = [
  {
    period: "Present",
    role: "Developer",
    company: "Lorem ipsum",
    description: "Lorem ipsum"
  }
];

export default function Profile() {
  return (
    <div className="py-16 bg-background dark:bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-custom mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary-custom mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A passionate developer with a love for creating innovative solutions and exceptional user experiences.
          </p>
        </AnimatedSection>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection variant="slideLeft" delay={0.2}>
            <img 
              src="https://photos.fife.usercontent.google.com/pw/AP1GczOjGVDPqWJstLdInL72kfIzTWLOS1_6g0v6KgevLau7bgc91pYsJ24vDw=w831-h1108-s-no-gm?authuser=0" 
              alt="Rishabh Kannaujiya - AI/ML Developer" 
              className="rounded-2xl shadow-2xl dark:shadow-gray-800/25 w-full max-w-md mx-auto lg:mx-0 hover:scale-105 transition-transform duration-300"
            />
          </AnimatedSection>
          
          <AnimatedSection variant="slideRight" delay={0.4} className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-secondary-custom mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                My journey into AI and machine learning began during my B.Tech in Information Technology at Dr. A. P. J. Abdul Kalam Technical University, where I discovered how powerful algorithms could transform raw data into actionable insights. What started as a keen interest in Python scripting soon grew into a passion for designing end‑to‑end AI solutions—from automating legal document analysis to building real‑time accident detection systems for smart cities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                 Over the past few years, both as a Python Development Intern at Techtitude Tribe and through my own projects, I've honed my skills with TensorFlow, LangChain, Hugging Face, and cloud platforms like GCP. I believe in writing clean, maintainable code, architecting scalable pipelines, and creating user‑centric interfaces that bring sophisticated AI capabilities into real‑world applications.
              </p>
            </div>
            
            <AnimatedStagger className="grid sm:grid-cols-2 gap-4" staggerDelay={0.1}>
              {personalInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <StaggerItem 
                    key={index} 
                    variant="scale"
                    className="bg-card dark:bg-card p-4 rounded-lg border border-border hover:shadow-lg dark:hover:shadow-gray-800/25 transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon className="text-primary-custom mb-2" size={20} />
                    <h4 className="font-semibold text-secondary-custom mb-1">{info.title}</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{info.content}</p>
                  </StaggerItem>
                );
              })}
            </AnimatedStagger>
          </AnimatedSection>
        </div>
        
        {/* Experience Timeline */}
        <AnimatedSection variant="fadeUp" delay={0.6}>
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Professional Experience</h3>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <AnimatedSection 
                key={index}
                variant="scale"
                delay={0.8 + index * 0.1}
                className="flex flex-col md:flex-row gap-4 p-6 bg-card dark:bg-card border border-border rounded-xl hover:shadow-lg dark:hover:shadow-gray-800/25 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="md:w-48 flex-shrink-0">
                  <div className="text-sm text-primary-custom font-semibold">{exp.period}</div>
                  <div className="text-lg font-semibold text-secondary-custom">{exp.role}</div>
                  <div className="text-muted-foreground">{exp.company}</div>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
