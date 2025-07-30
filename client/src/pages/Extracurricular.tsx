import { Heart, Mountain, Mic, Camera, Github, Book, Trophy, Award, Star, Medal } from "lucide-react";

const activities = [
  {
    title: "Community Volunteering",
    description: "Teaching coding basics to underprivileged youth at local community centers. Organizing tech workshops and mentoring aspiring developers.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    icon: Heart,
    iconColor: "text-red-500",
    meta: "6+ hours/week"
  },
  {
    title: "Mountain Biking",
    description: "Exploring nature trails and challenging mountain paths. Part of a local cycling group that organizes weekend adventures and environmental cleanups.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    icon: Mountain,
    iconColor: "text-green-600",
    meta: "Bay Area Trails"
  },
  {
    title: "Tech Speaking",
    description: "Regular speaker at local meetups and conferences, sharing insights on modern web development and best practices. Passionate about knowledge sharing.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    icon: Mic,
    iconColor: "text-primary-custom",
    meta: "12+ events"
  },
  {
    title: "Photography",
    description: "Capturing moments and landscapes through the lens. Specializing in nature and urban photography. Building an Instagram presence with travel and tech-themed content.",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    icon: Camera,
    iconColor: "text-purple-600",
    meta: "Weekend hobby"
  },
  {
    title: "Open Source",
    description: "Active contributor to open source projects, particularly in React and Node.js ecosystems. Maintaining several packages and helping developers worldwide.",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    icon: Github,
    iconColor: "text-slate-800",
    meta: "50+ contributions"
  },
  {
    title: "Continuous Learning",
    description: "Constantly exploring new technologies, design patterns, and industry trends. Currently studying machine learning and AI integration in web applications.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    icon: Book,
    iconColor: "text-blue-600",
    meta: "5+ courses/year"
  }
];

const achievements = [
  {
    icon: Trophy,
    title: "Hackathon Winner",
    description: "1st place at SF TechCrunch Disrupt 2023",
    color: "bg-primary-custom/10",
    iconColor: "text-primary-custom"
  },
  {
    icon: Award,
    title: "AWS Certified",
    description: "Solutions Architect Professional",
    color: "bg-accent-custom/10",
    iconColor: "text-accent-custom"
  },
  {
    icon: Star,
    title: "Top Contributor",
    description: "React GitHub repository 2023",
    color: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Medal,
    title: "Community Impact",
    description: "500+ students taught coding",
    color: "bg-orange-100",
    iconColor: "text-orange-600"
  }
];

export default function Extracurricular() {
  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-custom mb-4">Beyond Code</h2>
          <div className="w-24 h-1 bg-primary-custom mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Exploring interests and activities that shape my perspective and contribute to personal growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-secondary-custom">{activity.title}</h3>
                    <Icon className={activity.iconColor} size={20} />
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed">{activity.description}</p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>{activity.meta}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Achievements Section */}
        <div>
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Recent Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={achievement.iconColor} size={24} />
                  </div>
                  <h4 className="font-semibold text-secondary-custom mb-2">{achievement.title}</h4>
                  <p className="text-sm text-slate-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
