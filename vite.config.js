import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/' is correct for a user site repo named <username>.github.io
// If you deploy to a PROJECT repo instead (e.g. github.com/you/portfolio),
// change this to '/portfolio/' — the repo name, with slashes on both sides.
export default defineConfig({
  plugins: [react()],
  base: '/',

  // host: true binds to every network interface instead of localhost only, so
  // Vite prints a "Network:" URL you can open on your phone or another machine
  // on the same wifi. Both servers get it: `npm run dev` and `npm run preview`.
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
