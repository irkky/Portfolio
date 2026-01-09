import { Heart, Mountain, Mic, Camera, Github, Book, Trophy, Award, Star, Medal, ExternalLink } from "lucide-react";
import AnimatedSection, { AnimatedStagger, StaggerItem } from "../components/AnimatedSection";
import { motion } from "framer-motion";

const activities = [
  {
    title: "Secretary — Jagriti Club (Social & Welfare)",
    description:
      "Led a partnership with Koshish Foundation to run daily tutoring sessions and distribute study materials to underprivileged children; managed volunteer recruitment, scheduling and impact tracking.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5u0eba9RcH6FfjAzdRA3aq1zrgbQPQpSU7w&s&auto=format&fit=crop&w=1200&h=600",
    icon: Heart,
    iconColor: "text-red-500",
    meta: "300+ students reached",
    link: "https://www.instagram.com/jagriticlub/"
  },
  {
    title: "Editor-in-Chief — “Darpan” (Jagriti Club)",
    description:
      "Planned, edited and published the club magazine; coordinated writers, designers and production schedules to deliver each issue on time.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjobsforeditors.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F11%2FEditor-in-Chief.png&f=1&nofb=1&ipt=60cec757af642ed875100f00200d4dde4e654223ad30b13fb35ac8289f2fbaf2&auto=format&fit=crop&w=1200&h=600",
    icon: Book,
    iconColor: "text-blue-600",
    meta: "Editor-in-Chief",
    link: "https://libcatrecb.ltsinformatics.com/cgi-bin/koha/opac-page.pl?page_id=24"
  },
  {
    title: "Treasurer — Photography & Fine Arts Club",
    description:
      "Managed club finances, prepared budgets for events and equipment purchases, and ensured transparent expense tracking for faculty review.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Ftreasurer-text-blue-vintage-grungy-round-rubber-stamp-216936055.jpg&f=1&nofb=1&ipt=092bf2c7f0e032751d7ff74ca0a6cd999599cf5d612a35843d8fb4713b2e69cb&auto=format&fit=crop&w=1200&h=600",
    icon: Camera,
    iconColor: "text-purple-600",
    meta: "Managed club budget",
    link: "https://drive.google.com/file/d/1p_VNU4WdH7_wLpZj70jIhANzrj1pfj8P/view?usp=sharing"
  },
  {
    title: "Coordinator — Literary Club",
    description:
      "Organized workshops, debates and literary events; handled publicity and member engagement to boost participation and enrich campus literary culture.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rasischool.org%2Fwp-content%2Fuploads%2F2018%2F11%2Fliterary-club-2.jpg&f=1&nofb=1&ipt=98651763ce06b05a8b6e9b9774ad71e9510b7ae9c02dfb13d28e0450b1ceeb12&auto=format&fit=crop&w=1200&h=600",
    icon: Book,
    iconColor: "text-green-600",
    meta: "Workshops & debates",
    link: "https://drive.google.com/file/d/1gQWEoCYJjaz7We0qud421sNimQsZhr3o/view?usp=sharing"
  },
  {
    title: "Event Organizer & Anchor",
    description:
      "Planned and executed major campus events (college fest, Ambedkar Jayanti, Constitution Day); served as anchor/MC and coordinated logistics, volunteers and schedules.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fagievent.com%2Fpublic%2Fuploads%2F0000%2F1%2F2022%2F06%2F26%2Fevent-organizer-in-jakarta.jpg&f=1&nofb=1&ipt=c980290ca7a64f52d64a384a2c0bb59b9008ed397fa42d504dcdae26368751ba&auto=format&fit=crop&w=1200&h=600",
    icon: Mic,
    iconColor: "text-primary-custom",
    meta: "Multiple campus events",
    link: "https://www.youtube.com/@jagriticlub/videos"
  },
  {
    title: "Team Leader (Skit [Drama], Street Play)",
    description:
      "Directed and led a 20-member theatre team to produce street plays and Dramas addressing social issues for several times: managed rehearsals, scripts, props and performances.",
    image:
      "https://i.ytimg.com/vi/xcJ9WKVfYmw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAu24ew1J2MCfy8PVjpvjUvx_zHaA&auto=format&fit=crop&w=1200&h=600",
    icon: Star,
    iconColor: "text-orange-600",
    meta: "Led 20 performers",
    link: "https://www.youtube.com/watch?v=UV7qPCeuiLE"
  },
  {
    title: "Hackathon — SIH 2024 (Internal)",
    description:
      "Collaborated on a multidisciplinary team to analyze a problem, prototype a solution and present results — awarded 1st place in the college’s internal Smart India Hackathon (SIH) 2024.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdigitallearning.eletsonline.com%2Fwp-content%2Fuploads%2F2024%2F12%2FSmart-India-Hackathon-2024-1.jpg&f=1&nofb=1&ipt=b8aa212dc445b8564674e7e2d1a29025067134b9e0c44cfc19a1e6b6b66bae9a&auto=format&fit=crop&w=1200&h=600",
    icon: Trophy,
    iconColor: "text-yellow-600",
    meta: "1st — SIH 2024 (internal)",
    link: "https://docs.google.com/presentation/d/1RDSj0EYyDZUFZ_p59S5dhJRVfOPCmqg3/edit?usp=sharing&ouid=109715324094134333979&rtpof=true&sd=true"
  },
  {
    title: "Hobbies: Chess & Photography",
    description:
      "Play competitive chess to sharpen strategic thinking and pursue photography as a creative outlet; regularly capture campus and street photography.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F80%2F9c%2F5d%2F809c5d28212444fb0692f2018deda3d5.jpg&f=1&nofb=1&ipt=a7e84089225a16c173ded6985513edac2730de8e91ecf281a5c82fc96111db6f&auto=format&fit=crop&w=1200&h=600",
    icon: Camera,
    iconColor: "text-purple-600",
    meta: "Chess & photography",
    link: "https://www.instagram.com/rikkyfeed/"
  }
];

