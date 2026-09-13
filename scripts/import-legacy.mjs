#!/usr/bin/env node
/**
 * Import Clarity-track HTML into Eleventy content fragments.
 * Preserves #/ links, image-set, double honeypot, modal a11y markup in bodies.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const LOCALES = [
  { code: 'en', dir: '.', outDir: '', pageDir: 'en' },
  { code: 'es', dir: 'es', outDir: 'es', pageDir: 'es' },
  { code: 'hi', dir: 'hi', outDir: 'hi', pageDir: 'hi' },
  { code: 'ja', dir: 'ja', outDir: 'ja', pageDir: 'ja' },
  { code: 'ml', dir: 'ml', outDir: 'ml', pageDir: 'ml' },
  { code: 'ta', dir: 'ta', outDir: 'ta', pageDir: 'ta' },
  { code: 'zh', dir: 'zh', outDir: 'zh', pageDir: 'zh' },
];
const PAGES = [
  { file: 'index.html', kind: 'journey', fragment: 'index' },
  { file: 'philosophy.html', kind: 'essay', fragment: 'philosophy' },
  { file: 'happiness.html', kind: 'essay', fragment: 'happiness' },
  { file: 'stats.html', kind: 'stats', fragment: 'stats' },
];

function extractBetween(html, startTag, endTag) {
  const start = html.indexOf(startTag);
  const end = html.indexOf(endTag, start);
  if (start < 0 || end < 0) return null;
  return html.slice(start + startTag.length, end);
}

function extractMeta(html) {
  const title = (html.match(/<title>([^<]*)<\/title>/) || [, ''])[1].trim();
  const description = (html.match(/name="description"\s+content="([^"]*)"/) || [, ''])[1].trim();
  return { title, description };
}

function extractNavLinks(html) {
  const m = html.match(/<div class="nav-links"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/nav>/);
  return m ? m[1].trim() : null;
}

function extractJourneyMain(html) {
  const main = extractBetween(html, '<main>', '</main>');
  if (!main) throw new Error('missing <main>');
  return main.trim();
}

function extractEssayBody(html) {
  const afterNav = html.indexOf('</nav>');
  const mainEnd = html.indexOf('</main>');
  if (afterNav < 0 || mainEnd < 0) throw new Error('missing nav/main');
  return html.slice(afterNav + '</nav>'.length, mainEnd + '</main>'.length).trim();
}

function extractStatsBody(html) {
  const afterNav = html.indexOf('</nav>');
  const footer = html.indexOf('<footer>');
  if (afterNav < 0 || footer < 0) throw new Error('missing nav/footer');
  return html.slice(afterNav + '</nav>'.length, footer).trim();
}

function extractStatsStyles(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1].trim() : '';
}

function extractStatsInline(html) {
  const re = /<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
  let m, inline = '';
  while ((m = re.exec(html))) {
    const code = m[2].trim();
    if (code.includes('worldMap') || code.includes('countries.json')) inline = code;
  }
  return inline;
}

function toImageSet(fragment) {
  const wrap = (prefix, file, q) => {
    const quote = q || "'";
    const base = file.replace(/\.jpg$/i, '');
    return `${prefix}image-set(url(${quote}/img/${base}.webp${quote}) type('image/webp'), url(${quote}/img/${base}.jpg${quote}) type('image/jpeg'))`;
  };
  // Skip if already image-set
  if (fragment.includes('image-set(')) {
    // Still normalize ../img and img to /img inside existing image-set
    return fragment
      .replace(/url\((['"]?)\.\.\/img\//g, 'url($1/img/')
      .replace(/url\((['"]?)(?!\/)img\//g, 'url($1/img/');
  }
  return fragment
    .replace(
      /style="(--cimg:)url\((['"]?)(?:\.\.\/)?\/?img\/([a-z0-9_-]+)\.jpg\2\)"/gi,
      (_, pref, q, file) => `style="${wrap(pref, file + '.jpg', q || "'")}"`
    )
    .replace(
      /style="(background-image:)url\((['"]?)(?:\.\.\/)?\/?img\/([a-z0-9_-]+)\.jpg\2\)"/gi,
      (_, pref, q, file) => `style="${wrap(pref, file + '.jpg', q || "'")}"`
    );
}

function normalizeFragment(fragment) {
  fragment = fragment
    .replace(/(url\(['"]?)\.\.\/img\//g, '$1/img/')
    .replace(/(url\(['"]?)(?!\/)img\//g, '$1/img/')
    .replace(/(src(?:set)?=['"])\.\.\/img\//g, '$1/img/')
    .replace(/(src(?:set)?=['"])(?!\/)img\//g, '$1/img/')
    .replace(/(href=['"])\.\.\/index\.html/g, '$1/index.html')
    .replace(/fetch\(['"](?:\.\.\/)?data\/countries\.json['"]/g, "fetch('/data/countries.json'")
    .replace(/fetch\(['"](?:\.\.\/)?vendor\/countries-110m\.json['"]/g, "fetch('/vendor/countries-110m.json'")
    .replace(/src=['"](?:\.\.\/)?vendor\//g, 'src="/vendor/');
  return toImageSet(fragment);
}

function writePageStub(locale, page, meta) {
  const permalink = locale.outDir === '' ? `/${page.file}` : `/${locale.outDir}/${page.file}`;
  const layout =
    page.kind === 'journey' ? 'layouts/journey.njk' :
    page.kind === 'stats' ? 'layouts/stats.njk' :
    'layouts/essay.njk';
  const lines = [
    '---',
    `layout: ${layout}`,
    `locale: ${locale.code}`,
    `title: ${JSON.stringify(meta.title)}`,
    `description: ${JSON.stringify(meta.description)}`,
    `permalink: ${permalink}`,
  ];
  if (page.kind === 'essay') lines.push(`essay: ${page.fragment}`);
  if (page.kind === 'stats') lines.push('stats: true');
  lines.push('---', `{% include "content/${locale.code}/${page.fragment}.html" %}`, '');
  const out = path.join(ROOT, 'src/pages', locale.pageDir, page.file.replace('.html', '.njk'));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, lines.join('\n'));
}

function copyReligions(locale) {
  const srcFile = locale.code === 'en'
    ? path.join(ROOT, 'religions.js')
    : path.join(ROOT, locale.dir, 'religions.js');
  const dest = path.join(ROOT, 'src/assets/js/religions', `${locale.code}.js`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let body = fs.readFileSync(srcFile, 'utf8');
  // Preserve Clarity <picture>/srcset + modal a11y; absolute /img/ via __IMG
  body = body.replace(/(?:\.\.\/)?img\//g, '${__IMG()}');
  const code =
    `/* img paths: window.FC.imgBase (default /img/). Preserves Clarity picture/srcset + modal a11y. */\n` +
    `const __IMG = () => (window.FC && FC.imgBase) || '/img/';\n` +
    body;
  fs.writeFileSync(dest, code);
}

function main() {
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const srcPath = path.join(ROOT, locale.dir, page.file);
      if (!fs.existsSync(srcPath)) {
        console.warn('skip', srcPath);
        continue;
      }
      const html = fs.readFileSync(srcPath, 'utf8');
      const meta = extractMeta(html);
      let fragment =
        page.kind === 'journey' ? extractJourneyMain(html) :
        page.kind === 'stats' ? extractStatsBody(html) :
        extractEssayBody(html);
      fragment = normalizeFragment(fragment);

      const fragDir = path.join(ROOT, 'src/_includes/content', locale.code);
      fs.mkdirSync(fragDir, { recursive: true });
      fs.writeFileSync(path.join(fragDir, `${page.fragment}.html`), fragment + '\n');

      const nav = extractNavLinks(html);
      if (nav) fs.writeFileSync(path.join(fragDir, `nav-${page.fragment}.html`), nav + '\n');

      if (page.kind === 'stats' && locale.code === 'en') {
        fs.writeFileSync(path.join(ROOT, 'src/assets/stats.css'), extractStatsStyles(html) + '\n');
        let inline = extractStatsInline(html)
          .replace(/fetch\(['"](?:\.\.\/)?data\/countries\.json['"]/g, "fetch('/data/countries.json'")
          .replace(/fetch\(['"](?:\.\.\/)?vendor\/countries-110m\.json['"]/g, "fetch('/vendor/countries-110m.json'");
        // Strip SW registration — site.js owns it
        inline = inline.replace(/if\s*\('serviceWorker'[\s\S]*?\.catch\(\s*\(\)\s*=>\s*\{\s*\}\s*\);\s*/g, '');
        fs.writeFileSync(path.join(ROOT, 'src/assets/js/stats-map.js'), inline + '\n');
      }

      writePageStub(locale, page, meta);
      console.log('imported', locale.code, page.file);
    }
    copyReligions(locale);
  }

  // Styles: Clarity nav drawer CSS + absolute /img/ for hero image-set
  let css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
  css = css.replace(/url\('img\//g, "url('/img/").replace(/url\("img\//g, 'url("/img/');
  fs.writeFileSync(path.join(ROOT, 'src/assets/styles.css'), css);
  fs.copyFileSync(path.join(ROOT, 'manifest.webmanifest'), path.join(ROOT, 'src/assets/manifest.webmanifest'));
  fs.copyFileSync(path.join(ROOT, 'CNAME'), path.join(ROOT, 'src/assets/CNAME'));
  fs.copyFileSync(path.join(ROOT, 'robots.txt'), path.join(ROOT, 'src/assets/robots.txt'));
  fs.copyFileSync(path.join(ROOT, 'sitemap.xml'), path.join(ROOT, 'src/assets/sitemap.xml'));
  fs.copyFileSync(path.join(ROOT, 'sw.js'), path.join(ROOT, 'src/assets/sw.js'));

  console.log('done');
}

main();
