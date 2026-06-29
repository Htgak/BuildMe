import { z } from "zod";

// ===== Personal Info Schema =====
export const socialLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
  url: z.string().min(1, "URL is required"),
});

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  professionalTitle: z.string().optional().default(""),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().default(""),
  location: z.string().optional().default(""),
  links: z.array(socialLinkSchema).default([]),
  summary: z.string().max(500, "Summary must be 500 characters or less").default(""),
  avatarUrl: z.string().optional(),
});

// ===== Experience Schema =====
export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional().default(""),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().default(""),
  current: z.boolean().default(false),
  description: z.array(z.string()).default([]),
});

// ===== Education Schema =====
export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().default(""),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().default(""),
  gpa: z.string().optional(),
  achievements: z.array(z.string()).default([]),
});

// ===== Skills Schema =====
export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string().min(1, "Category is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

// ===== Project Schema =====
export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().default(""),
  technologies: z.array(z.string()).default([]),
  link: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// ===== Certificate Schema =====
export const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certificate name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().default(""),
  url: z.string().optional(),
});

// ===== Language Schema =====
export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Language name is required"),
  proficiency: z.enum(["Native", "Fluent", "Advanced", "Intermediate", "Basic"]),
});

// ===== Full Resume Schema =====
export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(skillGroupSchema).default([]),
  projects: z.array(projectSchema).default([]),
  certificates: z.array(certificateSchema).default([]),
  languages: z.array(languageSchema).default([]),
  customSections: z.array(z.any()).default([]),
});
