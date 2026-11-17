// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción: lo usan la URL canónica y el mapa del sitio.
  site: 'https://amunpos.com',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
