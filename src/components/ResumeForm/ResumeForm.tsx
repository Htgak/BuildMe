"use client";

import { useResumeStore } from "@/store/resume-store";
import PersonalInfoForm from "./PersonalInfoForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificatesForm from "./CertificatesForm";

export default function ResumeForm() {
  const { activeSection } = useResumeStore();

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm />;
      case "experience":
        return <ExperienceForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "certificates":
        return <CertificatesForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <section className="flex-1 min-w-[400px] max-w-[600px] h-full overflow-y-auto bg-surface-white border-r border-border-default shadow-[1px_0_3px_rgba(0,0,0,0.05)] z-10">
      <div className="p-6 md:p-8 flex flex-col gap-8">
        {renderSection()}
        <div className="h-10" />
      </div>
    </section>
  );
}
