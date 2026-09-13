module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  // Clarity-track shared assets (keep UX/SEO/SW behavior in lockstep with product-improvements)
  eleventyConfig.addPassthroughCopy('styles.css');
  eleventyConfig.addPassthroughCopy('sw.js');
  eleventyConfig.addPassthroughCopy('manifest.webmanifest');
  eleventyConfig.addPassthroughCopy('robots.txt');
  eleventyConfig.addPassthroughCopy('sitemap.xml');
  eleventyConfig.addPassthroughCopy('CNAME');
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
