import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Youtube, Instagram, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerItem } from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { SiCredly, SiLeetcode, SiKaggle } from "react-icons/si";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  privacy: z.boolean().refine((val) => val === true, "You must agree to the privacy policy"),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedHint, setCopiedHint] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      privacy: false,
    },
  });

  // live watch for progress + message length
  const watched = form.watch();
  const messageValue = watched.message ?? "";
  const charCount = messageValue.length;
  const maxChars = 2000;

  const filledCount = ["firstName", "lastName", "email", "subject", "message"].reduce((acc, key) => {
    // @ts-ignore
    return acc + (watched[key] && watched[key].toString().trim().length > 0 ? 1 : 0);
  }, 0);
  const progress = Math.round((filledCount / 5) * 100);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 3000);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Sorry, there was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await contactMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy to clipboard helper (for contact info)
  const copyToClipboard = async (value: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedHint(label ? `${label} copied!` : "Copied!");
      toast({ title: "Copied", description: `${value} copied to clipboard.` });
      setTimeout(() => setCopiedHint(""), 2000);
    } catch (e) {
      toast({ title: "Copy failed", description: "Could not copy to clipboard." });
    }
  };

  // persist draft locally (very lightweight auto-save)
  useEffect(() => {
    const saved = localStorage.getItem("contact_draft_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        form.reset(parsed);
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    const sub = form.watch((value) => {
      localStorage.setItem("contact_draft_v1", JSON.stringify(value));
    });
    return () => sub.unsubscribe();
  }, [form]);

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
                Ready to collaborate or have a question? I'd love to hear from you. Let's create
                something amazing together.
              </motion.p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left column */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="p-6 rounded-2xl bg-card/80 backdrop-blur border border-border"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Let's Connect</h3>

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
                    <h4 className="text-lg font-semibold text-foreground mb-3">Follow Me</h4>
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
                      <div className="text-sm text-muted-foreground">For a quicker reply and better connection, just drop me an email — I’ll get back to you as soon as possible!</div>
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

            {/* Right column: form */}
            <AnimatedSection delay={0.4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-2xl bg-card/80 backdrop-blur border border-border"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Send Message</h3>
                  <div className="text-sm text-muted-foreground">I'll do my best to reply within 48 hours.</div>

                  {/* progress bar */}
                  <div className="mt-4 w-full bg-muted-foreground/10 rounded-full h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{progress}% completed</div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Rishabh" className="bg-card border-border focus:border-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Kannaujiya" className="bg-card border-border focus:border-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="rishabh.kumar@example.com" className="bg-card border-border focus:border-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-card border-border">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="project">Project Inquiry</SelectItem>
                              <SelectItem value="collaboration">Collaboration</SelectItem>
                              <SelectItem value="job">Job Opportunity</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell me about your project or how I can help you..." className="resize-vertical bg-card border-border focus:border-primary" rows={6} {...field} />
                          </FormControl>
                          <div className="flex items-center justify-between mt-2">
                            <FormMessage />
                            <div className="text-sm text-muted-foreground">{charCount}/{maxChars} chars</div>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="privacy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-muted-foreground">
                              I agree to the{' '}
                              <a href="#" className="text-primary hover:underline">
                                privacy policy
                              </a>{' '}
                              and{' '}
                              <a href="#" className="text-primary hover:underline">
                                terms of service
                              </a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg">
                          <Send className="mr-2" size={18} />
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </Form>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>

        {/* Success overlay (animated) */}
        <AnimatePresence>
          {showSuccessOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="pointer-events-auto bg-foreground text-foreground-contrast p-6 rounded-2xl shadow-2xl flex items-center gap-4"
              >
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </svg>
                <div>
                  <div className="font-semibold text-lg text-white">Message Sent</div>
                  <div className="text-sm text-white/90">Thanks — I'll reply shortly.</div>
                </div>
              </motion.div>

              {/* simple confetti shapes */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: -20, opacity: 0, rotate: 0 }}
                    animate={{ y: 500 + Math.random() * 200, opacity: 1, rotate: 360 }}
                    transition={{ delay: 0.05 * i, duration: 1.6 + Math.random() * 0.6 }}
                    style={{
                      position: 'absolute',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 20}%`,
                      width: 8 + Math.random() * 8,
                      height: 8 + Math.random() * 8,
                      background: `hsl(${Math.random() * 360} 80% 60%)`,
                      borderRadius: 2,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      zIndex: 60,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
