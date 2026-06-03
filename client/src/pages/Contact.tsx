import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Instagram, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { SiCredly, SiLeetcode, SiKaggle } from "react-icons/si";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "rishabhkrkannaujiya@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 92649-25693",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Bengaluru, India",
  },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/rishabh-kr-kannaujiya/", color: "bg-blue-600 hover:bg-blue-700", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/irkky", color: "bg-slate-800 hover:bg-slate-900", label: "GitHub" },
  { icon: SiCredly, href: "https://www.credly.com/users/rishabh-kumar-kannaujiya", color: "bg-red-600 hover:bg-red-700", label: "Credly" },
  { icon: Twitter, href: "https://x.com/i_rkky", color: "bg-blue-400 hover:bg-blue-500", label: "X (Twitter)" },
  { icon: Instagram, href: "https://www.instagram.com/i_rkky/", color: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700", label: "Instagram" },
  { icon: SiLeetcode, href: "https://leetcode.com/irkky/", color: "bg-yellow-500 hover:bg-yellow-600", label: "LeetCode" },
  { icon: SiKaggle, href: "https://www.kaggle.com/rishabhkannaujiya", color: "bg-sky-500 hover:bg-sky-600", label: "Kaggle" },
];

export default function Contact() {
  const { toast } = useToast();

  // Copy to clipboard helper (for contact info)
  const copyToClipboard = async (value: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: "Copied", description: `${value} copied to clipboard.` });
    } catch (e) {
      toast({ title: "Copy failed", description: "Could not copy to clipboard." });
    }
  };





  return (
    <PageTransition>
      <div className="py-16 bg-gradient-to-b from-background to-surface">{/* subtle gradient */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Get In Touch
              </motion.h2>
              <motion.div
                className="w-28 h-1 rounded-full bg-gradient-to-r from-primary to-secondary mx-auto mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7 }}
              />
              <motion.p
                className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to collaborate or have a question? I'd love to hear from you.
              </motion.p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="p-6 rounded-2xl bg-card/80 backdrop-blur border border-border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Contacts</h3>

                  <div className="space-y-4 mb-6">
                    {contactInfo.map((info, idx) => {
                      const Icon = info.icon;
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 mr-4">
                              <Icon className="text-primary" size={20} />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{info.title}</div>
                              <div className="text-muted-foreground break-all">{info.value}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* quick actions: copy, call/mail */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(info.value, info.title)}
                              title={`Copy ${info.title}`}
                            >
                              <Copy size={14} />
                            </Button>

                            {info.title === "Phone" ? (
                              <a href={`tel:${info.value}`} className="text-sm text-primary hover:underline">
                                Call
                              </a>
                            ) : info.title === "Email" ? (
                              <a href={`mailto:${info.value}`} className="text-sm text-primary hover:underline">
                                Email
                              </a>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">My Digital Footprint</h4>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <motion.a
                            key={i}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${s.color} text-white w-11 h-11 rounded-lg flex items-center justify-center shadow-sm`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title={s.label}
                          >
                            <Icon size={18} />
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* mini bio / quick CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-surface/60 to-card/60 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Want a quicker reply?</div>
                      <div className="text-sm text-muted-foreground">For a quicker reply and better connection, just drop me an email. I'll get back to you as soon as possible!</div>
                    </div>
                    <div>
                      <Button onClick={() => window.open('mailto:rishabhkrkannaujiya@gmail.com')}>
                        Quick Email
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
