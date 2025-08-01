import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertCertificateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple endpoint to validate certificate data (for form validation)
  app.post("/api/certificates/validate", async (req, res) => {
    try {
      const validatedData = insertCertificateSchema.parse(req.body);
      
      // Generate unique certificate ID
      const timestamp = Date.now();
      const certificateId = `CERT-${new Date().getFullYear()}-${String(timestamp).slice(-6)}`;
      
      res.json({
        ...validatedData,
        certificateId,
        valid: true
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Error validating certificate data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}