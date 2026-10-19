const fs = require('fs');
const path = require('path');

/**
 * Public origin for canonical, Open Graph, and sitemap URLs.
 * The host is the CNAME file (GitHub Pages). Change that one file to switch every generated URL.
 * Fallback matches the current CNAME if the file cannot be read.
 */
function originFromCname() {
  const fallback = 'comparereligion.com';
  try {
    const raw = fs.readFileSync(path.join(__dirname, '../../CNAME'), 'utf8');
    const host = raw.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
    return 'https://' + (host || fallback);
  } catch (err) {
    return 'https://' + fallback;
  }
}

module.exports = {
  name: 'Faith, Compared',
  url: originFromCname(),
  cacheVersion: '20',
  themeColor: '#0a0c14',
  goatcounter: 'https://comparereligion.goatcounter.com/count',
  formSubmit: 'https://formsubmit.co/ajax/3af65db5073e39fb154eb3268d8f0105',
  ogImage: '/img/og.jpg',
  ogImageAlt: 'Faith, Compared — seventeen worldviews, one honest comparison',
  ogImageWidth: 1200,
  ogImageHeight: 630,
};
