import { GraduationCap, Briefcase, MapPin, Languages } from "lucide-react";

const personalInfo = [
  {
    icon: GraduationCap,
    title: "Education",
    content: "BS Computer Science\nStanford University"
  },
  {
    icon: Briefcase,
    title: "Experience",
    content: "3+ Years\nFull-Stack Development"
  },
  {
    icon: MapPin,
    title: "Location",
    content: "San Francisco, CA\nRemote Available"
  },
  {
    icon: Languages,
    title: "Languages",
    content: "English (Native)\nSpanish (Conversational)"
  }
];

const experience = [
  {
    period: "2022 - Present",
    role: "Senior Developer",
    company: "TechFlow Solutions",
    description: "Lead development of customer-facing web applications using React and Node.js. Collaborated with design teams to implement responsive interfaces and optimize user experience. Mentored junior developers and established coding standards for the team."
  },
  {
    period: "2021 - 2022",
    role: "Full-Stack Developer",
    company: "StartupHub Inc.",
    description: "Developed and maintained multiple web applications from concept to deployment. Built RESTful APIs, implemented database designs, and created responsive front-end interfaces. Worked closely with stakeholders to define requirements and deliver solutions."
  },
  {
    period: "2020 - 2021",
    role: "Junior Developer",
    company: "WebCraft Agency",
    description: "Started my professional journey building websites for small businesses and startups. Gained experience with modern web technologies and best practices. Contributed to team projects and learned from senior developers."
  }
];

export default function Profile() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-custom mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary-custom mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A passionate developer with a love for creating innovative solutions and exceptional user experiences.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="John Smith - Full-Stack Developer" 
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-secondary-custom mb-4">My Journey</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                My journey into web development started during my Computer Science studies at Stanford University. 
                What began as curiosity about how websites work evolved into a passion for creating digital experiences 
                that solve real-world problems.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Over the past 3 years, I've worked with startups and established companies, building everything 
                from e-commerce platforms to complex data visualization tools. I believe in writing clean, 
                maintainable code and creating interfaces that users love to interact with.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {personalInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg">
                    <Icon className="text-primary-custom mb-2" size={20} />
                    <h4 className="font-semibold text-secondary-custom mb-1">{info.title}</h4>
                    <p className="text-sm text-slate-600 whitespace-pre-line">{info.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Experience Timeline */}
        <div>
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Professional Experience</h3>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="md:w-48 flex-shrink-0">
                  <div className="text-sm text-primary-custom font-semibold">{exp.period}</div>
                  <div className="text-lg font-semibold text-secondary-custom">{exp.role}</div>
                  <div className="text-slate-600">{exp.company}</div>
                </div>
                <div className="flex-1">
                  <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
