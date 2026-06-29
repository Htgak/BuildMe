import Link from "next/link";
import TopNavBar from "@/components/layout/TopNavBar";
import Image from "next/image";
import { templates, templateRegistry } from "@/templates";
import { sampleResumeData } from "@/utils/sample-data";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-white flex flex-col font-['Inter']">
      <TopNavBar variant="landing" />

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low border border-border-default mb-8">
          <span className="material-symbols-outlined text-primary text-[18px]">
            new_releases
          </span>
          <span className="text-[14px] font-semibold text-on-surface-variant">
            New ATS-Optimized Templates Added
          </span>
        </div>

        <h1 className="text-[48px] md:text-[64px] font-bold text-on-surface tracking-tight leading-[1.1] max-w-[800px] mb-6">
          Build a Professional Resume in Minutes
        </h1>
        
        <p className="text-[18px] text-on-surface-variant max-w-[600px] mb-10 font-['Source_Sans_3'] leading-relaxed">
          Create an ATS-friendly, beautifully designed resume with our AI-powered builder. Stand out to employers and land your dream job faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/builder/demo"
            className="px-8 py-4 bg-primary-container text-on-primary font-bold rounded-xl hover:opacity-90 transition-opacity text-[16px] shadow-lg shadow-primary-container/20"
          >
            Create Your Resume
          </Link>
          <a
            href="#templates"
            className="px-8 py-4 bg-surface-white border border-border-default text-on-surface font-bold rounded-xl hover:bg-surface-container-low transition-colors text-[16px]"
          >
            Browse Templates
          </a>
        </div>


      </main>

      {/* Templates Gallery */}
      <section id="templates" className="bg-surface-container-low py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold text-on-surface mb-4">Professionally Designed Templates</h2>
            <p className="text-on-surface-variant">Choose from our selection of ATS-friendly designs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((tpl) => {
              const TemplateComponent = templateRegistry[tpl.id];
              return (
                <div key={tpl.id} className="bg-white rounded-2xl p-4 shadow-sm border border-border-default hover:shadow-lg transition-shadow group flex flex-col">
                  <div className="aspect-[1/1.4] bg-surface-variant rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                    
                    {/* Scaled down live preview of the template */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                      <div className="origin-center" style={{ transform: 'scale(0.32)' }}>
                        <div className="bg-white a4-page shadow-sm shrink-0 overflow-hidden" style={{ width: '800px', minHeight: '1131px' }}>
                           <TemplateComponent data={sampleResumeData} />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Link href={`/builder/new?template=${tpl.id}`} className="px-6 py-2 bg-white text-primary font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                        Use Template
                      </Link>
                    </div>
                  </div>
                  <h3 className="font-bold text-[18px] text-on-surface mt-auto">{tpl.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border-default py-12 px-6">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <Image src="/logo.png" alt="Logo" width={100} height={32} className="object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" />
          <span className="text-on-surface-variant text-[14px]">© 2026 BuildMe AI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
