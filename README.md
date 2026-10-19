# Faith, Compared

Multi-language apologetics site for [comparereligion.com](https://comparereligion.com): worldview comparison, journey chapters, and sister essays on meaning and happiness.

**Purpose:** help readers understand what Christianity and other worldviews teach — clearly enough to evaluate claims and share the site.

## Architecture (Eleventy)

One shared shell + locale content. Build emits the same URL map as before (`/`, `/es/`, `/hi/`, …).

| Path | Role |
| --- | --- |
| `src/pages/<lang>/*.njk` | Page stubs (permalink + layout) |
| `src/_includes/content/<lang>/` | Locale body + nav fragments |
| `src/_includes/layouts/` | Shared journey / essay / stats shells |
| `src/_data/` | `site`, `locales`, `ui` chrome strings |
| `js/app.js`, `js/site.js`, `js/i18n/*` | Shared journey logic, mobile nav / SW, strings (Clarity track) |
| `src/assets/sw.js` → `/sw.js` | Single root service worker |
| `src/assets/js/religions/<lang>.js` | Per-locale religion data + modal (keeps `<picture>` / a11y) |
| `vendor/` | Stats libs with SRI |
| `_site/` | Build output (GitHub Pages artifact) |

Translators: see [CONTENT.md](./CONTENT.md).

## Develop locally

```bash
npm install
npm start          # http://localhost:8080
# or
npm run build && python3 -m http.server -d _site 8080
```

Verify: English + one locale home, `#/religions` tiles, philosophy/happiness/stats, phone-width nav drawer (Escape + focus return), only root `/sw.js`.

## Deploy (GitHub Pages)

`.github/workflows/pages.yml` runs `npm ci && npm run build` and publishes `_site` (includes `CNAME`).

**One-time:** Settings → Pages → Source → **GitHub Actions**.

## Cache bumps

Edit `cacheVersion` in `src/_data/site.js` and the `CACHE` / `SHELL` list in `src/assets/sw.js` (keep `styles.css?v=` in sync).

## Visitor notifications

Every page footer includes a “Check in / Ask a question” form, in all seven languages. Strings live in `src/_data/ui.js` (`notify`). Option **values** stay English so the inbox can match them: `check-in`, `question`, `share`, `comment`, `suggestion`.

The form is a normal HTML `POST` to [FormSubmit](https://formsubmit.co) at `aneesh@mail.grokbot.com`. There is no server and no paid service. The address is the public form recipient, not a credential.

| Field | Value |
| --- | --- |
| name, email | optional |
| `type` | `check-in`, `question`, `share`, `comment`, or `suggestion` |
| message | required |
| `page` | hidden URL of the page (the script updates it to the current URL, including the journey hash, on submit) |
| `_subject` | `comparereligion.com: <type>` |
| `_template` | `table` |
| `_captcha` | `true` (captcha on) |
| `_honey` | honeypot; leave empty |
| `_next` | thank-you page for that language (`/thanks.html`, `/es/thanks.html`, …) |

`js/site.js` copies the selected type into `_subject` before the browser posts, so the subject stays `comparereligion.com: <type>`.

**One-time activation.** The first submission to a new FormSubmit address sends an activation email to `aneesh@mail.grokbot.com`. That email has to be confirmed once. Until it is confirmed, FormSubmit does not deliver visitor messages. After confirmation, later submissions arrive as email with the subject above.

The journey’s chapter 12 comment form is unchanged and still posts with the existing AJAX endpoint in `js/app.js`.

## CI

- `pages.yml` — build + deploy
- `link-check.yml` — hash-link assertions + lychee on built `_site`
- `visitor-stats.yml` — GoatCounter → `data/countries.json` (commits only on material count changes)

## Images

Prefer WebP via `<picture>` / `image-set`. Do not recompress `img/` binaries in content PRs. See `img/credits.json`.

## License

See [LICENSE](LICENSE).
