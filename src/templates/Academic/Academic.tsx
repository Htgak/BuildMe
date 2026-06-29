import React from "react";
import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function Academic({ data }: Props) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white text-black p-10 font-serif overflow-hidden">
      
      {/* Header */}
      <header className="text-center mb-6 border-b-2 border-black pb-4">
        <h1 className="text-4xl font-bold mb-1 uppercase tracking-wider">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm flex flex-wrap justify-center gap-3 mt-2">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>|</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {/* skipped website/links */}
        </div>
      </header>

      {/* Summary / Research Interest */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-sm text-justify leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3 pb-1 tracking-widest">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div className="max-w-[75%]">
                  <h3 className="font-bold text-[15px]">{edu.institution}</h3>
                  <div className="italic text-sm">{edu.degree}</div>
                  {/* description is achievements for edu in this schema */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="list-disc ml-5 mt-1 text-sm">
                       {edu.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                    </ul>
                  )}
                </div>
                <div className="text-sm text-right whitespace-nowrap">
                  {edu.startDate} — {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Academic / Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3 pb-1 tracking-widest">
            Academic & Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-[15px]">{exp.position}</h3>
                    <div className="italic text-sm">{exp.company}</div>
                  </div>
                  <div className="text-sm whitespace-nowrap">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                {exp.description && exp.description.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-sm text-justify">
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

      {/* Publications / Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3 pb-1 tracking-widest">
            Selected Works & Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-sm">
                <span className="font-bold">{proj.name}</span>. {proj.description} 
                <span className="italic text-gray-700 ml-1">
                  ({proj.startDate} - {proj.endDate})
                </span>
                {proj.technologies && proj.technologies.length > 0 && (
                  <span className="ml-1 text-gray-600">
                    [Tools: {proj.technologies.join(", ")}]
                  </span>
                )}
                {proj.link && (
                  <span className="ml-1">
                    Available at: <a href={proj.link} className="underline">{proj.link}</a>
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills / Methodologies */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3 pb-1 tracking-widest">
            Core Competencies
          </h2>
          <div className="text-sm space-y-2">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                <span className="font-bold mr-2">{skillGroup.category}:</span>
                <span>{skillGroup.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
    </div>
  );
}
