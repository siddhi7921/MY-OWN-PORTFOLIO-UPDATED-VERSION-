import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = await readFile(resolve(root, 'public/main.js'), 'utf8');
const boundary = source.indexOf('const projects =');
if (boundary < 0) throw new Error('Cannot locate the featured project configuration.');
const projects = vm.runInNewContext(`${source.slice(0, boundary)}\nfeaturedProjects;`, {}, { timeout: 1000 });
const demos = projects.filter(project => project.demo);
if (!demos.length) {
  console.error('No deployed demo URLs are configured. Verification failed; no live demos can be reported.');
  process.exitCode = 1;
}
for (const project of demos) {
  try {
    const url = new URL(project.demo);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Use a public HTTPS URL without credentials.');
    const response = await fetch(url, {
      signal: AbortSignal.timeout(30_000),
      headers: { 'User-Agent': 'portfolio-demo-verifier' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (new URL(response.url).protocol !== 'https:') throw new Error('Redirected to an insecure URL.');
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) throw new Error('Endpoint does not return an application page.');
    const body = await response.text();
    if (/DEPLOYMENT_NOT_FOUND|This Space is (?:sleeping|paused)|This app has gone to sleep|There isn.t a GitHub Pages site here|<title>[^<]*(?:404|not found|application error)/i.test(body)) {
      throw new Error('Hosting error or inactive application page.');
    }
    console.log(`${project.name}: ${response.url} — HTTP ${response.status}`);
  } catch (error) {
    console.error(`${project.name}: verification failed (${error.message}).`);
    process.exitCode = 1;
  }
}
