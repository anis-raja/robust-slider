import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],       // Supports both CommonJS and ES Modules
  entry: ['./src/index.ts'],     // Main entry point for the package
  dts: true,                     // Generates TypeScript declaration files
  shims: true,                   // Adds shims for compatibility
  skipNodeModulesBundle: true,   // Do not bundle node_modules
  clean: true                    // Cleans the output directory before build
});