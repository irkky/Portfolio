import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
  privacy: z.boolean(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      
      // In a real application, you would:
      // 1. Send an email using a service like SendGrid, Nodemailer, etc.
      // 2. Store the message in a database
      // 3. Send notifications to admin/owner
      
      console.log("Contact form submission received:", {
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message.substring(0, 100) + "...",
        timestamp: new Date().toISOString(),
      });
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.status(200).json({ 
        success: true, 
        message: "Message received successfully! We'll get back to you soon." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
