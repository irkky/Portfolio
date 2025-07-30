import { Code, Server, Users, Lightbulb, MessageCircle, Rocket } from "lucide-react";
import { SiGit, SiDocker, SiAmazon, SiMongodb, SiFigma, SiReact } from "react-icons/si";

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
    color: "from-blue-50 to-blue-100",
    iconColor: "text-primary-custom"
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Analytical thinking and creative solutions to complex challenges",
    color: "from-green-50 to-green-100",
    iconColor: "text-accent-custom"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Working effectively in agile development teams",
    color: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Rocket,
    title: "Leadership",
    description: "Mentoring junior developers and leading project initiatives",
    color: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600"
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  color?: string;
}

function SkillBar({ name, level, color = "bg-primary-custom" }: SkillBarProps) {
  return (
    <div className="skill-item">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-slate-700">{name}</span>
        <span className="text-sm text-slate-500">{level}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-custom mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-primary-custom mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and methodologies for building exceptional digital products.
          </p>
        </div>
        
        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Technical Skills</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend Skills */}
            <div>
              <h4 className="text-lg font-semibold text-secondary-custom mb-6 flex items-center">
                <Code className="text-primary-custom mr-3" size={20} />
                Frontend Development
              </h4>
              <div className="space-y-4">
                {frontendSkills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
            
            {/* Backend Skills */}
            <div>
              <h4 className="text-lg font-semibold text-secondary-custom mb-6 flex items-center">
                <Server className="text-primary-custom mr-3" size={20} />
                Backend Development
              </h4>
              <div className="space-y-4">
                {backendSkills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} color="bg-accent-custom" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tools & Technologies */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Tools & Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={tool.name}
                  className="bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 p-4 rounded-xl text-center group"
                >
                  <Icon className="text-3xl text-slate-400 group-hover:text-primary-custom transition-colors mb-2 mx-auto" />
                  <div className="text-sm font-medium text-slate-600">{tool.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Soft Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${skill.color} p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300`}
                >
                  <Icon className={`${skill.iconColor} mb-4 mx-auto`} size={32} />
                  <h4 className="font-semibold text-secondary-custom mb-2">{skill.title}</h4>
                  <p className="text-sm text-slate-600">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
