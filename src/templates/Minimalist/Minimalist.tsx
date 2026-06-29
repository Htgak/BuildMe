import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function Minimalist({ data }: Props) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 font-['Inter'] leading-relaxed overflow-hidden">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-light tracking-wide uppercase mb-3">
          {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
        </h1>
        <p className="text-sm text-gray-500 tracking-widest uppercase mb-4">{personalInfo.professionalTitle}</p>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <>
              <span className="text-gray-300">•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span className="text-gray-300">•</span>
              <span>{personalInfo.location}</span>
            </>
          )}
          {/* We would render links here, skipping website for brevity since links is an array */}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-sm text-gray-700 leading-loose text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold tracking-widest uppercase border-b border-gray-200 pb-2 mb-4 text-gray-400">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
                  <span className="text-xs text-gray-500 font-mono">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2 italic">{exp.company}</div>
                {exp.description && exp.description.length > 0 && (
                  <ul className="list-none space-y-1 text-sm text-gray-700">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2 text-gray-400">-</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold tracking-widest uppercase border-b border-gray-200 pb-2 mb-4 text-gray-400">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                  <div className="text-sm text-gray-600 italic mb-1">{edu.institution}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold tracking-widest uppercase border-b border-gray-200 pb-2 mb-4 text-gray-400">
              Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skillGroup) => (
                <div key={skillGroup.id}>
                  <h3 className="text-xs font-semibold text-gray-800 uppercase mb-1">{skillGroup.category}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {skillGroup.skills.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-bold tracking-widest uppercase border-b border-gray-200 pb-2 mb-4 text-gray-400">
            Selected Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {proj.name} {proj.link && <span className="text-gray-400 text-xs font-normal ml-2">({proj.link})</span>}
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">
                    {proj.startDate} - {proj.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-1">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-600">Tech:</span> {proj.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
