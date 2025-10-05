'use client';

import { useState } from 'react';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import { initialData, type ResumeData } from '@/lib/initialData';

export default function Home() {
  // State to hold all the resume data, initialized with our default data
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  return (
    <main className="flex min-h-screen">
      {/* Left Side: The Form */}
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Resume Editor</h1>
        <ResumeForm data={resumeData} setData={setResumeData} />
      </div>

      {/* Right Side: The Live Preview */}
      <div className="w-1/2 bg-gray-200 p-8">
        {/* This div provides the A4 paper effect on a gray background */}
        <div className="w-[8.27in] min-h-[11.69in] mx-auto">
           <ResumePreview data={resumeData} />
        </div>
      </div>
    </main>
  );
}