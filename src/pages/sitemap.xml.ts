import type { APIRoute } from 'astro';
import { LANGS, languages } from '../content';
import { absoluteUrl, pathFor } from '../lib/site';

/* sitemap.xml sa hreflang vezama između srpske, engleske i ruske verzije */
export const GET: APIRoute = ({ site }) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const alternates = [
    ...LANGS.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${languages[l].hreflang}" href="${absoluteUrl(pathFor(l), site)}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(pathFor('sr'), site)}"/>`,
  ].join('\n');
  const urls = LANGS.map(
    (l) => `  <url>
    <loc>${absoluteUrl(pathFor(l), site)}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`,
  ).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
