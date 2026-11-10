import type { APIRoute } from 'astro';
import { siteBase } from '../utils/site';

const routes = ['', 'about/', 'safety/', 'projects/', 'contact/'];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://amon-f.github.io');
  const urls = routes
    .map((route) => `  <url><loc>${new URL(`${siteBase}${route}`, origin).href}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
