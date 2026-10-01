# Siddhinath Chakraborty Portfolio

A static personal portfolio for Siddhinath Chakraborty, a CSE (AI & ML) student at RCCIIT and AI Engineer in the Making. The site is built with HTML, CSS, and vanilla JavaScript; it has no package installation or build step.

## Run Locally

### Windows launcher

Double-click `start-portfolio.bat`. It serves the site at `http://127.0.0.1:8001/` when Python is available. If Python is unavailable or the server does not start, it opens `index.html` directly.

### Open the HTML directly

Open `index.html` in a browser. The portfolio content and interactions work without a server. Voice input depends on browser support and a secure context, so use localhost or HTTPS for that feature.

### Start a local server manually

From the project folder, run:

```powershell
python -m http.server 8001 --bind 127.0.0.1
```

If your Python installation uses the Windows launcher, run `py -m http.server 8001 --bind 127.0.0.1` instead. Then visit `http://127.0.0.1:8001/`.

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
| `index.html` | Portfolio structure, content, metadata, and local assets |
| `styles.css` | Responsive layout, themes, and visual styling |
| `main.js` | Project data, GitHub fetch, assistant, filters, themes, and navigation interactions |
| `smoke-test.js` | Static regression checks for portfolio content and behavior hooks |
| `start-portfolio.bat` | Windows launcher with a direct-file fallback |
| `profile.jpe` | Profile image and favicon |
| `about-profile.png` | About-section image |
| `Siddhinath_Chakraborty_ATS_Resume.docx` | Resume linked from the portfolio |

## Validation

Run these commands from the project folder:

```powershell
node smoke-test.js
node --check main.js
```
