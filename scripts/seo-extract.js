/**
 * Pull route titles, descriptions, and FAQ pairs from existing locale HTML.
 * Text is the page's own copy, trimmed for meta tags — not new claims.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'src/_includes/content');
const LOCALES = ['en', 'es', 'hi', 'ja', 'ml', 'ta', 'zh'];
const ROUTES = [
  'religions',
  'compare',
  'islam',
  'evidence',
  'questions',
  'objections',
  'restoration',
  'atheism',
  'sources',
  'contact',
];

function decode(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, '&');
}

function strip(html) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(text, max) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  const base = (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[.,;:–—\-]+$/, '');
  return base + '…';
}

function sliceRoute(html, route) {
  const marker = `data-route="${route}"`;
  const start = html.indexOf(marker);
  if (start < 0) return '';
  const next = html.indexOf('data-route=', start + marker.length);
  return html.slice(start, next === -1 ? html.length : next);
}

function routeTitle(slice, brand) {
  const match = slice.match(/class="tb-title">([\s\S]*?)<\/h[12]>/);
  const raw = match ? strip(match[1]) : '';
  if (!raw) return '';
  if (raw.indexOf(brand) !== -1) return raw;
  return raw + ' — ' + brand;
}

function routeDescription(slice) {
  const head = slice.match(/class="section-head[\s\S]*?<p>([\s\S]*?)<\/p>/);
  const raw = head ? strip(head[1]) : '';
  return raw ? clip(raw, 160) : '';
}

function extractFaqs(html) {
  const out = [];
  const re = /<details class="(?:qa-card|acc-item)"[^>]*>([\s\S]*?)<\/details>/g;
  let match;
  while ((match = re.exec(html))) {
    const block = match[1];
    const sum = block.match(/<summary>([\s\S]*?)<\/summary>/);
    if (!sum) continue;
    const q = strip(sum[1].replace(/<span class="qn">[\s\S]*?<\/span>/gi, ''));
    const body = block.match(/<div class="(?:qa-body|acc-body)">([\s\S]*)$/);
    const a = body ? clip(strip(body[1]), 700) : '';
    if (q && a) out.push({ q, a });
  }
  return out;
}

function brandFor(locale) {
  const ui = require(path.join(ROOT, 'src/_data/ui.js'));
  return (ui[locale] && ui[locale].brandTitle) || ui.en.brandTitle;
}

function buildRouteMeta() {
  const meta = {};
  for (const locale of LOCALES) {
    const html = fs.readFileSync(path.join(CONTENT, locale, 'index.html'), 'utf8');
    const brand = brandFor(locale);
    meta[locale] = {};
    for (const route of ROUTES) {
      const slice = sliceRoute(html, route);
      const title = routeTitle(slice, brand);
      const description = routeDescription(slice);
      if (!title || !description) {
        throw new Error(`Missing route SEO for ${locale}/${route}`);
      }
      meta[locale][route] = { title, description };
    }
  }
  return meta;
}

function buildFaqs() {
  const faqs = {};
  for (const locale of LOCALES) {
    const html = fs.readFileSync(path.join(CONTENT, locale, 'index.html'), 'utf8');
    const items = extractFaqs(html);
    if (items.length < 5) {
      throw new Error(`Too few FAQs extracted for ${locale}: ${items.length}`);
    }
    faqs[locale] = items;
  }
  return faqs;
}

module.exports = { buildRouteMeta, buildFaqs, LOCALES, ROUTES };
