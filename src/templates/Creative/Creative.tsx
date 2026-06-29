"use client";

import { ResumeData } from "@/types/resume";

export default function Creative({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="w-full h-full bg-white font-sans text-gray-800">
      <div className="px-10 py-12">
        {/* Header Section */}
        <div className="flex items-center gap-8 mb-10">
          {personalInfo.avatarUrl ? (
            <img 
              src={personalInfo.avatarUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-teal-50"
            />
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-300 text-5xl font-bold shadow-sm">
              {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
              {personalInfo.firstName} <span className="text-teal-600">{personalInfo.lastName}</span>
            </h1>
            <h2 className="text-2xl font-medium text-gray-500 mb-4">
              {personalInfo.professionalTitle}
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
              {personalInfo.email && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500"></span>{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500"></span>{personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500"></span>{personalInfo.location}</span>}
              {personalInfo.links.map((link) => (
                <span key={link.id} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500"></span>{link.url}</span>
              ))}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-10 text-gray-600 leading-relaxed text-lg border-l-4 border-teal-500 pl-6 py-2 italic bg-teal-50/30 rounded-r-lg">
            {personalInfo.summary}
          </div>
        )}

        <div className="grid grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="col-span-8 space-y-10">
            {experience.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                    <span className="material-symbols-outlined text-xl">work</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
                </div>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:mx-auto before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {experience.map((exp, i) => (
                    <div key={exp.id} className="relative flex items-center justify-normal odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-teal-500 text-slate-500 shadow shrink-0 absolute mx-auto left-1/2 -translate-x-1/2"></div>
                      
                      <div className="w-[calc(50%-2rem)] p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-gray-900">{exp.position}</div>
                        </div>
                        <div className="text-teal-600 font-semibold text-sm mb-1">{exp.company}</div>
                        <div className="text-gray-400 text-xs mb-3 font-medium">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                          {exp.description.map((desc, idx) => (
                            <li key={idx} className="line-clamp-2 hover:line-clamp-none transition-all">{desc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Side Column */}
          <div className="col-span-4 space-y-10">
            {skills.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                    <span className="material-symbols-outlined text-xl">bolt</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
                </div>
                
                <div className="space-y-5">
                  {skills.map((group) => (
                    <div key={group.id}>
                      <h4 className="font-bold text-gray-800 mb-2">{group.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, i) => (
                          <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-100 font-medium shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                    <span className="material-symbols-outlined text-xl">school</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                </div>
                
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                      <div className="text-teal-600 text-sm font-medium mb-1">{edu.institution}</div>
                      <div className="text-gray-500 text-xs mb-2">
                        {edu.startDate} - {edu.endDate}
                      </div>
                      {edu.gpa && <div className="text-gray-600 text-sm font-medium">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
