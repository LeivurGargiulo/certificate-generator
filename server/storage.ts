import { type Certificate, type InsertCertificate } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getCertificate(id: string): Promise<Certificate | undefined>;
  getCertificateByStudentName(studentName: string): Promise<Certificate[]>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  getAllCertificates(): Promise<Certificate[]>;
  deleteCertificate(id: string): Promise<void>;
  searchCertificates(query: string, courseFilter?: string): Promise<Certificate[]>;
}

export class MemStorage implements IStorage {
  private certificates: Map<string, Certificate>;

  constructor() {
    this.certificates = new Map();
  }

  async getCertificate(id: string): Promise<Certificate | undefined> {
    return this.certificates.get(id);
  }

  async getCertificateByStudentName(studentName: string): Promise<Certificate[]> {
    return Array.from(this.certificates.values()).filter(
      (cert) => cert.studentName.toLowerCase().includes(studentName.toLowerCase())
    );
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const id = randomUUID();
    const certificate: Certificate = {
      ...insertCertificate,
      id,
      createdAt: new Date(),
      discordHandle: insertCertificate.discordHandle || null,
      personalMessage: insertCertificate.personalMessage || null,
      pronouns: insertCertificate.pronouns || null,
      fileUrl: insertCertificate.fileUrl || null,
    };
    this.certificates.set(id, certificate);
    return certificate;
  }

  async getAllCertificates(): Promise<Certificate[]> {
    return Array.from(this.certificates.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async deleteCertificate(id: string): Promise<void> {
    this.certificates.delete(id);
  }

  async searchCertificates(query: string, courseFilter?: string): Promise<Certificate[]> {
    const allCerts = Array.from(this.certificates.values());
    return allCerts.filter((cert) => {
      const matchesQuery = !query || 
        cert.studentName.toLowerCase().includes(query.toLowerCase()) ||
        cert.courseName.toLowerCase().includes(query.toLowerCase()) ||
        cert.certificateId.toLowerCase().includes(query.toLowerCase()) ||
        cert.discordHandle?.toLowerCase().includes(query.toLowerCase());
      
      const matchesCourse = !courseFilter || cert.courseName === courseFilter;
      
      return matchesQuery && matchesCourse;
    }).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }
}

// Using memory storage for now due to database authentication issues
// To enable database storage, the DATABASE_URL password needs to be verified
export const storage = new MemStorage();
