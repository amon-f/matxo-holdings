// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project sites live under /<repository>/; account sites live at /.
const [owner, repository] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const isAccountSite = repository === `${owner}.github.io`;

export default defineConfig({
  ...(owner ? { site: `https://${owner}.github.io` } : {}),
  ...(repository && !isAccountSite ? { base: `/${repository}` } : {}),
});
