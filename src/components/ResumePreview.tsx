"use client";

import React from "react";

export type ResumeData = {
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  website?: string;
  summary?: string;
  experiences?: Array<{
    company: string;
    role: string;
    start: string;
    end?: string;
    bullets?: string[];
  }>;
  education?: Array<{
    school: string;
    degree?: string;
    start?: string;
    end?: string;
  }>;
};

function SmallText({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-neutral-600 dark:text-neutral-400">{children}</div>;
}

export default function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <article className="w-full max-w-2xl bg-white dark:bg-[#070707] border border-black/[.06] dark:border-white/[.05] p-6 rounded shadow-sm resume-print">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">{data.name || "Your Name"}</h1>
        <SmallText>
          {data.title && <span>{data.title} · </span>}
          {data.email && <span>{data.email}</span>}
          {data.phone && <span> · {data.phone}</span>}
          {data.website && <span> · {data.website}</span>}
        </SmallText>
      </header>

      {data.summary && (
        <section className="mb-4">
          <h2 className="text-sm font-semibold mb-1">Summary</h2>
          <p className="text-sm leading-5">{data.summary}</p>
        </section>
      )}

      {data.experiences && data.experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-semibold mb-2">Experience</h2>
          <div className="flex flex-col gap-3">
            {data.experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <div className="font-medium">{exp.role} — {exp.company}</div>
                  <SmallText>{exp.start}{exp.end ? ` — ${exp.end}` : ""}</SmallText>
                </div>
                {exp.bullets && (
                  <ul className="mt-1 list-disc list-inside text-sm leading-5 text-neutral-700 dark:text-neutral-300">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold mb-2">Education</h2>
          <div className="flex flex-col gap-2 text-sm leading-5">
            {data.education.map((ed, i) => (
              <div key={i} className="flex items-baseline justify-between">
                <div>{ed.school}{ed.degree ? ` — ${ed.degree}` : ""}</div>
                <SmallText>{ed.start}{ed.end ? ` — ${ed.end}` : ""}</SmallText>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
