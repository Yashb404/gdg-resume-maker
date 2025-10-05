## GDG Resume Maker

Modern resume builder built with Next.js App Router, React, and Tailwind v4. Edit your resume on the left and preview/print an A4-ready PDF on the right.

### Features
- Harvard-style template (default) with clean typography
- Live preview with resizable split view
- Print to PDF 

### Quickstart
```bash
npm install
npm run dev
# visit http://localhost:3000
```

### Scripts
- `npm run dev`: Start dev server (Turbopack)
- `npm run build`: Production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Project Structure
```
app/
  page.tsx            # Split view, template selector, print button
  globals.css         # Base styles + print rules
components/
  ResumeForm.tsx      # Editor form
  ResumePreview.tsx   # Template router
  templates/
    HarvardTemplate.tsx
lib/
  initialData.ts      # Shared types + default data
```

### Templates
- Templates live under `components/templates/` and export a React component: `({ data }: { data: ResumeData }) => JSX.Element`.
- Register templates in `components/ResumePreview.tsx` registry and pass `template` prop.
- The default key is `harvard`.

Example usage in `app/page.tsx`:
```tsx
<ResumePreview data={resumeData} template={template} />
```

### Printing to PDF
- Click the “Print PDF” button in the preview pane
- In the print dialog:
  - Paper size: A4
  - Margins: None
  - Scale: 100% (or Actual size)
  - Headers and footers: Off

Note: Browsers don’t allow forcing headers/footers off via CSS. The layout uses `@page` with A4 size and zero margins to maximize printable area.

### Accessibility
- Draggable divider has `role="separator"` and ARIA attributes.
- Form inputs are labeled. Further improvements welcome.

### Contributing
See CONTRIBUTING.md for guidelines, dev setup, and pull request steps.
