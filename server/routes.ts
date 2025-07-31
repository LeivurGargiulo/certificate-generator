import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCertificateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all certificates
  app.get("/api/certificates", async (req, res) => {
    try {
      const { search, course } = req.query;
      let certificates;
      
      if (search || course) {
        certificates = await storage.searchCertificates(
          search as string || "",
          course as string
        );
      } else {
        certificates = await storage.getAllCertificates();
      }
      
      res.json(certificates);
    } catch (error) {
      res.status(500).json({ message: "Error fetching certificates" });
    }
  });

  // Get certificate by ID
  app.get("/api/certificates/:id", async (req, res) => {
    try {
      const certificate = await storage.getCertificate(req.params.id);
      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ message: "Error fetching certificate" });
    }
  });

  // Create new certificate
  app.post("/api/certificates", async (req, res) => {
    try {
      const validatedData = insertCertificateSchema.parse(req.body);
      
      // Generate unique certificate ID
      const timestamp = Date.now();
      const certificateId = `CERT-${new Date().getFullYear()}-${String(timestamp).slice(-6)}`;
      
      const certificate = await storage.createCertificate({
        ...validatedData,
        certificateId,
      });
      
      res.status(201).json(certificate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating certificate" });
    }
  });

  // Delete certificate
  app.delete("/api/certificates/:id", async (req, res) => {
    try {
      const certificate = await storage.getCertificate(req.params.id);
      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      
      await storage.deleteCertificate(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting certificate" });
    }
  });

  // Get certificate statistics
  app.get("/api/certificates/stats/summary", async (req, res) => {
    try {
      const certificates = await storage.getAllCertificates();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const thisMonth = certificates.filter(cert => {
        const certDate = new Date(cert.createdAt!);
        return certDate.getMonth() === currentMonth && certDate.getFullYear() === currentYear;
      }).length;
      
      const courses = Array.from(new Set(certificates.map(cert => cert.courseName)));
      const students = Array.from(new Set(certificates.map(cert => cert.studentName)));
      
      res.json({
        totalCertificates: certificates.length,
        thisMonth,
        activeCourses: courses.length,
        students: students.length,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
