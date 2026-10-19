/**
 * Assert built HTML, sitemap, and robots carry the discoverability tags.
 * Run after `npm run build`.
 */
import fs from 'fs';
import path from 'path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const siteDir = path.join(root, '_site');
const host = fs.readFileSync(path.join(root, 'CNAME'), 'utf8').trim().replace(/\/.*$/, '');
const origin = 'https://' + host;
const pages = [
  'index.html',
  'philosophy.html',
  'happiness.html',
  'stats.html',
];
const locales = ['', 'es', 'hi', 'ja', 'ml', 'ta', 'zh'];
const errors = [];

function fail(msg) {
  errors.push(msg);
}

function read(rel) {
  return fs.readFileSync(path.join(siteDir, rel), 'utf8');
}

function attr(html, re) {
  const match = html.match(re);
  return match ? decode(match[1]) : '';
}

function decode(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function jpegSize(file) {
  const buf = fs.readFileSync(file);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc2) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

function headingSkips(html) {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '');
  const levels = [...body.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  const skips = [];
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] > levels[i - 1] + 1) skips.push(levels[i - 1] + '→' + levels[i]);
  }
  return { levels: levels.length, skips };
}

const titles = new Map();
const descriptions = new Map();

for (const locale of locales) {
  for (const page of pages) {
    const rel = path.posix.join(locale, page);
    const html = read(rel);
    const label = '/' + rel;
    const expectedLang = locale || 'en';
    if (!html.includes('<html lang="' + expectedLang + '"')) fail(label + ' lang should be ' + expectedLang);
    const title = attr(html, /<title>([^<]*)<\/title>/);
    const description = attr(html, /<meta name="description" content="([^"]*)"/);
    const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
    if (!title || title.length < 8) fail(label + ' missing title');
    if (title.includes('&amp;')) fail(label + ' double-escaped title');
    if (!description || description.length < 12) fail(label + ' description too short: ' + description);
    if (titles.has(title)) fail('duplicate title ' + title + ' on ' + label + ' and ' + titles.get(title));
    else titles.set(title, label);
    if (descriptions.has(description)) fail('duplicate description on ' + label + ' and ' + descriptions.get(description));
    else descriptions.set(description, label);
    if (!canonical.startsWith(origin + '/')) fail(label + ' canonical ' + canonical);
    if (canonical.includes('index.html') || canonical.includes('#')) fail(label + ' canonical should be a clean URL: ' + canonical);
    const expectedPath = (locale ? '/' + locale : '') + (page === 'index.html' ? '/' : '/' + page);
    if (canonical !== origin + expectedPath) fail(label + ' canonical mismatch ' + canonical + ' != ' + origin + expectedPath);
    for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt', 'og:type', 'og:locale']) {
      if (!html.includes('property="' + prop + '"')) fail(label + ' missing ' + prop);
    }
    for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
      if (!html.includes('name="' + name + '"')) fail(label + ' missing ' + name);
    }
    if (!html.includes('name="twitter:card" content="summary_large_image"')) fail(label + ' twitter card');
    if (!html.includes(origin + '/img/og.jpg')) fail(label + ' og image url');
    if (!html.includes('content="1200"') || !html.includes('content="630"')) fail(label + ' og dimensions');
    const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!ldMatch) fail(label + ' missing JSON-LD');
    else {
      const data = JSON.parse(ldMatch[1]);
      if (data['@context'] !== 'https://schema.org' || !Array.isArray(data['@graph']) || !data['@graph'].length) {
        fail(label + ' JSON-LD graph');
      } else {
        const types = data['@graph'].map((node) => node['@type']);
        if (page === 'index.html' && (!types.includes('WebSite') || !types.includes('FAQPage'))) {
          fail(label + ' expected WebSite and FAQPage, got ' + types.join(','));
        }
        if ((page === 'philosophy.html' || page === 'happiness.html') && !types.includes('Article')) {
          fail(label + ' expected Article, got ' + types.join(','));
        }
        if (page === 'stats.html' && !types.includes('WebPage')) {
          fail(label + ' expected WebPage, got ' + types.join(','));
        }
        const faq = data['@graph'].find((node) => node['@type'] === 'FAQPage');
        if (faq && (!faq.mainEntity || faq.mainEntity.length < 5)) fail(label + ' FAQ entries');
      }
    }
    if (!html.includes('rel="alternate" hreflang="x-default"')) fail(label + ' x-default');
    if (!html.includes('class="skip-link"')) fail(label + ' skip link');
    const headings = headingSkips(html);
    if (!headings.levels) fail(label + ' no headings');
    if (headings.skips.length) fail(label + ' heading skip ' + headings.skips.slice(0, 6).join(', '));
    if (page === 'index.html') {
      const route = html.match(/<script type="application\/json" id="route-seo">([\s\S]*?)<\/script>/);
      if (!route) fail(label + ' missing route seo');
      else {
        const routes = JSON.parse(route[1]);
        const keys = Object.keys(routes);
        if (keys.length !== 10) fail(label + ' route count ' + keys.length);
        const routeTitles = new Set(Object.values(routes).map((item) => item.title));
        if (routeTitles.size !== keys.length) fail(label + ' route titles not unique');
        for (const item of Object.values(routes)) {
          if (!item.title || !item.description || item.description.length < 12) fail(label + ' thin route meta ' + item.title);
        }
      }
    }
    if (html.includes('faithcompared.com')) fail(label + ' hardcoded faithcompared.com');
  }
}

const sitemap = read('sitemap.xml');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length !== locales.length * pages.length) fail('sitemap url count ' + locs.length);
const locSet = new Set(locs);
if (locSet.size !== locs.length) fail('sitemap duplicates');
for (const loc of locs) {
  if (!loc.startsWith(origin + '/')) fail('sitemap loc ' + loc);
}
if (!sitemap.includes('hreflang="x-default"')) fail('sitemap hreflang');
if (sitemap.includes('faithcompared.com')) fail('sitemap host');

const robots = read('robots.txt');
if (!robots.includes('Sitemap: ' + origin + '/sitemap.xml')) fail('robots sitemap line: ' + robots);
if (!robots.includes('Allow: /')) fail('robots allow');

const og = jpegSize(path.join(root, 'img/og.jpg'));
if (!og || og.width !== 1200 || og.height !== 630) fail('og.jpg size ' + JSON.stringify(og));
if (!fs.existsSync(path.join(siteDir, 'img/og.jpg'))) fail('og.jpg not copied to _site');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('SEO check OK:', titles.size, 'pages,', locs.length, 'sitemap URLs, host', origin);
