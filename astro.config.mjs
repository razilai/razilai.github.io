// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://razilai.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
