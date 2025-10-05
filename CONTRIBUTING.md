# Contributing to GDG Resume Maker

Thanks for taking the time to contribute! This document outlines how to propose changes and add templates.

## Development setup
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Visit `http://localhost:3000`

## Project conventions
- TypeScript everywhere. Use the shared `ResumeData` type from `lib/initialData.ts`.
- Keep components small and focused. Avoid deep nesting and unnecessary try/catch.
- Follow Tailwind utility-first style; keep custom CSS in `app/globals.css`.
- Prefer descriptive names (no 1–2 letter variables).
- Add TODO/FIXME comments when code needs follow-up.

## Branching and PRs
- Create feature branches: `feat/<short-name>` or `fix/<short-name>`.
- Keep PRs small and focused. Include before/after screenshots for UI changes.
- Run `npm run lint` and fix warnings/errors before opening a PR.
- Reference related issues in the PR description.

## Commit messages
- Use conventional, present-tense messages:
  - feat: add template registry and selector
  - fix: correct print area padding on preview pane
  - docs: update README with printing instructions

## Adding a new template
1. Create your component under `components/templates/<YourTemplateName>.tsx`.
2. Export a component: `({ data }: { data: ResumeData }) => JSX.Element`.
3. Register it in `components/ResumePreview.tsx` in the templates map with a string key.
4. Add it to the selector in `app/page.tsx` (the `<select>` options).
5. Ensure it prints well:
   - Page layout should fit inside `.resume-page` (A4) and avoid page breaks.
   - Test with the “Print PDF” button and the browser print dialog.

## Reporting bugs
- Include reproduction steps, browser/OS, and screenshots.
- Paste relevant console errors and describe expected vs actual behavior.

## Release checklist (maintainers)
- Changelog entry prepared.
- App builds with `npm run build`.
- Smoke test: editor, preview, and print dialog behavior.

Thanks for contributing! 
