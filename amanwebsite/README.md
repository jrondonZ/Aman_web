# Aman — marketing website

A standalone, static marketing site for **Aman**, a community safety intelligence
platform for Connecticut, and its built-in AI assistant **Amanix**.

Built with plain HTML, CSS and JavaScript — **no framework, no build step**. It
deploys to any static host.

## Files

```
website/
├── index.html      # all page markup (single page, anchored sections)
├── styles.css      # design system + all component styles
├── script.js       # nav toggle, scroll progress, reveal-on-scroll, count-up, spotlight
├── assets/         # brand SVGs (copied from the Rails app)
│   ├── aman-mark.svg            # primary Aman globe logo
│   ├── aman-mark-white.svg      # white monochrome variant
│   ├── amanix-mark.svg          # Amanix neural-hexagon logo
│   └── amanix-mark-white.svg    # white monochrome variant
└── README.md
```

## Run locally

It's static, so just open `index.html` — or serve the folder so relative paths
and fonts behave exactly like production:

```bash
# Python
python3 -m http.server 8080 --directory website

# or Node
npx serve website
```

Then visit http://localhost:8080.

## Deploy to GitHub Pages (quick start)

These files are ready to serve as-is (note the included `.nojekyll`). To put them
on GitHub Pages, extract this folder at the **root** of a repo, then:

```bash
git init
git add .
git commit -m "Aman marketing site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → Branch `main` /
`/ (root)` → Save.** The site goes live at `https://<you>.github.io/<repo>/` within
a minute. All asset links are relative, so it works under a project subpath too.

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
  and all animation (radar, aurora, count-up, reveals) is disabled under
  `prefers-reduced-motion`.
- No external JavaScript dependencies.
