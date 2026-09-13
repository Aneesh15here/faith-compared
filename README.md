# Faith, Compared

Static multi-language site for [comparereligion.com](https://comparereligion.com): an apologetics-informed comparison of major worldviews, with a narrative journey, comparison lab, and sister essays on meaning and happiness.

**Purpose:** help readers understand what Christianity and other worldviews actually teach — clearly enough to evaluate claims and share the site with others.

Hosted as plain HTML/CSS/JS on GitHub Pages (`CNAME` → `comparereligion.com`). No build step required today.

## Layout

| Path | Role |
| --- | --- |
| `index.html` | English journey (hash routes `#/religions`, `#/compare`, …) |
| `philosophy.html`, `happiness.html`, `stats.html` | Sister pages |
| `es/`, `hi/`, `ja/`, `ml/`, `ta/`, `zh/` | Full locale copies |
| `styles.css` | Shared stylesheet (`?v=N` cache buster) |
| `religions.js` | Per-locale religion data + compare/modal UI |
| `js/app.js`, `js/site.js`, `js/i18n/*.js` | Shared journey logic, chrome (mobile nav / SW), strings |
| `sw.js` | Root service worker (all locales register `/sw.js`) |
| `img/` | Heroes and religion art (JPEG + WebP derivatives) |
| `vendor/` | Vendored stats-page libs (d3, topojson, world atlas) |

## Editing content

1. Prefer editing **English** first (`index.html` and sister pages), then mirror copy changes in each locale folder.
2. Religion profiles and the comparison lab live in each locale’s `religions.js`.
3. Quiz / share / contact UI strings live in `js/i18n/<lang>.js` — keep those in sync when you change button labels.
4. Journey chapter routes must use the `#/route` form (leading slash). Legacy `#route` links are redirected in `js/app.js`.

## Cache bumps (CSS / service worker)

When you change shared CSS or shell assets:

1. Bump `styles.css?v=N` in every HTML file that links it.
2. Bump `CACHE` in root `sw.js` (e.g. `faith-compared-v19` → `v20`) and the matching `styles.css?v=` entry in the `SHELL` list.
3. Locale `*/sw.js` files are thin stubs that `importScripts('/sw.js')` — do not maintain separate cache names there.

Activate only deletes other `faith-compared-*` caches, so visiting one language no longer wipes another.

## Contact form (FormSubmit)

The contact form posts to FormSubmit’s AJAX endpoint. Protections in the page:

- Hidden honeypot fields (`_honey`, `_gotcha`)
- Client-side required fields

**Operator checklist** (FormSubmit dashboard / email confirmation):

1. Confirm the FormSubmit email mapping for this site is activated.
2. Restrict submissions to `comparereligion.com` (and `www` if used) via FormSubmit’s domain allowlist if available on your plan.
3. Enable FormSubmit’s captcha option for this form when offered — no site backend is required.
4. Rotate the public form hash if abuse appears; update the URL in `js/app.js`.

## Analytics

GoatCounter (`comparereligion.goatcounter.com`) — cookie-light, no fingerprinting. The visitor map on `stats.html` reads `data/countries.json` (updated by `.github/workflows/visitor-stats.yml`).

## Images

Canonical files are `img/<id>.jpg` (≤1200w). Prefer WebP via `<picture>` / `image-set` (see `religions.js` and chapter `--cimg` / `.tb-img` styles). Do not recompress binaries casually — keep `img/credits.json` in sync when sources change.

## Local preview

Any static server from the repo root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`. Service worker and absolute `/sw.js` registration expect to be served from the site root.

## CI

`.github/workflows/link-check.yml` runs [lychee](https://github.com/lycheeverse/lychee) on HTML and asserts internal journey links use `#/…`.

## License

See [LICENSE](LICENSE).
