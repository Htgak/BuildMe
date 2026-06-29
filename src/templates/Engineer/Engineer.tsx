"use client";

import { ResumeData } from "@/types/resume";

export default function Engineer({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects, certificates } = data;

  return (
    <div className="w-full h-full bg-white font-sans text-gray-800 leading-tight">
      {/* Header */}
      <div className="bg-[#1e3a8a] text-white p-8">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl font-medium text-blue-200 mb-4">
          {personalInfo.professionalTitle}
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-blue-100">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.links.map((link) => (
            <span key={link.id}>• {link.url}</span>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3 uppercase tracking-wider">
              Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-sm text-gray-600 font-medium">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-gray-700 italic">{exp.company}</span>
                    <span className="text-sm text-gray-500">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 ml-2">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3 uppercase tracking-wider">
              Projects
            </h3>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900">
                      {proj.name}
                      {proj.link && (
                        <span className="text-sm font-normal text-blue-600 ml-2">
                          ({proj.link})
                        </span>
                      )}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{proj.description}</p>
                  <p className="text-xs text-gray-500 font-mono">
                    {proj.technologies.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3 uppercase tracking-wider">
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900">{edu.institution}</h4>
                    <span className="text-sm text-gray-600 font-medium">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-700">
                      {edu.degree} in {edu.field}
                    </span>
                    {edu.gpa && <span className="text-sm text-gray-600">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm mt-1 text-gray-700 ml-2">
                      {edu.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3 uppercase tracking-wider">
              Skills
            </h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {skills.map((group) => (
                <div key={group.id} className="text-sm">
                  <span className="font-bold text-gray-900 mr-2">{group.category}:</span>
                  <span className="text-gray-700">{group.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3 uppercase tracking-wider">
              Certificates
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <div className="font-bold text-gray-900">{cert.name}</div>
                  <div className="text-gray-700">{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
