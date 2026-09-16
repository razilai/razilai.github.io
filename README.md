# razilai.github.io

Personal site at <https://razilai.github.io> — [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages by GitHub Actions.

## Structure

- `src/data/cv.ts` — profile, education, tech stack
- `src/content/projects/*.md` — one Markdown file per project; frontmatter drives the home-page card, the body becomes `/projects/<file-name>/`
- `src/assets/projects/` — project images (optimized at build time)
- `src/pages/` — `index.astro`, `projects/[id].astro`, `404.astro`
- `src/components/`, `src/layouts/` — UI
- `public/` — static files (favicon)
- `.github/workflows/deploy.yml` — build + deploy on push to `main`

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # output in dist/
npm run preview   # serve the production build
```

## Deploy

One-time: repo Settings → Pages → Source: **GitHub Actions**. After that, every push to `main` deploys.
