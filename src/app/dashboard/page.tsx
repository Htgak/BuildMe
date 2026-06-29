"use client";

import Link from "next/link";
import TopNavBar from "@/components/layout/TopNavBar";
import { useEffect, useState } from "react";
import { getResumes } from "@/lib/api/resumes";
import { ResumeDocument } from "@/types/resume";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardPage() {
  const [resumes, setResumes] = useState<ResumeDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadResumes() {
      // In a real app with auth, this fetches from Supabase
      // For now, we mock it or handle empty state gracefully
      const data = await getResumes();
      setResumes(data);
      setLoading(false);
    }
    loadResumes();
  }, []);

  return (
    <div className="min-h-screen bg-surface-white flex flex-col font-['Inter']">
      <TopNavBar variant="dashboard" />

      <div className="flex flex-1 overflow-hidden">
        {/* Dashboard Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background p-8 md:p-12">
          <div className="max-w-[1024px] mx-auto">
            <div className="mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-[32px] font-bold text-on-surface mb-2">My Resumes</h1>
                <p className="text-on-surface-variant">Manage and edit your saved resumes.</p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Create New Card */}
                <Link
                  href="/builder/new"
                  className="bg-surface-container-lowest border-2 border-dashed border-border-default rounded-2xl flex flex-col items-center justify-center p-8 min-h-[320px] hover:border-primary hover:bg-surface-container-low transition-all group text-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4 group-hover:bg-primary-container group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[32px]">add</span>
                  </div>
                  <h3 className="font-bold text-[18px] text-on-surface mb-2">New Resume</h3>
                  <p className="text-[14px] text-on-surface-variant font-['Source_Sans_3']">
                    Start from scratch or use a template
                  </p>
                </Link>

                {/* Resume Cards */}
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="bg-white rounded-2xl border border-border-default overflow-hidden hover:shadow-lg transition-all group flex flex-col"
                  >
                    <div className="aspect-[1/1.2] bg-surface-variant relative">
                      {/* Thumbnail Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center text-outline font-medium">
                        Preview
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/builder/${resume.id}`}
                          className="px-6 py-2 bg-primary-container text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col border-t border-border-default">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[16px] text-on-surface truncate pr-2">
                          {resume.title}
                        </h3>
                        <button className="text-outline-variant hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                      <p className="text-[12px] text-on-surface-variant mt-auto flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        Edited {new Date(resume.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
