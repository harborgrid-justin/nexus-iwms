import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This is necessary because the @google/genai SDK examples and some
      // enterprise code patterns use process.env.API_KEY. 
      // Vite normally uses import.meta.env.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env': process.env
    },
  };
});