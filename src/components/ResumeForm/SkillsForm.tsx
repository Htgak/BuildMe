"use client";

import { useResumeStore } from "@/store/resume-store";
import { SkillGroup } from "@/types/resume";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { v4 } from "@/utils/id";
import { useState } from "react";

export default function SkillsForm() {
  const { resumeData, updateSection } = useResumeStore();
  const skillGroups = resumeData.skills;

  const addSkillGroup = () => {
    const newGroup: SkillGroup = {
      id: v4(),
      category: "",
      skills: [],
    };
    updateSection("skills", [...skillGroups, newGroup]);
  };

  const updateSkillGroup = (id: string, field: keyof SkillGroup, value: unknown) => {
    updateSection(
      "skills",
      skillGroups.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const removeSkillGroup = (id: string) => {
    updateSection("skills", skillGroups.filter((g) => g.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-['Inter'] text-[32px] font-bold leading-[40px] tracking-[-0.01em] text-on-surface">
          Skills
        </h1>
        <p className="font-['Source_Sans_3'] text-[14px] leading-[20px] text-on-surface-variant mt-1">
          Group your skills by category for better organization.
        </p>
      </div>

      {skillGroups.map((group, index) => (
        <SkillGroupCard
          key={group.id}
          group={group}
          index={index}
          onUpdate={updateSkillGroup}
          onRemove={removeSkillGroup}
        />
      ))}

      <Button variant="secondary" icon="add" onClick={addSkillGroup} fullWidth>
        Add Skill Category
      </Button>
    </div>
  );
}

function SkillGroupCard({
  group,
  index,
  onUpdate,
  onRemove,
}: {
  group: SkillGroup;
  index: number;
  onUpdate: (id: string, field: keyof SkillGroup, value: unknown) => void;
  onRemove: (id: string) => void;
}) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      onUpdate(group.id, "skills", [...group.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillIndex: number) => {
    onUpdate(
      group.id,
      "skills",
      group.skills.filter((_, i) => i !== skillIndex)
    );
  };

  return (
    <div className="bg-surface-container-lowest border border-border-default rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-outline-variant text-[20px]">
            drag_indicator
          </span>
          <span className="font-['Inter'] text-[14px] font-semibold text-on-surface-variant">
            Category {index + 1}
          </span>
        </div>
        <button
          onClick={() => onRemove(group.id)}
          className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-full hover:bg-error-container"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>

      <Input
        label="Category Name"
        placeholder="e.g. Programming Languages"
        value={group.category}
        onChange={(e) => onUpdate(group.id, "category", e.target.value)}
      />

      {/* Skills Tags */}
      <div className="flex flex-col gap-2">
        <label className="font-['Inter'] text-[14px] font-medium text-on-surface">
          Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill, si) => (
            <div
              key={si}
              className="flex items-center gap-1 bg-surface-container-low border border-border-default px-3 py-1 rounded-full"
            >
              <span className="font-['Source_Sans_3'] text-[14px] text-on-surface">
                {skill}
              </span>
              <button
                onClick={() => removeSkill(si)}
                className="hover:bg-surface-variant rounded-full p-0.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px] text-outline">
                  close
                </span>
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="form-input flex-1 rounded-lg border border-border-default bg-surface-container-lowest px-3 py-1.5 font-['Source_Sans_3'] text-[14px] text-on-surface focus:outline-none transition-shadow"
            placeholder="Type a skill and press Enter"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <button
            onClick={addSkill}
            className="text-primary font-['Inter'] text-[12px] font-semibold px-3 py-1.5 border border-primary rounded-lg hover:bg-primary-container/5 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
