# Matxo Website

An Astro website for Matxo.

## Project structure

```text
public/
  images/
    logo/
    team/
    projects/
src/
  content/
    services/
    projects/
  components/
  layouts/
  pages/
    index.astro
    about.astro
    safety.astro
    projects.astro
    contact.astro
    services/
  styles/
    global.css
```

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build |

## Deploying a review site with GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
It builds the static site and publishes it to GitHub Pages whenever `main` or
`master` receives a push. The Astro configuration reads the repository name
from GitHub Actions and applies the correct Pages path automatically.

1. Create a GitHub repository for the website and push this project to its
   `main` or `master` branch. Keep `package-lock.json` in the repository.
2. In the repository, open **Settings → Pages** and select **GitHub Actions**
   as the build and deployment source.
3. Open **Actions** and wait for **Deploy to GitHub Pages** to complete.
   GitHub displays the live site address in the deployment environment and
   under **Settings → Pages**.

The review site will use the address format
`https://<github-owner>.github.io/<repository-name>/` for a regular repository.
A repository named `<github-owner>.github.io` uses the root address instead.
The first deployment usually takes a few minutes. Pushing later changes
updates the preview automatically.
