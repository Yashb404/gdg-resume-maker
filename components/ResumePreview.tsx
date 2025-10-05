'use client';

import React from 'react';
import { type ResumeData } from '@/lib/initialData';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-2">
    <h2 className="text-lg font-bold border-b border-black pb-0.5 mb-1">{title}</h2>
    {children}
  </section>
);

export const ResumePreview = ({ data }: { data: ResumeData }) => {
  const { name, contact, education, experience, projects, research, skills, certifications, positions } = data;

  return (
    <div className="bg-white shadow-lg p-[0.5in] font-[Times] text-[10pt] leading-normal">
      {/* Header */}
      <header className="text-center mb-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-2 text-sm">
          <a href={`tel:${contact.phone}`} className="text-blue-700 hover:underline">{contact.phone}</a>
          <span>|</span>
          <a href={`mailto:${contact.email}`} className="text-blue-700 hover:underline">{contact.email}</a>
          <span>|</span>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>
          <span>|</span>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub</a>
          <span>|</span>
          <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Website</a>
        </div>
      </header>

      {/* Education */}
      <Section title="Education">
        <div className="flex justify-between items-start">
          <h3 className="font-bold">{education.degree}</h3>
          <p>{education.university}</p>
        </div>
        <p>{education.details}</p>
      </Section>
      
      {/* Experience - Conditionally Rendered */}
      {experience && experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} className="mb-2 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{exp.title}</h3>
                <p className="font-bold">{exp.company}</p>
              </div>
              {/* --- THIS IS THE FIX --- */}
              <div className="flex justify-between items-baseline italic my-0.5">
                <p>{exp.duration}</p>
                <p>{exp.location}</p>
              </div>
              <ul className="list-disc list-outside ml-4">
                {exp.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* Projects - Conditionally Rendered */}
      {projects && projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} className="mb-2 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{proj.title}</h3>
                {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline font-medium">GitHub</a>}
              </div>
              {proj.stack && <p className="italic my-0.5">{proj.stack}</p>}
              <ul className="list-disc list-outside ml-4">
                {proj.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}
      
      {/* Research - Conditionally Rendered */}
      {research && research.points.length > 0 && (
        <Section title="Research">
          <div className="mb-1">
            <h3 className="font-bold">{research.title}</h3>
            <p className="italic my-0.5">{research.subtitle}</p>
            <p className="mb-1">{research.journal}</p>
            <ul className="list-disc list-outside ml-4">
              {research.points.map((point, j) => <li key={j}>{point}</li>)}
            </ul>
          </div>
        </Section>
      )}

      {/* Technical Skills */}
      <Section title="Technical Skills">
        <div className="space-y-0.5">
          {skills.map((skill, i) => (
            <div key={i}>
              <span className="font-bold">{skill.category}: </span>
              <span>{skill.list}</span>
            </div>
          ))}
        </div>
      </Section>
      
      {/* Certifications - Conditionally Rendered */}
      {certifications && certifications.length > 0 && (
        <Section title="Certifications">
          <p>{certifications.join('; ')}</p>
        </Section>
      )}
      
      {/* Positions of Responsibility - Conditionally Rendered */}
      {positions && positions.length > 0 && (
        <Section title="Positions of Responsibility">
            <ul className="list-disc list-outside ml-4">
              {positions.map((pos, i) => <li key={i}>{pos}</li>)}
            </ul>
        </Section>
      )}
    </div>
  );
};