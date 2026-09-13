# Content & translation guide

Locales: `en`, `es`, `hi`, `ml`, `ta`, `zh`, `ja`.

## When English changes, update these

| What changed | Update |
| --- | --- |
| Journey / essay / stats body | `src/_includes/content/<lang>/…` |
| Nav link labels | `src/_includes/content/<lang>/nav-*.html` |
| Form / share / continue / mobile menu strings | `js/i18n/<lang>.js` (Clarity maps) and matching keys in `src/_data/ui.js` (footer/brand in layouts) |
| Religion profiles / compare lab | `src/assets/js/religions/<lang>.js` (build emits `/religions.js` or `/<lang>/religions.js`) |
| Shared behavior (router, drawer, SW) | `js/app.js`, `js/site.js`, root `sw.js` — **once for all languages** |

Shell/SEO/layouts are shared — fix once, rebuild, every language gets it.

## Adherent statistics freshness

Adherent figures in `religions/<lang>.js` (and any prose quoting them) are editorial estimates. Date the PR when bumping numbers; update every language. They are not live API data.

## Hash routes

Use `#/religions`, `#/compare`, … Legacy `#route` redirects in `js/app.js`.

## Images

Do not recompress `img/*`. Keep `<picture>` / `srcset` / `image-set` patterns from the image + Clarity tracks.
