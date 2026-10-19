/** JSON-LD for a page. Copy comes from the page; this only wraps it. */
function structuredData(opts) {
  const kind = opts.kind;
  const publisher = { '@type': 'Organization', name: opts.siteName, url: opts.siteUrl };
  let nodes;
  if (kind === 'article') {
    nodes = [{
      '@type': 'Article',
      headline: opts.title,
      description: opts.description,
      inLanguage: opts.lang,
      mainEntityOfPage: opts.canonical,
      url: opts.canonical,
      image: opts.image,
      author: publisher,
      publisher,
    }];
  } else if (kind === 'journey') {
    nodes = [{
      '@type': 'WebSite',
      name: opts.siteName,
      url: opts.canonical,
      description: opts.description,
      inLanguage: opts.lang,
      publisher,
    }];
    const faqs = opts.faqs || [];
    if (faqs.length) {
      nodes.push({
        '@type': 'FAQPage',
        url: opts.canonical,
        inLanguage: opts.lang,
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      });
    }
  } else {
    nodes = [{
      '@type': 'WebPage',
      name: opts.title,
      description: opts.description,
      url: opts.canonical,
      inLanguage: opts.lang,
      isPartOf: { '@type': 'WebSite', name: opts.siteName, url: opts.siteUrl },
    }];
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

module.exports = { structuredData };
