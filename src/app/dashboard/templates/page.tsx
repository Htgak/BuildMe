import TopNavBar from "@/components/layout/TopNavBar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Link from "next/link";
import { templates, templateRegistry } from "@/templates";
import { sampleResumeData } from "@/utils/sample-data";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-surface-white flex flex-col font-['Inter']">
      <TopNavBar variant="dashboard" />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />

        <main className="flex-1 overflow-y-auto bg-background p-8 md:p-12">
          <div className="max-w-[1024px] mx-auto">
            <div className="mb-10">
              <h1 className="text-[32px] font-bold text-on-surface mb-2">Templates</h1>
              <p className="text-on-surface-variant">Browse and choose from our professionally designed templates.</p>
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
        </main>
      </div>
    </div>
  );
}
