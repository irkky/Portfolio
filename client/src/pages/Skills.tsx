import { Code, Server, Users, Lightbulb, MessageCircle, Rocket } from "lucide-react";
import { SiGit, SiDocker, SiAmazon, SiMongodb, SiFigma, SiReact } from "react-icons/si";
import AnimatedSection, { AnimatedStagger, StaggerItem } from "../components/AnimatedSection";
import { motion } from "framer-motion";

const frontendSkills = [
  { name: "React.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Tailwind CSS", level: 92 },
];

const backendSkills = [
  { name: "Node.js", level: 90 },
  { name: "Python", level: 85 },
  { name: "PostgreSQL", level: 88 },
  { name: "GraphQL", level: 80 },
];

const tools = [
  { icon: SiGit, name: "Git" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiAmazon, name: "AWS" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiFigma, name: "Figma" },
  { icon: SiReact, name: "React Native" },
];

const softSkills = [
  {
    icon: MessageCircle,
    title: "Communication",
    description: "Clear and effective communication with team members and stakeholders",
    color: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
    iconColor: "text-primary-custom"
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Analytical thinking and creative solutions to complex challenges",
    color: "from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20",
    iconColor: "text-accent-custom"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Working effectively in agile development teams",
    color: "from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20",
    iconColor: "text-purple-600"
  },
  {
    icon: Rocket,
    title: "Leadership",
    description: "Mentoring junior developers and leading project initiatives",
    color: "from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20",
    iconColor: "text-orange-600"
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  color?: string;
  delay?: number;
}

function SkillBar({ name, level, color = "bg-primary-custom", delay = 0 }: SkillBarProps) {
  return (
    <motion.div 
      className="skill-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <motion.div 
          className={`${color} h-2 rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <div className="py-16 bg-background dark:bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-custom mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-primary-custom mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and methodologies for building exceptional digital products.
          </p>
        </AnimatedSection>
        
        {/* Technical Skills */}
        <AnimatedSection variant="fadeUp" delay={0.2} className="mb-16">
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Technical Skills</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend Skills */}
            <AnimatedSection variant="slideLeft" delay={0.4}>
              <h4 className="text-lg font-semibold text-secondary-custom mb-6 flex items-center">
                <Code className="text-primary-custom mr-3" size={20} />
                Frontend Development
              </h4>
              <div className="space-y-4">
                {frontendSkills.map((skill, index) => (
                  <SkillBar 
                    key={skill.name} 
                    name={skill.name} 
                    level={skill.level}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </AnimatedSection>
            
            {/* Backend Skills */}
            <AnimatedSection variant="slideRight" delay={0.6}>
              <h4 className="text-lg font-semibold text-secondary-custom mb-6 flex items-center">
                <Server className="text-primary-custom mr-3" size={20} />
                Backend Development
              </h4>
              <div className="space-y-4">
                {backendSkills.map((skill, index) => (
                  <SkillBar 
                    key={skill.name} 
                    name={skill.name} 
                    level={skill.level} 
                    color="bg-accent-custom"
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
        
        {/* Tools & Technologies */}
        <AnimatedSection variant="fadeUp" delay={0.8} className="mb-16">
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Tools & Technologies</h3>
          <AnimatedStagger className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6" staggerDelay={0.1}>
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <StaggerItem
                  key={tool.name}
                  variant="scale"
                  className="bg-card dark:bg-card hover:bg-accent/50 dark:hover:bg-accent/20 hover:shadow-lg dark:hover:shadow-gray-800/25 transition-all duration-300 p-4 rounded-xl text-center group border border-border hover:-translate-y-1"
                >
                  <Icon className="text-3xl text-muted-foreground group-hover:text-primary-custom transition-colors mb-2 mx-auto" />
                  <div className="text-sm font-medium text-foreground">{tool.name}</div>
                </StaggerItem>
              );
            })}
          </AnimatedStagger>
        </AnimatedSection>
        
        {/* Soft Skills */}
        <AnimatedSection variant="fadeUp" delay={1.0}>
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Soft Skills</h3>
          <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
            {softSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <StaggerItem
                  key={index}
                  variant="scale"
                  className={`bg-gradient-to-br ${skill.color} p-6 rounded-xl text-center hover:shadow-lg dark:hover:shadow-gray-800/25 transition-all duration-300 border border-border/50 hover:-translate-y-1`}
                >
                  <Icon className={`${skill.iconColor} mb-4 mx-auto`} size={32} />
                  <h4 className="font-semibold text-secondary-custom mb-2">{skill.title}</h4>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </StaggerItem>
              );
            })}
          </AnimatedStagger>
        </AnimatedSection>
      </div>
    </div>
  );
}
