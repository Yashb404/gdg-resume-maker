'use client';

import { useEffect, useRef, useState } from 'react';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import { initialData, type ResumeData } from '@/lib/initialData';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  // Resizable split state
  const [leftPercent, setLeftPercent] = useState<number>(50);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const viewportWidth = window.innerWidth;
      const x = Math.max(200, Math.min(e.clientX, viewportWidth - 200)); // min 200px each side
      const pct = (x / viewportWidth) * 100;
      setLeftPercent(Math.max(20, Math.min(pct, 80)));
    };
    const onUp = () => { isDraggingRef.current = false; document.body.classList.remove('select-none'); };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const onDown = () => {
    isDraggingRef.current = true;
    document.body.classList.add('select-none');
  };


  return (
    <main className="flex min-h-screen">
      {/* Left: Editor */}
      <div
        className="p-4 overflow-auto min-w-0 no-print"
        style={{ flexBasis: `${leftPercent}%` }}
      >
        <h1 className="text-xl font-semibold mb-3 text-center">Resume Editor</h1>
        <ResumeForm data={resumeData} setData={setResumeData} />
      </div>

      {/* Draggable Divider */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize editor and preview"
        className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize no-print"
        onMouseDown={onDown}
      />

      {/* Right: Preview */}
      <div
        className="bg-gray-100 p-4 overflow-auto min-w-0 print-area"
        style={{ flexBasis: `${100 - leftPercent}%` }}
      >
        <div className="flex justify-end mb-2 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 text-sm rounded bg-black text-white hover:bg-gray-800"
            aria-label="Print resume as PDF"
          >
            Print PDF
          </button>
        </div>
        <ResumePreview data={resumeData} />
      </div>
    </main>
  );}
