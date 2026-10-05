# Priority demo deployment status

No new live demo has been deployed or verified. Project cards intentionally do not link to nonexistent deployments.

## Access checked on October 5, 2026

Netlify site and account reads succeeded, and the portfolio's GitHub installation was visible. Creating a GitHub-linked Bible Devotional App site through both supported Netlify site-creation routes returned **401 Access Denied**. The currently available Netlify credential therefore did not authorize the necessary deployment operation. An existing portfolio installation is not evidence of GitHub write access to the other repositories.

Neither `HF_TOKEN` nor `HUGGING_FACE_HUB_TOKEN` was available, no cached Hugging Face token was present, and the site's secure environment-variable configuration contained no additional credentials. No connected credential resource was exposed. The public account `siddhinathchakraborty` had no existing Spaces when checked. The user's permission to connect accounts did not establish an authenticated connection in this environment.

## Fake News Detector

`fake-news-detector/` contains a Gradio wrapper adapted from the actual GitHub inference and preprocessing code. The user approved an explicitly labeled untrained prototype. Its UI and every analysis result disclose that the randomly initialized head cannot establish truth or credibility. It reports class activations, never a REAL/FAKE verdict.

Once a write-scoped Hugging Face connection supplies credentials through secure environment settings:

```sh
pip install huggingface_hub
python3 deployments/fake-news-detector/deploy.py
```

The script targets `siddhinathchakraborty/fake-news-detector-prototype`, uses the default free Gradio hardware, uploads only application files, waits for the runtime, and prints application and Space URLs only after the application passes an HTTP/content check. It does not change portfolio links automatically.

Tests do not download the model:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s deployments/fake-news-detector -p 'test_*.py'
```

## Web applications

- Nexora AI: `https://github.com/siddhi7921/Nexora-AI`, application in `project_sensial_ai/`. The source has a Node HTTP server with JSON-file persistence, and the frontend's API root points to localhost outside port 3000. Publishing its static folder alone would not deploy the application backend. A real Netlify port needs same-origin serverless routes and Netlify Database persistence; simply enabling its offline fallback is not a deployed backend.
- Bible Devotional App: `https://github.com/siddhi7921/bible-devotional-app`, source packaged in `bible-devotional-app.zip` under `bible-app/`. A GitHub-linked deployment needs archive extraction and a platform-side React build, publishing `bible-app/build`. Its existing Vercel homepage returned HTTP 404. The source's scripture chat calls Anthropic directly without authentication and requires a server-side integration before claiming live AI functionality. Prayer/bookmark state is currently session-only in the source.
- Tairaverse and Siddhiverse Exam Portal also contain source archives rather than normal deployable repository layouts. Sensitive environment files and repository metadata must be excluded from extraction and publishing. They remain lower priority.
- Student Performance has no verified hosted demo. No Phishing Detection repository was identified in the public GitHub account, and the portfolio has no matching card. No replacement project or fabricated predictor was invented.

## Publishing verified links

After an application is genuinely live, set the matching `featuredProjects` entry's `demo` value in `public/main.js` to its actual HTTPS URL. Both project-card renderers already generate Live Demo buttons for non-null values.

```sh
node scripts/verify-demo-links.mjs
node smoke-test.js
```

The verifier fails when no demos are configured or when an endpoint is unreachable, returns an error status, or serves a recognized hosting error page. A successful HTTP/content check is not a substitute for exercising the application's features in a browser.
