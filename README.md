# Aman — marketing website

A standalone, static marketing site for **Aman**, community safety intelligence
for **every U.S. state and territory**, and its built-in AI assistant **Amanix**.

Built with plain HTML, CSS and JavaScript — **no framework, no build step**. It
deploys to any static host.

## Brand & palette

The UI is centered on the two brand logos:

- **Aman — the Eye of Horus** (`assets/aman-logo.png`)
- **Amanix — the Scarab** (`assets/amanix-logo.png`)

The design system pulls its colors straight from that artwork: Egyptian **gold**
and **sun-orange**, sacred **red**, and **royal blue**, set on a deep night-navy.
The accent gradient (headings, stat numbers, the scroll bar) is a "sunrise" sweep
of gold → orange → red — the sun disc and rays shared by both marks. Logos are
presented inside light "seal" medallions so the full-colour artwork reads cleanly
on the dark surface.

The two logo images live in `assets/aman-logo.png` (Horus eye) and
`assets/amanix-logo.png` (scarab) — see `assets/README.md`.

## Files

```
.
├── index.html       # all page markup (single page, anchored sections)
├── styles.css       # design system + all component styles
├── script.js        # nav toggle, scroll progress, reveal-on-scroll, count-up, spotlight
├── assets/
│   ├── aman-logo.png     # Horus-eye logo — Aman
│   ├── amanix-logo.png   # Scarab logo    — Amanix
│   └── README.md
└── README.md
```

## Run locally

It's static, so just open `index.html` — or serve the folder so relative paths
and fonts behave exactly like production:

```bash
python3 -m http.server 8080     # then visit http://localhost:8080
# or: npx serve .
```

## Deploy to GitHub Pages (quick start)

These files serve as-is. To put them on GitHub Pages, keep them at the repo
**root**, then in GitHub: **Settings → Pages → Source: Deploy from a branch →
Branch `main` / `/ (root)` → Save.** All asset links are relative, so it works
under a project subpath too.

### Other static hosts

- **Netlify** — drag-and-drop this folder, or set the publish directory to it.
- **Vercel** — import the repo; framework preset *Other*, output directory `.`.
- **S3 / CloudFront** — `aws s3 sync . s3://your-bucket --delete`.

## Wiring up the real app

Every "Launch app" / "Get started" / "Create free account" button is tagged with
`data-app-link` and currently points to `#`. Set its `href` to the Rails app URL
before going live (search `data-app-link` in `index.html`).

## Notes

- Fonts: **Space Grotesk** (headings) + **Inter** (body) via Google Fonts.
- Fully responsive; the nav collapses to a JS-toggled mobile menu.
- Accessible: semantic landmarks, alt text, ARIA labels, visible focus styles,
  and all animation (aurora, count-up, reveals) is disabled under
  `prefers-reduced-motion`.
- No external JavaScript dependencies.
