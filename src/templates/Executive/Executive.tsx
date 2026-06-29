"use client";

import { ResumeData } from "@/types/resume";

export default function Executive({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white font-serif text-gray-800 flex flex-row">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-100 p-8 border-r border-gray-200 flex flex-col gap-8">
        <section>
          {personalInfo.avatarUrl && (
            <img src={personalInfo.avatarUrl} alt="Profile" className="w-32 h-32 rounded-full mb-6 mx-auto object-cover border-4 border-white shadow-sm" />
          )}
          <h2 className="text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
            Contact
          </h2>
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.links.map((link) => (
              <div key={link.id} className="truncate">
                {link.url}
              </div>
            ))}
          </div>
        </section>

        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
              Expertise
            </h2>
            <div className="flex flex-col gap-4">
              {skills.map((group) => (
                <div key={group.id}>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">{group.category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {group.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
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
            <h2 className="text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="text-sm">
                  <div className="font-bold text-gray-800">{edu.degree}</div>
                  <div className="text-gray-600">{edu.field}</div>
                  <div className="text-gray-500 text-xs mt-1">{edu.institution}</div>
                  <div className="text-gray-400 text-xs">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 flex flex-col gap-8">
        <header className="mb-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {personalInfo.firstName} <span className="text-gray-500">{personalInfo.lastName}</span>
          </h1>
          <h2 className="text-xl text-gray-600 uppercase tracking-widest">
            {personalInfo.professionalTitle}
          </h2>
        </header>

        {personalInfo.summary && (
          <section>
            <p className="text-sm text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
              Experience
            </h2>
            <div className="flex flex-col gap-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-gray-600 font-medium text-sm mb-2">
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold tracking-widest text-gray-900 uppercase border-b border-gray-300 pb-2 mb-4">
              Selected Projects
            </h2>
            <div className="flex flex-col gap-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
