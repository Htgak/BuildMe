"use client";

import { useResumeStore } from "@/store/resume-store";
import { Project } from "@/types/resume";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { v4 } from "@/utils/id";
import { useState } from "react";

export default function ProjectsForm() {
  const { resumeData, updateSection } = useResumeStore();
  const projects = resumeData.projects;

  const addProject = () => {
    const newProject: Project = {
      id: v4(),
      name: "",
      description: "",
      technologies: [],
      link: "",
    };
    updateSection("projects", [...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: unknown) => {
    updateSection(
      "projects",
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removeProject = (id: string) => {
    updateSection("projects", projects.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-['Inter'] text-[32px] font-bold leading-[40px] tracking-[-0.01em] text-on-surface">
          Projects
        </h1>
        <p className="font-['Source_Sans_3'] text-[14px] leading-[20px] text-on-surface-variant mt-1">
          Showcase your personal or professional projects.
        </p>
      </div>

      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onUpdate={updateProject}
          onRemove={removeProject}
        />
      ))}

      <Button variant="secondary" icon="add" onClick={addProject} fullWidth>
        Add Project
      </Button>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onUpdate,
  onRemove,
}: {
  project: Project;
  index: number;
  onUpdate: (id: string, field: keyof Project, value: unknown) => void;
  onRemove: (id: string) => void;
}) {
  const [newTech, setNewTech] = useState("");

  const addTech = () => {
    if (newTech.trim()) {
      onUpdate(project.id, "technologies", [
        ...project.technologies,
        newTech.trim(),
      ]);
      setNewTech("");
    }
  };

  const removeTech = (ti: number) => {
    onUpdate(
      project.id,
      "technologies",
      project.technologies.filter((_, i) => i !== ti)
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
            Project {index + 1}
          </span>
        </div>
        <button
          onClick={() => onRemove(project.id)}
          className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-full hover:bg-error-container"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>

      <Input
        label="Project Name"
        placeholder="e.g. E-Commerce Platform"
        value={project.name}
        onChange={(e) => onUpdate(project.id, "name", e.target.value)}
      />

      <Textarea
        label="Description"
        placeholder="Describe the project..."
        rows={3}
        value={project.description}
        onChange={(e) => onUpdate(project.id, "description", e.target.value)}
      />

      <Input
        label="Link"
        icon="link"
        placeholder="e.g. github.com/username/project"
        value={project.link || ""}
        onChange={(e) => onUpdate(project.id, "link", e.target.value)}
      />

      {/* Technologies Tags */}
      <div className="flex flex-col gap-2">
        <label className="font-['Inter'] text-[14px] font-medium text-on-surface">
          Technologies
        </label>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, ti) => (
            <div
              key={ti}
              className="flex items-center gap-1 bg-surface-container-low border border-border-default px-3 py-1 rounded-full"
            >
              <span className="font-['Source_Sans_3'] text-[14px] text-on-surface">
                {tech}
              </span>
              <button
                onClick={() => removeTech(ti)}
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
            placeholder="Type a technology and press Enter"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
          />
          <button
            onClick={addTech}
            className="text-primary font-['Inter'] text-[12px] font-semibold px-3 py-1.5 border border-primary rounded-lg hover:bg-primary-container/5 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
