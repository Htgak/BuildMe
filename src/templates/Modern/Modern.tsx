import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function Modern({ data }: Props) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white flex overflow-hidden font-['Inter']">
      
      {/* Left Sidebar - Dark Theme */}
      <aside className="w-[30%] bg-[#1e293b] text-white p-8 flex flex-col">
        {/* We can skip photoUrl since it's not in the base schema or add it to schema, skipping for now */}
        <h1 className="text-3xl font-bold mb-1 break-words">
          {personalInfo.firstName}<br />{personalInfo.lastName}
        </h1>
        <div className="w-12 h-1 bg-blue-500 mb-4" />
        <p className="text-slate-300 text-sm mb-8">{personalInfo.professionalTitle}</p>

        {/* Contact Info */}
        <section className="mb-8">
          <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Contact</h2>
          <div className="space-y-3 text-sm text-slate-200">
            {personalInfo.email && (
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase">Email</span>
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase">Phone</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase">Location</span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {/* skip website */}
          </div>
        </section>

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Expertise</h2>
            <div className="space-y-4">
              {skills.map((skillGroup) => (
                <div key={skillGroup.id}>
                  <h3 className="text-sm font-semibold text-slate-100 mb-2">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((item, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-[70%] bg-slate-50 p-8 pt-12 text-slate-800">
        
        {/* Profile */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </span>
              Profile
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">work</span>
              </span>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute w-3 h-3 bg-slate-200 rounded-full -left-[7px] top-1.5 border-2 border-white" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-800">{exp.position}</h3>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-500 mb-2">{exp.company}</div>
                  {exp.description && exp.description.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 marker:text-slate-400">
                      {exp.description.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Projects Split */}
        <div className="grid grid-cols-2 gap-6">
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                </span>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{edu.degree}</h3>
                    <div className="text-sm text-slate-500 mb-2">{edu.institution}</div>
                    <div className="text-xs font-semibold text-slate-400">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                </span>
                Projects
              </h2>
              <div className="space-y-4">
                {projects.slice(0, 2).map((proj) => (
                  <div key={proj.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{proj.name}</h3>
                    <p className="text-xs text-slate-600 mb-2 line-clamp-2">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

      </main>
    </div>
  );
}
