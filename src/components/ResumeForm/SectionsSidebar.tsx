"use client";

import { useResumeStore } from "@/store/resume-store";
import { SectionType } from "@/types/resume";
import { useState } from "react";

export default function SectionsSidebar() {
  const { sections, activeSection, setActiveSection } = useResumeStore();
  const enabledSections = sections.filter((s) => s.enabled);

  // Calculate completion percentage
  const completionPercent = Math.round(
    (enabledSections.filter((s) => s.type === "personal").length /
      enabledSections.length) *
      100
  );

  return (
    <aside className="bg-surface-white flex flex-col w-[280px] h-full overflow-y-auto border-r border-border-default shrink-0 hidden lg:flex">
      {/* Header */}
      <div className="p-4 border-b border-border-default">
        <h2 className="font-['Inter'] text-[14px] font-medium text-on-surface-variant uppercase tracking-wider">
          Sections
        </h2>
        <div className="w-full bg-surface-container-low h-1 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-primary-container h-full rounded-full transition-all duration-300"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <p className="font-['Inter'] text-[12px] font-semibold text-outline mt-1">
          {completionPercent}% Complete
        </p>
      </div>

      {/* Section Navigation */}
      <nav className="flex flex-col p-2 gap-1 flex-1">
        {enabledSections.map((section) => {
          const isActive = activeSection === section.type;
          return (
            <button
              key={section.type}
              onClick={() => setActiveSection(section.type as SectionType)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-r-lg transition-colors cursor-pointer text-left ${
                isActive
                  ? "border-l-4 border-primary bg-primary-container/10 text-primary font-bold"
                  : "text-on-surface-variant hover:bg-background-subtle border-l-4 border-transparent"
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-outline-variant">
                drag_indicator
              </span>
              <span
                className="material-symbols-outlined text-[20px]"
                style={
                  isActive
                    ? { fontVariationSettings: '"FILL" 1' }
                    : undefined
                }
              >
                {section.icon}
              </span>
              <span className="font-['Inter'] text-[12px] font-semibold flex-1">
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
