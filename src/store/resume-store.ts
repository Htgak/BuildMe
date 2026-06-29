import { create } from "zustand";
import { ResumeData, SectionType, SectionConfig } from "@/types/resume";
import { emptyResumeData } from "@/utils/sample-data";

// ===== Default Section Order =====
const defaultSections: SectionConfig[] = [
  { type: "personal", label: "Personal", icon: "person", enabled: true },
  { type: "experience", label: "Experience", icon: "work", enabled: true },
  { type: "education", label: "Education", icon: "school", enabled: true },
  { type: "skills", label: "Skills", icon: "psychology", enabled: true },
  { type: "projects", label: "Projects", icon: "code", enabled: true },
  {
    type: "certificates",
    label: "Certificates",
    icon: "workspace_premium",
    enabled: true,
  },
];

// ===== Store State =====
interface ResumeState {
  // Current resume being edited
  resumeId: string | null;
  resumeTitle: string;
  resumeData: ResumeData;
  templateId: string;
  activeSection: SectionType;
  sections: SectionConfig[];
  zoom: number;
  isDirty: boolean;

  // Actions
  setResumeId: (id: string | null) => void;
  setResumeTitle: (title: string) => void;
  setResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (field: string, value: unknown) => void;
  updateSection: <K extends keyof ResumeData>(
    section: K,
    data: ResumeData[K]
  ) => void;
  setTemplateId: (id: string) => void;
  setActiveSection: (section: SectionType) => void;
  setSections: (sections: SectionConfig[]) => void;
  toggleSection: (type: SectionType) => void;
  setZoom: (zoom: number) => void;
  resetResume: () => void;
  markClean: () => void;

  triggerPrint: (() => void) | null;
  setTriggerPrint: (fn: () => void) => void;
}

import { persist } from "zustand/middleware";

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resumeId: null,
      resumeTitle: "Untitled Resume",
      resumeData: emptyResumeData,
      templateId: "engineer",
      activeSection: "personal",
      sections: defaultSections,
      zoom: 85,
      isDirty: false,

      setResumeId: (id) => set({ resumeId: id }),

      setResumeTitle: (title) => set({ resumeTitle: title, isDirty: true }),

      setResumeData: (data) => set({ resumeData: data }),

      updatePersonalInfo: (field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: {
              ...state.resumeData.personalInfo,
              [field]: value,
            },
          },
          isDirty: true,
        })),

      updateSection: (section, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            [section]: data,
          },
          isDirty: true,
        })),

      setTemplateId: (id) => set({ templateId: id, isDirty: true }),

      setActiveSection: (section) => set({ activeSection: section }),

      setSections: (sections) => set({ sections }),

      toggleSection: (type) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.type === type ? { ...s, enabled: !s.enabled } : s
          ),
        })),

      setZoom: (zoom) => set({ zoom: Math.max(50, Math.min(150, zoom)) }),

      resetResume: () =>
        set({
          resumeId: null,
          resumeTitle: "Untitled Resume",
          resumeData: emptyResumeData,
          templateId: "engineer",
          activeSection: "personal",
          sections: defaultSections,
          zoom: 85,
          isDirty: false,
        }),

      markClean: () => set({ isDirty: false }),

      triggerPrint: null as (() => void) | null,
      setTriggerPrint: (fn: () => void) => set({ triggerPrint: fn }),
    }),
    {
      name: "buildme-resume-storage",
      partialize: (state) => Object.fromEntries(
        Object.entries(state).filter(([key]) => !["triggerPrint", "setTriggerPrint"].includes(key))
      ) as ResumeState,
    }
  )
);


