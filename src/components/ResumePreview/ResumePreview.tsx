"use client";

import { useResumeStore } from "@/store/resume-store";
import { templateRegistry } from "@/templates";
import PreviewControls from "./PreviewControls";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumePreview() {
  const { resumeData, templateId, zoom, setTriggerPrint } = useResumeStore();
  const [mounted, setMounted] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Resume",
  });

  useEffect(() => {
    setMounted(true);
    setTriggerPrint(() => {
      if (handlePrint) {
        handlePrint();
      }
    });
  }, [setTriggerPrint, handlePrint]);

  const TemplateComponent = templateRegistry[templateId] || templateRegistry["engineer"];

  if (!mounted) return null; // Avoid hydration mismatch on initial render

  return (
    <section className="flex-1 h-full relative overflow-hidden bg-[#e1e8fd] dot-grid-bg">
      {/* Zoomable Container */}
      <div className="w-full h-full overflow-auto flex items-start justify-center p-8 md:p-12 pb-32">
        {/* We wrap the print component in a div so react-to-print doesn't copy the transform scale inline style */}
        <div
          className="bg-white paper-shadow a4-page w-full max-w-[800px] shrink-0 origin-top transition-transform duration-300 ease-in-out"
          style={{
            transform: `scale(${zoom / 100})`,
          }}
        >
          <div ref={componentRef} className="w-full h-full bg-white print:!transform-none">
            {/* Render the selected template with the current data */}
            <TemplateComponent data={resumeData} />
          </div>
        </div>
      </div>

      <PreviewControls />
    </section>
  );
}
