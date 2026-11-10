// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project sites live under /<repository>/; account sites live at /.
const [owner, repository] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const isAccountSite = repository === `${owner}.github.io`;
const site = process.env.PUBLIC_SITE_URL ?? (owner ? `https://${owner}.github.io` : 'https://amon-f.github.io');

export default defineConfig({
  site,
  ...(!process.env.PUBLIC_SITE_URL && repository && !isAccountSite ? { base: `/${repository}` } : {}),
});
