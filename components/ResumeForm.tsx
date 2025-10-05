'use client';

import React from 'react';
import { type ResumeData, type Entry } from '@/lib/initialData';

// Reusable component for form sections
const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-6">
    <h3 className="text-base font-semibold text-gray-800 mb-3">{title}</h3>
    <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
      {children}
    </div>
  </section>
);

// Reusable component for a single input field
const Input = ({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="grid grid-cols-1 gap-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
  </div>
);

// --- Main Form Component ---
export const ResumeForm = ({ data, setData }: { data: ResumeData, setData: React.Dispatch<React.SetStateAction<ResumeData>> }) => {

  // --- HANDLER FUNCTIONS ---

  // Handles changes for simple, top-level text fields
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.') as [keyof ResumeData, string];
      setData(prevData => ({
        ...prevData,
        [outerKey]: {
          // @ts-ignore
          ...prevData[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  // Handles changes within an array of objects (like projects, experience)
  const handleArrayChange = (section: 'projects' | 'experience', index: number, field: keyof Entry, value: string) => {
    setData(prevData => {
      const newArray = [...prevData[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prevData, [section]: newArray };
    });
  };

  const addArrayItem = (section: 'projects' | 'experience') => {
    const newItem = { title: '', points: [''] };
    setData(prevData => ({ ...prevData, [section]: [...prevData[section], newItem] }));
  };

  const removeArrayItem = (section: 'projects' | 'experience', index: number) => {
    setData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  // --- NEW: Handlers for nested bullet points ---
  const handlePointChange = (section: 'projects' | 'experience', entryIndex: number, pointIndex: number, value: string) => {
    setData(prevData => {
      const newArray = [...prevData[section]];
      const newPoints = [...newArray[entryIndex].points];
      newPoints[pointIndex] = value;
      newArray[entryIndex] = { ...newArray[entryIndex], points: newPoints };
      return { ...prevData, [section]: newArray };
    });
  };
  
  const addPoint = (section: 'projects' | 'experience', entryIndex: number) => {
    setData(prevData => {
      const newArray = [...prevData[section]];
      const newPoints = [...newArray[entryIndex].points, '']; // Add a new empty point
      newArray[entryIndex] = { ...newArray[entryIndex], points: newPoints };
      return { ...prevData, [section]: newArray };
    });
  };

  const removePoint = (section: 'projects' | 'experience', entryIndex: number, pointIndex: number) => {
    setData(prevData => {
      const newArray = [...prevData[section]];
      const newPoints = newArray[entryIndex].points.filter((_, i) => i !== pointIndex);
      newArray[entryIndex] = { ...newArray[entryIndex], points: newPoints };
      return { ...prevData, [section]: newArray };
    });
  };


  // --- RENDER ---
  return (
    <div className="p-4 bg-gray-50 rounded-lg max-h-screen overflow-y-auto">
      <FormSection title="Personal Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Full Name" name="name" value={data.name} onChange={handleTextChange} />
          <Input label="Phone" name="contact.phone" value={data.contact.phone} onChange={handleTextChange} />
          <Input label="Email" name="contact.email" value={data.contact.email} onChange={handleTextChange} />
          <Input label="LinkedIn" name="contact.linkedin" value={data.contact.linkedin} onChange={handleTextChange} />
          <Input label="GitHub" name="contact.github" value={data.contact.github} onChange={handleTextChange} />
          <Input label="Website" name="contact.website" value={data.contact.website} onChange={handleTextChange} />
        </div>
      </FormSection>

      <FormSection title="Education">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Degree" name="education.degree" value={data.education.degree} onChange={handleTextChange} />
          <Input label="University" name="education.university" value={data.education.university} onChange={handleTextChange} />
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">Details (GPA, Year)</label>
            <input
              name="education.details"
              value={data.education.details}
              onChange={handleTextChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
      </FormSection>
      
      <FormSection title="Experience">
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-gray-50 border rounded-md p-3 relative">
              <button onClick={() => removeArrayItem('experience', index)} aria-label="Remove experience" className="absolute -top-3 -right-3 text-white bg-red-500 rounded-full h-7 w-7 flex items-center justify-center shadow">×</button>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input label="Job Title" name={`experience[${index}].title`} value={exp.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
                <Input label="Company" name={`experience[${index}].company`} value={exp.company || ''} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
                <Input label="Duration" name={`experience[${index}].duration`} value={exp.duration || ''} onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)} />
              </div>

              {/* Bullet points */}
              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Accomplishments</label>
                <div className="space-y-2 mt-2">
                  {exp.points.map((point, pIndex) => (
                    <div key={pIndex} className="flex items-start gap-2">
                      <span className="mt-2 text-gray-500">•</span>
                      <textarea
                        value={point}
                        onChange={(e) => handlePointChange('experience', index, pIndex, e.target.value)}
                        rows={2}
                        className="flex-grow block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      <button onClick={() => removePoint('experience', index, pIndex)} className="text-red-500 font-bold text-xl leading-none">－</button>
                    </div>
                  ))}
                  <button onClick={() => addPoint('experience', index)} className="text-sm text-indigo-600 hover:text-indigo-800">+ Add point</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('experience')} className="w-full mt-1 p-2 bg-black text-white rounded hover:bg-indigo-700">+ Add Experience</button>
        </div>
      </FormSection>

      <FormSection title="Projects">
        <div className="space-y-4">
          {data.projects.map((proj, index) => (
            <div key={index} className="bg-gray-50 border rounded-md p-3 relative">
              <button onClick={() => removeArrayItem('projects', index)} aria-label="Remove project" className="absolute -top-3 -right-3 text-white bg-red-500 rounded-full h-7 w-7 flex items-center justify-center shadow">×</button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Project Title" name={`projects[${index}].title`} value={proj.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} />
                <Input label="Tech Stack" name={`projects[${index}].stack`} value={proj.stack || ''} onChange={(e) => handleArrayChange('projects', index, 'stack', e.target.value)} />
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Features / Description</label>
                <div className="space-y-2 mt-2">
                  {proj.points.map((point, pIndex) => (
                    <div key={pIndex} className="flex items-start gap-2">
                      <span className="mt-2 text-gray-500">•</span>
                      <textarea
                        value={point}
                        onChange={(e) => handlePointChange('projects', index, pIndex, e.target.value)}
                        rows={2}
                        className="flex-grow block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      <button onClick={() => removePoint('projects', index, pIndex)} className="text-red-500 font-bold text-xl leading-none">－</button>
                    </div>
                  ))}
                  <button onClick={() => addPoint('projects', index)} className="text-sm text-indigo-600 hover:text-indigo-800">+ Add point</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem('projects')} className="w-full mt-1 p-2 bg-black text-white rounded hover:bg-indigo-700">+ Add Project</button>
        </div>
      </FormSection>
    </div>
  );
};