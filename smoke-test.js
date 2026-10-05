const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/main.js', 'utf8');
const css = fs.readFileSync('public/styles.css', 'utf8');

const checks = [
  ['github-live section', html.includes('github-live')],
  ['portfolioKnowledge data', js.includes('portfolioKnowledge')],
  ['Nexora case study architecture', js.includes('caseStudyArchitecture') || js.includes('Nexora AI case study')],
  ['real OG image', !html.includes('example.com/og-image')],
  ['custom SVG favicon and Netlify social metadata', html.includes('type="image/svg+xml"') && html.includes('favicon.svg') && html.includes('https://siddhiteam.netlify.app/og-preview.png') && html.includes('https://siddhiteam.netlify.app/')],
  ['assistant open controller', js.includes('function setAssistantOpen')],
  ['assistant action links', js.includes('assistant-action-link')],
  ['recruiter hero has requested content and actions', html.includes('<h1>Siddhinath Chakraborty</h1>') && html.includes('I build AI agents &amp; full-stack AI products') && html.includes('B.Tech CSE (AI/ML) · RCCIIT \'28 · Kolkata, India') && html.includes('View Projects') && html.includes('>GitHub</a>') && html.includes('>Resume</a>')],
  ['hero includes a profile photo', html.includes('class="hero-visual profile-visual') && html.includes('src="profile.jpe"')],
  ['dedicated contact footer has all requested actions', html.includes('id="contact" class="contact-footer"') && html.includes('Let\'s build something together') && html.includes('Email Me') && html.includes('mailto:siddhinathchakraborty792@gmail.com')],
  ['AI/ML project categories feed card tags', js.includes("category.includes('machine learning')") && js.includes("technologies.push('AI / ML')") && js.includes('projectTechnologies(p).slice(0,3)')],
  ['Nexora case study keeps problem, approach, architecture, and result', html.includes('THE PROBLEM') && html.includes('THE APPROACH') && html.includes('class="arch-grid"') && html.includes('class="nexora-result"')],
  ['SITARA is labeled as curated, not live LLM', html.includes('not connected to a live LLM')],
  ['skills connect to project metadata', html.includes('data-skill="Python"') && js.includes('updateProjectSkillHighlight')],
  ['verified education and single SIH milestone', html.includes('career-timeline') && html.includes('B.Tech CSE (AI & ML)') && html.includes('SIH 2026 — Internal Round Qualified')],
  ['external-round note appears once in milestones', (html.match(/External round pending official confirmation/g) || []).length === 1 && !js.includes('External-round status pending official confirmation')],
  ['recruiter actions use existing destinations', html.includes('Siddhinath_Chakraborty_ATS_Resume.docx') && html.includes('https://www.linkedin.com/in/siddhinath-chakraborty-53177a335/')],
  ['command palette retains direct actions', html.includes('data-action="recruiter"') && html.includes('data-action="linkedin"') && html.includes('data-action="theme"')],
  ['project lab is visible', css.includes('.lab-section{display:block}')],
  ['selected project cards have demo or local-run paths and code', js.includes('▶ Live Demo') && js.includes('Local run only') && js.includes('&lt;/&gt; Code')],
  ['unavailable demo endpoints are not published as live links', !js.includes('streamlit.app') && !js.includes('ai-agent-sigma-ochre.vercel.app')],
  ['placeholder project and certification copy removed', !html.includes('SentinelX AI') && !js.includes('SentinelX AI') && !html.includes('Repository pending') && !html.includes('cert-placeholder') && !html.includes('COMING<br />IN NEXT')],
  ['project lab is curated to eight entries', js.includes("index:'08'") && html.includes('Selected projects / 08')],
  ['intro is persistent and non-blocking by default', js.includes("localStorage.getItem('siddhinath-intro-seen')") && css.includes('.intro-screen{opacity:0;visibility:hidden;pointer-events:none')]
];

const failed = checks.filter(([, ok]) => !ok);

if (failed.length) {
  console.error('Smoke test failed:');
  failed.forEach(([name]) => console.error(` - ${name}`));
  process.exit(1);
}

console.log('Smoke test passed');
