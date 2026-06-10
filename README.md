# Brandon Kootnekoff — Music

Personal site for composer and music producer [Brandon Kootnekoff](https://brkootnekoff.github.io/Music/), built with [Gatsby](https://www.gatsbyjs.com/) and based on the [Blagor](https://github.com/Inroweb/Blagor) template.

**Live site:** https://brkootnekoff.github.io/Music/

## Features

- Home page with banner, profile photo, bio, audio player, and YouTube embed
- Blog, contact, and tag pages
- Theme UI styling
- Content editable via Markdown or the CMS admin UI

## Local development

**Prerequisites:** Node.js 16+ (Node 20 recommended)

```bash
git clone https://github.com/brkootnekoff/Music.git
cd Music
npm install
npm start
```

The dev server runs at http://localhost:8000/ (path prefix is not applied in development).

### Preview the production build

To test the site exactly as it appears on GitHub Pages:

```bash
npm run build
npm run serve
```

Open http://localhost:9000/Music/

## Deploy to GitHub Pages

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`). Pushing to `main` builds the site and publishes the `public/` folder.

### One-time setup

1. Push this repo to GitHub (e.g. `brkootnekoff/Music`).
2. In the repo on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Merge or push your changes to the `main` branch.

The workflow runs `npm ci` and `npm run build`, then deploys the output. You can also trigger a deploy manually from the **Actions** tab using **Run workflow**.

### Ongoing deploys

```bash
git checkout main
git merge your-feature-branch   # or commit directly on main
git push origin main
```

GitHub Actions will build and deploy automatically. Check progress under the **Actions** tab.

### Project site URL

This repo is configured as a **project site**, served at `/Music/`:

- `pathPrefix` is set in `gatsby-config.js`
- `siteUrl` is set in `src/util/site.json`
- Production builds use `gatsby build --prefix-paths`

If you rename the repository, update both `pathPrefix` and `siteUrl` to match the new repo name.

## Updating content

| What | Where |
|------|-------|
| Home page copy, images, audio, video | `src/content/pages/index.md` |
| Site title, SEO | `src/util/site.json` |
| Theme colors | `src/util/default-colors.json` |
| Navigation | `src/util/headerMenu.json` |
| Audio file | `static/assets/track.mp3` (or update path in `index.md`) |
| Blog posts | `src/content/posts/` |

The CMS admin UI is available at `/admin/` when running locally. It uses the GitHub backend — see the [Decap CMS docs](https://decapcms.org/docs/github-backend/) for authentication setup.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Production build (outputs to `public/`) |
| `npm run serve` | Serve the production build locally |
| `npm run clean` | Clear Gatsby cache |
| `npm run cms` | Run local CMS proxy for admin editing |

## License

MIT — based on [Blagor by Inroweb](https://github.com/Inroweb/Blagor).
