import type { APIRoute } from 'astro';
import { siteBase } from '../utils/site';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://amon-f.github.io');
  const sitemap = new URL(`${siteBase}sitemap.xml`, origin);

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
