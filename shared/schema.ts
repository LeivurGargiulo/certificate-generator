import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  courseName: text("course_name").notNull(),
  commission: text("commission").notNull(),
  completionDate: text("completion_date").notNull(),
  discordHandle: text("discord_handle"),
  personalMessage: text("personal_message"),
  pronouns: text("pronouns"),
  certificateId: text("certificate_id").notNull().unique(),
  fileUrl: text("file_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  createdAt: true,
});

export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;

// Legacy alias for backwards compatibility
export type Tag = Certificate;
