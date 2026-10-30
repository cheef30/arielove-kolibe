import type { APIRoute } from 'astro';
import { absoluteUrl, basePath } from '../lib/site';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(`${basePath}sitemap.xml`, site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
