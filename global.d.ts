// Allow importing CSS/SCSS files in TypeScript (global side-effect imports)
declare module "*.css";

declare module '*.scss';
declare module '*.sass';

// If you want to use CSS Modules with typed classNames, replace the above with:
// declare module '*.module.css' { const classes: { [key: string]: string }; export default classes; }
// declare module '*.module.scss' { const classes: { [key: string]: string }; export default classes; }


