"use client";

import React, { useState } from "react";
import ResumePreview, { ResumeData } from "../components/ResumePreview";

const defaultData: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  website: "",
  summary: "",
  experiences: [],
  education: [],
};

export default function Home() {
  const [data, setData] = useState<ResumeData>(defaultData);

  function update<K extends keyof ResumeData>(k: K, v: ResumeData[K]) {
    setData((s) => ({ ...s, [k]: v }));
  }

  return (
    <div className="min-h-screen p-6 sm:p-12 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <section className="space-y-4">
          <h1 className="text-2xl font-bold">Resume Maker — Minimal</h1>
          <p className="text-sm text-neutral-600">Fill the fields on the left — preview updates instantly on the right.</p>

          <div className="grid grid-cols-1 gap-3">
            <label className="flex flex-col">
              <span className="text-sm font-medium">Full name</span>
              <input className="border rounded px-2 py-1" value={data.name} onChange={(e) => update("name", e.target.value)} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium">Title</span>
              <input className="border rounded px-2 py-1" value={data.title} onChange={(e) => update("title", e.target.value)} />
            </label>

            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col">
                <span className="text-sm font-medium">Email</span>
                <input className="border rounded px-2 py-1" value={data.email} onChange={(e) => update("email", e.target.value)} />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium">Phone</span>
                <input className="border rounded px-2 py-1" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm font-medium">Website</span>
              <input className="border rounded px-2 py-1" value={data.website} onChange={(e) => update("website", e.target.value)} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium">Summary (one short paragraph)</span>
              <textarea className="border rounded px-2 py-1" rows={4} value={data.summary} onChange={(e) => update("summary", e.target.value)} />
            </label>
          </div>

          <small className="text-neutral-500">Tip: Keep bullets short, one line each. This baseline intentionally has no styling fluff &mdash; it&apos;s easy to print or export to PDF.</small>
        </section>

        <aside className="">
          <ResumePreview data={data} />
        </aside>
      </div>
    </div>
  );
}
