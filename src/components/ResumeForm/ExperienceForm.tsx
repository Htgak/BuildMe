"use client";

import { useResumeStore } from "@/store/resume-store";
import { Experience } from "@/types/resume";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { v4 } from "@/utils/id";

export default function ExperienceForm() {
  const { resumeData, updateSection } = useResumeStore();
  const experiences = resumeData.experience;

  const addExperience = () => {
    const newExp: Experience = {
      id: v4(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
    };
    updateSection("experience", [...experiences, newExp]);
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: unknown
  ) => {
    updateSection(
      "experience",
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    updateSection(
      "experience",
      experiences.filter((exp) => exp.id !== id)
    );
  };

  const addBullet = (id: string) => {
    updateSection(
      "experience",
      experiences.map((exp) =>
        exp.id === id
          ? { ...exp, description: [...exp.description, ""] }
          : exp
      )
    );
  };

  const updateBullet = (id: string, index: number, value: string) => {
    updateSection(
      "experience",
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.map((d, i) =>
                i === index ? value : d
              ),
            }
          : exp
      )
    );
  };

  const removeBullet = (id: string, index: number) => {
    updateSection(
      "experience",
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.filter((_, i) => i !== index),
            }
          : exp
      )
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-['Inter'] text-[32px] font-bold leading-[40px] tracking-[-0.01em] text-on-surface">
          Experience
        </h1>
        <p className="font-['Source_Sans_3'] text-[14px] leading-[20px] text-on-surface-variant mt-1">
          Add your work experience, starting with the most recent.
        </p>
      </div>

      {experiences.map((exp, index) => (
        <div
          key={exp.id}
          className="bg-surface-container-lowest border border-border-default rounded-xl p-6 flex flex-col gap-4 relative group"
        >
          {/* Drag handle and delete */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline-variant cursor-grab active:cursor-grabbing text-[20px]">
                drag_indicator
              </span>
              <span className="font-['Inter'] text-[14px] font-semibold text-on-surface-variant">
                Experience {index + 1}
              </span>
            </div>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-full hover:bg-error-container"
            >
              <span className="material-symbols-outlined text-[20px]">
                delete
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company"
              placeholder="e.g. Google"
              value={exp.company}
              onChange={(e) =>
                updateExperience(exp.id, "company", e.target.value)
              }
            />
            <Input
              label="Position"
              placeholder="e.g. Software Engineer"
              value={exp.position}
              onChange={(e) =>
                updateExperience(exp.id, "position", e.target.value)
              }
            />
          </div>

          <Input
            label="Location"
            icon="location_on"
            placeholder="e.g. Mountain View, CA"
            value={exp.location || ""}
            onChange={(e) =>
              updateExperience(exp.id, "location", e.target.value)
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={exp.startDate}
              onChange={(e) =>
                updateExperience(exp.id, "startDate", e.target.value)
              }
            />
            <div className="flex flex-col gap-1.5">
              <Input
                label="End Date"
                type="month"
                value={exp.endDate}
                disabled={exp.current}
                onChange={(e) =>
                  updateExperience(exp.id, "endDate", e.target.value)
                }
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) =>
                    updateExperience(exp.id, "current", e.target.checked)
                  }
                  className="rounded border-border-default text-primary-container focus:ring-primary-container"
                />
                <span className="font-['Source_Sans_3'] text-[14px] text-on-surface-variant">
                  Currently working here
                </span>
              </label>
            </div>
          </div>

          {/* Description Bullets */}
          <div className="flex flex-col gap-2">
            <label className="font-['Inter'] text-[14px] font-medium text-on-surface">
              Description
            </label>
            {exp.description.map((bullet, bIndex) => (
              <div key={bIndex} className="flex items-start gap-2">
                <span className="text-outline-variant mt-2.5 text-[14px]">
                  •
                </span>
                <input
                  className="form-input flex-1 rounded-lg border border-border-default bg-surface-container-lowest px-3 py-2 font-['Source_Sans_3'] text-[16px] text-on-surface focus:outline-none transition-shadow"
                  placeholder="Describe your achievement..."
                  value={bullet}
                  onChange={(e) =>
                    updateBullet(exp.id, bIndex, e.target.value)
                  }
                />
                {exp.description.length > 1 && (
                  <button
                    onClick={() => removeBullet(exp.id, bIndex)}
                    className="text-outline-variant hover:text-error mt-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      close
                    </span>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addBullet(exp.id)}
              className="text-primary font-['Inter'] text-[12px] font-semibold hover:underline self-start flex items-center gap-1 mt-1"
            >
              <span className="material-symbols-outlined text-[16px]">
                add
              </span>
              Add bullet point
            </button>
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        icon="add"
        onClick={addExperience}
        fullWidth
      >
        Add Experience
      </Button>
    </div>
  );
}
