import { z } from "zod";

export const insertCertificateSchema = z.object({
  studentName: z.string().min(1, "El nombre del estudiante es requerido"),
  courseName: z.string().min(1, "El nombre del curso es requerido"),
  commission: z.string().min(1, "La comisión es requerida"),
  completionDate: z.string().min(1, "La fecha de finalización es requerida"),
  discordHandle: z.string().optional(),
  personalMessage: z.string().optional(),
  pronouns: z.string().optional(),
  certificateId: z.string().optional(),
  fileUrl: z.string().optional(),
});

export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

export type Certificate = InsertCertificate & {
  id?: string;
  createdAt?: Date;
};

// Legacy alias for backwards compatibility  
export type Tag = Certificate;