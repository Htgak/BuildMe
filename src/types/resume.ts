// ===== Resume Data Model =====
// All templates render from these shared interfaces.

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  links: SocialLink[];
  summary: string;
  avatarUrl?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Basic";
}

export interface CustomSection {
  id: string;
  title: string;
  items: { id: string; content: string }[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  customSections: CustomSection[];
}

// ===== Resume Document (Stored in Supabase) =====

export interface ResumeDocument {
  id: string;
  user_id: string;
  title: string;
  data: ResumeData;
  template_id: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

// ===== Template Metadata =====

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  category: "modern" | "classic" | "minimal" | "professional" | "creative";
  thumbnail?: string;
}

// ===== Section Order =====

export type SectionType =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certificates"
  | "languages"
  | "custom";

export interface SectionConfig {
  type: SectionType;
  label: string;
  icon: string;
  enabled: boolean;
}
