"use client";

import { ResumeData } from "@/types/resume";
import { saveAs } from "file-saver";

export const exportJSON = (data: ResumeData, title: string = "resume") => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, `${title.replace(/\s+/g, "_").toLowerCase()}.json`);
};

// We will implement PDF and DOCX export here
export const exportPDF = async (data: ResumeData, title: string = "resume") => {
  // In a full implementation, this would dynamically import the PDF generator
  // and use @react-pdf/renderer's pdf() function
  alert("PDF Export will be generated here using @react-pdf/renderer");
};

export const exportDOCX = async (data: ResumeData, title: string = "resume") => {
  // In a full implementation, this would use the 'docx' library
  alert("DOCX Export will be generated here using the docx library");
};
