const fs = require('fs');
const path = require('path');

const publicDirectory = path.join(__dirname, 'public');
const html = fs.readFileSync(path.join(publicDirectory, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(publicDirectory, 'main.js'), 'utf8');
const css = fs.readFileSync(path.join(publicDirectory, 'styles.css'), 'utf8');

const checks = [
  ['Netlify publishes the portfolio directory', /^\s*publish\s*=\s*"public"\s*$/m.test(fs.readFileSync(path.join(__dirname, 'netlify.toml'), 'utf8'))],
  ['local portfolio assets exist', ['profile.jpe', 'about-profile.png', 'Siddhinath_Chakraborty_ATS_Resume.docx'].every(filename => fs.existsSync(path.join(publicDirectory, filename)))],
  ['github-live section', html.includes('github-live')],
  ['portfolioKnowledge data', js.includes('portfolioKnowledge')],
  ['Nexora case study architecture', js.includes('caseStudyArchitecture') || js.includes('Nexora AI case study')],
  ['real OG image', !html.includes('example.com/og-image')],
  ['JPEG favicon declaration', html.includes('type="image/jpeg"') && html.includes('profile.jpe')],
  ['assistant open controller', js.includes('function setAssistantOpen')],
  ['assistant action links', js.includes('assistant-action-link')],
  ['hero project counts are data-backed', html.includes('data-featured-project-count') && js.includes('featuredProjects.length')],
  ['AI/ML count includes documented project categories', js.includes("category.includes('machine learning')") && js.includes("projectTechnologies(p).includes('AI / ML')")],
  ['Nexora showcase has capabilities and architecture', html.includes('nexora-capabilities') && html.includes('nexora-tech-tags')],
  ['SITARA is labeled as curated, not live LLM', html.includes('not connected to a live LLM')],
  ['skills connect to project metadata', html.includes('data-skill="Python"') && js.includes('updateProjectSkillHighlight')],
  ['verified education and milestone timeline', html.includes('career-timeline') && html.includes('College internal round qualified')],
  ['recruiter actions use existing destinations', html.includes('Siddhinath_Chakraborty_ATS_Resume.docx') && html.includes('https://www.linkedin.com/in/siddhinath-chakraborty-53177a335/')],
  ['command palette retains direct actions', html.includes('data-action="recruiter"') && html.includes('data-action="linkedin"') && html.includes('data-action="theme"')],
  ['project lab is visible', css.includes('.lab-section{display:block}')],
  ['intro is persistent and non-blocking by default', js.includes("localStorage.getItem('siddhinath-intro-seen')") && css.includes('.intro-screen{opacity:0;visibility:hidden;pointer-events:none')]
];

const failed = checks.filter(([, ok]) => !ok);

if (failed.length) {
  console.error('Smoke test failed:');
  failed.forEach(([name]) => console.error(` - ${name}`));
  process.exit(1);
}

console.log('Smoke test passed');
