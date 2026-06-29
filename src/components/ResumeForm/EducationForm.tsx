"use client";

import { useResumeStore } from "@/store/resume-store";
import { Education } from "@/types/resume";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { v4 } from "@/utils/id";

export default function EducationForm() {
  const { resumeData, updateSection } = useResumeStore();
  const educations = resumeData.education;

  const addEducation = () => {
    const newEdu: Education = {
      id: v4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      achievements: [],
    };
    updateSection("education", [...educations, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: unknown) => {
    updateSection(
      "education",
      educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    updateSection("education", educations.filter((edu) => edu.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-['Inter'] text-[32px] font-bold leading-[40px] tracking-[-0.01em] text-on-surface">
          Education
        </h1>
        <p className="font-['Source_Sans_3'] text-[14px] leading-[20px] text-on-surface-variant mt-1">
          Add your educational background.
        </p>
      </div>

      {educations.map((edu, index) => (
        <div
          key={edu.id}
          className="bg-surface-container-lowest border border-border-default rounded-xl p-6 flex flex-col gap-4 relative"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline-variant cursor-grab text-[20px]">
                drag_indicator
              </span>
              <span className="font-['Inter'] text-[14px] font-semibold text-on-surface-variant">
                Education {index + 1}
              </span>
            </div>
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-full hover:bg-error-container"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>

          <Input
            label="Institution"
            placeholder="e.g. Stanford University"
            value={edu.institution}
            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Degree"
              placeholder="e.g. Bachelor of Science"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
            />
            <Input
              label="Field of Study"
              placeholder="e.g. Computer Science"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
            />
            <Input
              label="End Date"
              type="month"
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
            />
            <Input
              label="GPA (optional)"
              placeholder="e.g. 3.9"
              value={edu.gpa || ""}
              onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
            />
          </div>
        </div>
      ))}

      <Button variant="secondary" icon="add" onClick={addEducation} fullWidth>
        Add Education
      </Button>
    </div>
  );
}
