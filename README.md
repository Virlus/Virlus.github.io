# Wenye Yu's academic homepage

Live site: https://virlus.github.io/

Based on [My Scholar](https://github.com/mychiffonn/myscholar), using Astro, native CSS, Markdown, and BibTeX. The template's Apache 2.0 license is included in `LICENSE`; content and existing project assets retain their original ownership and licenses.

## Develop

Use Node.js 24 and pnpm 10.20.0 (the version pinned in `package.json`).

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

## Edit content

- Identity, social links, and navigation: `src/site.config.ts`
- Biography: `src/content/about.md`
- Papers: `src/content/publications/main.bib`
- News: `src/content/updates/YYYY-MM-01-description.md` (displayed at month precision)
- Honors, service, and interests: `src/content/honors.md`, `services.md`, and `misc.md`
- Profile photo: `src/assets/profile.jpg`

Publication fields `selected`, `image`, `imagealt`, `award`, and `previewvideo` control presentation. `authormarkers` preserves the original paper's author symbols using one-based positions, e.g. `1:*,2:*,8:†`. These fields do not appear in the exported citation. Keep full author names in the BibTeX `author` field.

## Existing project URLs

`armada/`, `mipnerf/`, `mipnerf360/`, `zipnerf/`, `images/`, and `data/` remain in their existing repository locations. `scripts/sync-legacy-assets.mjs` copies them to ignored `public/` directories before development or build. Edit the original root directories, not the generated copies. This preserves all published project and media URLs without duplicating assets in Git.

## Validate and publish

```sh
corepack pnpm format:check
corepack pnpm lint
corepack pnpm lint:styles
corepack pnpm test:markdown
corepack pnpm astro check
corepack pnpm build
corepack pnpm preview
```

Pushes to `master` build and deploy through `.github/workflows/deploy.yml`. GitHub Pages uses **GitHub Actions** as its source. There is no custom domain. Only `dist/` is published, and generated files are not committed.

The previous Jon Barron-based homepage remains available in Git history (commit `973c704`). The profile photograph is by Annie Wang.
