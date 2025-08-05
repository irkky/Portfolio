import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  privacy: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "rishabhkrkannaujiya@gmail.com"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 92649-25693"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Delhi, India"
  }
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/rishabh-kr-kannaujiya/", color: "bg-blue-600 hover:bg-blue-700" },
  { icon: Github, href: "https://github.com/irkky", color: "bg-slate-800 hover:bg-slate-900" },
  { icon: Twitter, href: "https://x.com/i_rkky", color: "bg-blue-400 hover:bg-blue-500" },
  { icon: Youtube, href: "https://youtube.com", color: "bg-red-600 hover:bg-red-700" },
  { icon: Instagram, href: "https://www.instagram.com/i_rkky/", color: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <PageTransition>
      <div className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Get In Touch
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-primary mx-auto mb-8"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ready to collaborate or have a question? I'd love to hear from you. Let's create something amazing together.
              </motion.p>
            </div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <AnimatedSection delay={0.2}>
              <div>
                <motion.h3 
                  className="text-2xl font-semibold text-foreground mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Let's Connect
                </motion.h3>
                
                <div className="space-y-6 mb-12">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div 
                        key={index} 
                        className="flex items-center group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-200">
                          <Icon className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{info.title}</div>
                          <div className="text-muted-foreground">{info.value}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Social Links */}
                <div>
                  <motion.h4 
                    className="text-lg font-semibold text-foreground mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Follow Me
                  </motion.h4>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${social.color} text-white w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.01, delay: 0.01 + index * 0.01 }}
                          whileHover={{ scale: 1.3, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon size={30} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Contact Form */}
            <AnimatedSection delay={0.4}>
              <div>
                <motion.h3 
                  className="text-2xl font-semibold text-foreground mb-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Send Message
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">First Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Rishabh" 
                                  className="bg-card border-border focus:border-primary" 
                                  {...field} 
                                />
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
                                <Input 
                                  placeholder="Kannaujiya" 
                                  className="bg-card border-border focus:border-primary" 
                                  {...field} 
                                />
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
                              <Input 
                                type="email" 
                                placeholder="rishabh.kumar@example.com" 
                                className="bg-card border-border focus:border-primary" 
                                {...field} 
                              />
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
                              <Textarea
                                placeholder="Tell me about your project or how I can help you..."
                                className="resize-vertical bg-card border-border focus:border-primary"
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="privacy"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm text-muted-foreground">
                                I agree to the{" "}
                                <a href="#" className="text-primary hover:underline">
                                  privacy policy
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-primary hover:underline">
                                  terms of service
                                </a>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-primary/20"
                        >
                          <Send className="mr-2" size={18} />
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
