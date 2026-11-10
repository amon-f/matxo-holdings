import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const pages = [
  ['index.html', 'home'],
  ['about/index.html', 'about'],
  ['safety/index.html', 'safety'],
  ['projects/index.html', 'projects'],
  ['contact/index.html', 'contact'],
];

for (const [file, name] of pages) {
  const html = readFileSync(join(dist, file), 'utf8');
  assert.match(html, /<title>[^<]+<\/title>/, `${name} page should have a title`);
  assert.match(html, /<h1\b/, `${name} page should have a main heading`);
  assert.match(html, /property="og:title"/, `${name} page should have social metadata`);
}

const clientData = readFileSync(join(root, 'src/data/clients.ts'), 'utf8');
const expectedLogos = [...clientData.matchAll(/logo:\s*'([^']+\.webp)'/g)].map((match) => match[1]);
const home = readFileSync(join(dist, 'index.html'), 'utf8');
const renderedLogos = [...home.matchAll(/images\/clients\/([a-z0-9-]+\.webp)/gi)].map((match) => match[1]);

assert.ok(expectedLogos.length > 0, 'client data should include logos');
assert.deepEqual([...renderedLogos].sort(), [...expectedLogos].sort(), 'home page should render every listed client logo');
for (const logo of expectedLogos) {
  assert.ok(readdirSync(join(dist, 'images', 'clients')).includes(logo), `missing built client logo: ${logo}`);
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<url>/g) ?? []).length, pages.length, 'sitemap should include every page');
assert.match(readFileSync(join(dist, 'robots.txt'), 'utf8'), /Sitemap: .+sitemap\.xml/);

console.log(`Site smoke check passed: ${pages.length} pages, ${expectedLogos.length} client logos, sitemap, and robots.txt.`);
