const locales = require('./locales');

/** code → locale record. Nunjucks selectattr does not filter this list, so templates look up by code. */
const byCode = {};
for (const locale of locales) byCode[locale.code] = locale;

module.exports = byCode;
