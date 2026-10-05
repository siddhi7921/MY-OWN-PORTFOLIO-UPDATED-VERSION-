# Siddhinath Chakraborty Portfolio

A static personal portfolio for Siddhinath Chakraborty, a CSE (AI & ML) student at RCCIIT and AI Engineer in the Making. The site is built with HTML, CSS, and vanilla JavaScript; it has no package installation or build step.

## Run Locally

## Netlify Deployment

The deployable site files are in `public/`. `netlify.toml` sets that folder as the publish directory and disables the build command because this is a plain static site. Deploy the repository without installing packages or running a build. Netlify serves `public/index.html` at the site root; the original ZIP archive is not published.

Navigation and project case studies use URL fragments, so they do not require a catch-all redirect.

### Open the HTML directly

Open `public/index.html` in a browser. The portfolio content and interactions work without a server. Voice input depends on browser support and a secure context, so use localhost or HTTPS for that feature.

### Start a local server manually

From the project folder, run:

```powershell
python -m http.server 8001 --bind 127.0.0.1 --directory public
```

If your Python installation uses the Windows launcher, run `py -m http.server 8001 --bind 127.0.0.1 --directory public` instead. Then visit `http://127.0.0.1:8001/`.

## Portfolio Features

- Responsive profile, project, skills, education, achievement, resume, and contact sections.
- Seven featured projects, including the Nexora AI case study.
- Project filters and skill selectors that highlight related projects using existing project metadata.
- SITARA, a multilingual portfolio assistant with curated responses. It is not connected to a live LLM.
- Recruiter Mode, light/dark themes, and a Ctrl/Cmd+K command palette.
- Recent public GitHub repositories fetched from GitHub when available, with a fallback message if the request fails.
- A short, skippable introduction that remembers dismissal and respects reduced-motion preferences.

## Project Files

| File | Purpose |
| --- | --- |
| `public/index.html` | Portfolio structure, content, metadata, and local assets |
| `public/styles.css` | Responsive layout, themes, and visual styling |
| `public/main.js` | Project data, GitHub fetch, assistant, filters, themes, and navigation interactions |
| `smoke-test.js` | Static regression checks for portfolio content and behavior hooks |
| `netlify.toml` | Static-site publish directory and build settings |
| `public/profile.jpe` | Profile image and favicon |
| `public/about-profile.png` | About-section image |
| `public/Siddhinath_Chakraborty_ATS_Resume.docx` | Resume linked from the portfolio |

## Validation

Run these commands from the project folder:

```powershell
node smoke-test.js
node --check public/main.js
```
