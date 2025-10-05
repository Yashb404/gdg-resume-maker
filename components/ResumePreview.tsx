'use client';

import React from 'react';
import { type ResumeData } from '@/lib/initialData';
import { HarvardTemplate } from '@/components/templates/HarvardTemplate';

type TemplateKey = 'harvard';

const templates: Record<TemplateKey, React.FC<{ data: ResumeData }>> = {
  harvard: HarvardTemplate,
};

// TODO: Add more templates and register them above as they are created.
export const ResumePreview = ({ data, template = 'harvard' as TemplateKey }: { data: ResumeData; template?: TemplateKey }) => {
  const TemplateComponent = templates[template] ?? HarvardTemplate;
  return <TemplateComponent data={data} />;
};