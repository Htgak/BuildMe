"use client";

import { useResumeStore } from "@/store/resume-store";
import { templates } from "@/templates";

export default function PreviewControls() {
  const { zoom, setZoom, templateId, setTemplateId } = useResumeStore();

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-surface-white/80 backdrop-blur-sm border border-border-default shadow-lg rounded-full px-6 py-3 z-20">
      
      {/* Zoom Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setZoom(zoom - 10)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
          title="Zoom Out"
        >
          <span className="material-symbols-outlined text-[20px]">remove</span>
        </button>
        <span className="font-['Inter'] text-[14px] font-semibold text-on-surface w-12 text-center">
          {zoom}%
        </span>
        <button
          onClick={() => setZoom(zoom + 10)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
          title="Zoom In"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>

      <div className="w-px h-6 bg-border-default mx-1" />

      {/* Template Selector */}
      <div className="flex items-center gap-2">
        <span className="font-['Inter'] text-[12px] font-medium text-on-surface-variant uppercase tracking-wider mr-2">
          Template
        </span>
        <div className="flex gap-2">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setTemplateId(tpl.id)}
              className={`px-4 py-1.5 rounded-full font-['Inter'] text-[14px] font-medium transition-colors ${
                templateId === tpl.id
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              {tpl.name.replace("The ", "")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
