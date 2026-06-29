import { ResumeData, TemplateInfo } from "@/types/resume";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Lazy load templates to reduce bundle size
export const Engineer = dynamic(() => import("./Engineer/Engineer"));
export const Executive = dynamic(() => import("./Executive/Executive"));
export const Creative = dynamic(() => import("./Creative/Creative"));
export const Minimalist = dynamic(() => import("./Minimalist/Minimalist"));
export const Modern = dynamic(() => import("./Modern/Modern"));
export const Academic = dynamic(() => import("./Academic/Academic"));

export const templateRegistry: Record<string, ComponentType<{ data: ResumeData }>> = {
  engineer: Engineer,
  executive: Executive,
  creative: Creative,
  minimalist: Minimalist,
  modern: Modern,
  academic: Academic,
};

export const templates: TemplateInfo[] = [
  {
    id: "engineer",
    name: "The Engineer",
    description: "ATS-optimized single-column layout with a bold header. Best for technical roles.",
    category: "modern",
  },
  {
    id: "executive",
    name: "The Executive",
    description: "Clean two-column layout with a sidebar for skills. High data density.",
    category: "professional",
  },
  {
    id: "creative",
    name: "The Creative",
    description: "Modern design with teal accents and a unique layout. Ideal for design and marketing.",
    category: "creative",
  },
  {
    id: "minimalist",
    name: "The Minimalist",
    description: "Extremely clean, typography-focused, with maximum whitespace.",
    category: "minimal",
  },
  {
    id: "modern",
    name: "The Modern",
    description: "Striking two-column layout with a dark sidebar and clean main body.",
    category: "modern",
  },
  {
    id: "academic",
    name: "The Academic",
    description: "Formal, dense layout optimized for CVs and extensive project descriptions.",
    category: "professional",
  },
];
