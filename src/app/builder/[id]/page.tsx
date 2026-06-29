"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useResumeStore } from "@/store/resume-store";
import { getResumeById } from "@/lib/api/resumes";
import { sampleResumeData, emptyResumeData } from "@/utils/sample-data";
import TopNavBar from "@/components/layout/TopNavBar";
import SectionsSidebar from "@/components/ResumeForm/SectionsSidebar";
import ResumeForm from "@/components/ResumeForm/ResumeForm";
import ResumePreview from "@/components/ResumePreview/ResumePreview";

export default function BuilderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const resumeId = params.id as string;
  const requestedTemplate = searchParams.get("template");
  
  const { setResumeId, setResumeData, setResumeTitle, setTemplateId, resumeTitle } = useResumeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (resumeId === "new") {
        if (requestedTemplate) {
          // Fresh resume from dashboard
          setResumeId(null);
          setResumeData(emptyResumeData);
          setResumeTitle("Untitled Resume");
          setTemplateId(requestedTemplate);
          // Change URL so refresh doesn't reset the draft
          window.history.replaceState(null, "", "/builder/local");
        } else {
          const store = useResumeStore.getState();
          if (store.isDirty) {
            window.history.replaceState(null, "", "/builder/local");
          } else {
            setResumeId(null);
            setResumeData(emptyResumeData);
            setResumeTitle("Untitled Resume");
            setTemplateId("engineer");
          }
        }
        setLoading(false);
      } else if (resumeId === "local") {
        // Hydrated from Zustand persist automatically
        setLoading(false);
      } else if (resumeId === "demo") {
        setResumeId("demo");
        setResumeData(sampleResumeData);
        setResumeTitle("John Doe - Software Engineer");
        setTemplateId("engineer");
        setLoading(false);
      } else {
        // Load from Supabase
        const resume = await getResumeById(resumeId);
        if (resume) {
          setResumeId(resume.id);
          setResumeData(resume.data);
          setResumeTitle(resume.title);
          setTemplateId(resume.template_id);
        } else {
          // Fallback if not found (or for UI demo purposes if auth not setup)
          setResumeId("demo");
          setResumeData(sampleResumeData);
          setResumeTitle("Demo Resume");
        }
        setLoading(false);
      }
    }
    
    loadData();
  }, [resumeId, setResumeId, setResumeData, setResumeTitle, setTemplateId]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-surface-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <TopNavBar variant="builder" resumeTitle={resumeTitle} onExport={() => {
        const { triggerPrint } = useResumeStore.getState();
        if (triggerPrint) {
          triggerPrint();
        } else {
          window.print();
        }
      }} />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Desktop) */}
        <SectionsSidebar />
        
        {/* Center Form Editor */}
        <ResumeForm />
        
        {/* Right Live Preview */}
        <div className="hidden lg:flex flex-1 relative h-full">
          <ResumePreview />
        </div>
      </main>

      {/* Mobile FAB for Preview */}
      <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary-container text-white rounded-full shadow-lg flex items-center justify-center z-50">
        <span className="material-symbols-outlined text-[24px]">visibility</span>
      </button>
    </div>
  );
}