const achievements = [
  {
    icon: Trophy,
    title: "Hackathon Winner",
    description: "1st place — Internal Smart India Hackathon (SIH) 2024",
    color: "bg-primary-custom/10 dark:bg-primary-custom/20",
    iconColor: "text-primary-custom"
  },
  {
    icon: Medal,
    title: "Community Impact",
    description: "Helped 300+ underprivileged students through Jagriti × Koshish Foundation initiative",
    color: "bg-orange-100 dark:bg-orange-950/20",
    iconColor: "text-orange-600"
  },
  {
    icon: Award,
    title: "Editor-in-Chief",
    description: "Published the Jagriti Club magazine “Darpan” as Editor-in-Chief",
    color: "bg-accent-custom/10 dark:bg-accent-custom/20",
    iconColor: "text-accent-custom"
  },
  {
    icon: Star,
    title: "Campus Events Lead",
    description: "Organized and anchored the college fest and civic programs (Ambedkar Jayanti, Constitution Day)",
    color: "bg-purple-100 dark:bg-purple-950/20",
    iconColor: "text-purple-600"
  }
];

export default function Extracurricular() {
  return (
    <div className="py-16 bg-muted/50 dark:bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-custom mb-4">Beyond Code</h2>
          <div className="w-24 h-1 bg-primary-custom mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Well sometimes I switch from Syntax to Society, As you know: Code builds the product, but community builds the character.
          </p>
        </AnimatedSection>
        
        <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" staggerDelay={0.1}>
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <StaggerItem 
                key={index}
                variant="scale"
                className="bg-card dark:bg-card rounded-xl shadow-lg dark:shadow-gray-800/25 hover:shadow-2xl dark:hover:shadow-gray-800/40 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-border"
              >
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-secondary-custom">{activity.title}</h3>
                    <Icon className={activity.iconColor} size={20} />
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{activity.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="bg-muted px-2 py-1 rounded-full text-xs font-medium text-muted-foreground">{activity.meta}</span>
                    <a 
                      href={activity.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-primary-custom hover:underline"
                    >
                      View
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </AnimatedStagger>
        
        {/* Achievements Section */}
        <AnimatedSection variant="fadeUp" delay={0.2}>
          <h3 className="text-2xl font-semibold text-secondary-custom mb-8 text-center">Recent Achievements</h3>
          <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <StaggerItem 
                  key={index}
                  variant="scale"
                  className="bg-card dark:bg-card p-6 rounded-xl shadow-lg dark:shadow-gray-800/25 text-center hover:shadow-xl dark:hover:shadow-gray-800/40 transition-all duration-300 border border-border hover:-translate-y-1 group"
                >
                  <motion.div 
                    className={`w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={achievement.iconColor} size={24} />
                  </motion.div>
                  <h4 className="font-semibold text-secondary-custom mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </StaggerItem>
              );
            })}
          </AnimatedStagger>
        </AnimatedSection>
      </div>
    </div>
  );
}
