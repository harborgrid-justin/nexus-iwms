import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true
  },
  define: {
    // Explicitly define process.env.API_KEY to ensure it is replaced by Vite during build/serve.
    // This provides a fallback if the global process polyfill is bypassed.
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY || ""),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  }
});