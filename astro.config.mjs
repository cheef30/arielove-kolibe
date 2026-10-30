// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { rm } from 'node:fs/promises';

/*
 * Adresa sajta se podešava preko promenljivih okruženja, da isti kod radi
 * i na https://cheef30.github.io/<repo>/ i kasnije na sopstvenom domenu.
 * GitHub Actions (.github/workflows/deploy.yml) ih postavlja sam:
 *  - ako public/CNAME sadrži domen: SITE_URL=https://domen, BASE_PATH=/
 *  - ako ne: SITE_URL=https://<korisnik>.github.io, BASE_PATH=/<repo>
 * Lokalno (npm run dev / build) sajt radi na korenu "/".
 */
const site = process.env.SITE_URL || 'https://cheef30.github.io';
const base = process.env.BASE_PATH || '/';

/** Originali iz public/images se optimizuju kroz astro:assets, pa ih ne kopiramo u dist. */
const dropOriginalImages = {
  name: 'drop-original-images',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await rm(new URL('images/', dir), { recursive: true, force: true });
    },
  },
};

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
  integrations: [dropOriginalImages],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
