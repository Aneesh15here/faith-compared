const { structuredData } = require('./scripts/structured-data');

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addNunjucksGlobal('structuredData', structuredData);

  // Clarity-track shared assets (keep UX/SEO/SW behavior in lockstep with product-improvements)
  eleventyConfig.addPassthroughCopy('styles.css');
  eleventyConfig.addPassthroughCopy('sw.js');
  eleventyConfig.addPassthroughCopy('manifest.webmanifest');
  eleventyConfig.addPassthroughCopy('CNAME');

  eleventyConfig.addFilter('thanksPermalink', (code) =>
    code === 'en' ? '/thanks.html' : `/${code}/thanks.html`
  );

  eleventyConfig.addFilter('jsonld', (value) =>
    JSON.stringify(value)
      .replace(/</g, '\\u003c')
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
  );
  eleventyConfig.addPassthroughCopy({ 'js': 'js' });
  eleventyConfig.addPassthroughCopy('vendor');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('icons');
  eleventyConfig.addPassthroughCopy('data');

  eleventyConfig.addPassthroughCopy({ 'src/assets/stats.css': 'stats.css' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/js/stats-map.js': 'js/stats-map.js' });

  for (const lang of ['en', 'es', 'hi', 'ja', 'ml', 'ta', 'zh']) {
    const dest = lang === 'en' ? 'religions.js' : `${lang}/religions.js`;
    eleventyConfig.addPassthroughCopy({ [`src/assets/js/religions/${lang}.js`]: dest });
  }

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'html', 'md'],
    pathPrefix: '/',
  };
};
