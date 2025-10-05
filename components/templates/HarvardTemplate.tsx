'use client';

import React from 'react';
import { type ResumeData } from '@/lib/initialData';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-[6pt]">
    <h2 className="text-[12pt] font-bold border-b border-black pb-[2pt] mb-[4pt]">{title}</h2>
    {children}
  </section>
);

export const HarvardTemplate = ({ data }: { data: ResumeData }) => {
  const { name, contact, education, experience, projects, research, skills, certifications, positions } = data;

  return (
    <div className="resume-page">
      <div className="p-[0.5in] font-[Times] text-[10pt] leading-[1.3]">
        <header className="text-center mb-[8pt]">
          <h1 className="text-[18pt] font-bold mb-[2pt]">{name}</h1>
          <div className="flex justify-center items-center flex-wrap gap-x-[6pt] text-[9pt]">
            <a href={`tel:${contact.phone}`} className="text-blue-700 hover:underline">{contact.phone}</a>
            <span>|</span>
            <a href={`mailto:${contact.email}`} className="text-blue-700 hover:underline">{contact.email}</a>
            <span>|</span>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>
            <span>|</span>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub</a>
            {contact.website && (<><span>|</span><a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Website</a></>)}
          </div>
        </header>

        <Section title="Education">
          <div className="flex justify-between items-start">
            <h3 className="font-bold">{education.degree}</h3>
            <p>{education.university}</p>
          </div>
          <p className="mt-[2pt]">{education.details}</p>
        </Section>

        {experience && experience.length > 0 && (
          <Section title="Experience">
            {experience.map((exp, i) => (
              <div key={i} className="mb-[6pt] last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.title}</h3>
                  <p className="font-bold">{exp.company}</p>
                </div>
                <div className="flex justify-between items-baseline italic my-[2pt]">
                  <p>{exp.duration}</p>
                  <p>{exp.location}</p>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-[2pt]">
                  {exp.points.map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {projects && projects.length > 0 && (
          <Section title="Projects">
            {projects.map((proj, i) => (
              <div key={i} className="mb-[6pt] last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{proj.title}</h3>
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[9pt] text-blue-700 hover:underline font-medium">GitHub</a>}
                </div>
                {proj.stack && <p className="italic my-[2pt]">{proj.stack}</p>}
                <ul className="list-disc list-outside ml-4 space-y-[2pt]">
                  {proj.points.map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {research && research.points && research.points.length > 0 && (
          <Section title="Research">
            <div className="mb-[4pt]">
              <h3 className="font-bold">{research.title}</h3>
              <p className="italic my-[2pt]">{research.subtitle}</p>
              <p className="mb-[2pt]">{research.journal}</p>
              <ul className="list-disc list-outside ml-4 space-y-[2pt]">
                {research.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          </Section>
        )}

        <Section title="Technical Skills">
          <div className="space-y-[2pt]">
            {skills.map((skill, i) => (
              <div key={i}>
                <span className="font-bold">{skill.category}: </span>
                <span>{skill.list}</span>
              </div>
            ))}
          </div>
        </Section>

        {certifications && certifications.length > 0 && (
          <Section title="Certifications">
            <p>{certifications.join('; ')}</p>
          </Section>
        )}

        {positions && positions.length > 0 && (
          <Section title="Positions of Responsibility">
            <ul className="list-disc list-outside ml-4 space-y-[2pt]">
              {positions.map((pos, i) => <li key={i}>{pos}</li>)}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
};


