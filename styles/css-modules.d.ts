// Global CSS Type Declarations
// This file handles all CSS imports in the project

declare module "*.css" {
  // Using unknown is safer than any
  const content: unknown;
  export default content;
}

// Global CSS imports
declare module "@/styles/globals.css";
declare module "@/styles/*.css";
declare module "@styles/*.css";
