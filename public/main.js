const featuredProjects = [
  {id:'nexora-ai', index:'01', name:'Nexora AI', category:'AI / Project intelligence', filter:['AI / ML','AI Agents','Web Development'], description:'A project dashboard for task tracking, risk signals, and project-state visibility.', repo:'https://github.com/siddhi7921/Nexora-AI', demo:null, language:'JavaScript', caseTitle:'Nexora AI: project intelligence.', overview:'Project tracking and risk signals in one workspace.', details:[['Problem','Project health is scattered across tasks, updates, and intuition.'],['Approach','Bring project context together to surface risk and priorities.'],['Architecture','Context layer → project signals → assistant recommendations.'],['Result','A focused view of project state and next steps.']]},
  {id:'fake-news-detector', index:'02', name:'Fake News Detector', category:'ML / NLP', filter:['AI / ML','Python'], description:'A multilingual news classifier with credibility scoring for English, Hindi, and Bengali.', repo:'https://github.com/siddhi7921/fake_news_detector', demo:null, language:'Python'},
  {id:'ai-agent', index:'03', name:'AI-Agent', category:'AI agent / Voice AI', filter:['AI / ML','AI Agents'], description:'A voice-enabled assistant experiment with speech, retrieval, and conversational interaction.', repo:'https://github.com/siddhi7921/AI-Agent', demo:null, language:'TypeScript'},
  {id:'student-performance-prediction', index:'04', name:'Student Performance', category:'Machine learning / Education', filter:['AI / ML','Python','Education'], description:'A machine-learning project that predicts student outcomes from study habits and prior scores.', repo:'https://github.com/siddhi7921/Student-Performance-Prediction', demo:null, language:'Python'},
  {id:'siddhiverse-exam-companion', index:'05', name:'SIDDHIVERSE', category:'AI / Education', filter:['AI / ML','Education'], description:'An AI exam companion for generated practice, mock tests, and multilingual explanations.', repo:'https://github.com/siddhi7921/SIDDHIVERSE---AI-Exam-Companion', demo:null, language:'Python'},
  {id:'siddhiverse-exam-portal', index:'06', name:'Siddhiverse Exam Portal', category:'Education / Web application', filter:['Education','Web Development'], description:'An online examination application for the Siddhiverse learning experience.', repo:'https://github.com/siddhi7921/siddhiverse-exam-portal', demo:null, language:'Web app'},
  {id:'bible-devotional-app', index:'07', name:'Bible Devotional App', category:'AI / React application', filter:['AI / ML','Education','Web Development'], description:'A faith companion with readings, scripture chat, guided prayers, and a community prayer wall.', repo:'https://github.com/siddhi7921/bible-devotional-app', demo:null, language:'React'},
  {id:'tairaverse', index:'08', name:'Tairaverse', category:'Productivity / Career', filter:['Web Development'], description:'A focused workspace for organizing job applications, notes, and follow-ups.', repo:'https://github.com/siddhi7921/Tairaverse', demo:null, language:'Web app'}
];
const projects = featuredProjects.map(project=>({...project,tier:'Selected'}));
function projectTechnologies(project){
  const technologies=[...(project.filter||[]),project.language].filter(Boolean);
  const category=(project.category||'').toLowerCase();
  if(category.includes('ai')||category.includes('machine learning')||category.startsWith('ml /')) technologies.push('AI / ML');
  if(category.includes('agent')) technologies.push('AI Agents');
  if(project.id==='nexora-ai') technologies.push('JavaScript','AI','Dashboard');
  return [...new Set(technologies)];
}
let selectedSkill='';
function updateProjectSkillHighlight(skill=selectedSkill){
  selectedSkill=skill;
  const normalizedSkill=selectedSkill.toLowerCase();
  let matchedCards=0;
  document.querySelectorAll('.featured-card,.project-card,.github-repo-card').forEach(card=>{
    const technologies=(card.dataset.technologies||'').split('|').map(value=>value.toLowerCase());
    const matches=!normalizedSkill||technologies.includes(normalizedSkill);
    card.classList.toggle('skill-matched',Boolean(normalizedSkill)&&matches);
    card.classList.toggle('skill-dimmed',Boolean(normalizedSkill)&&!matches);
    if(matches&&normalizedSkill) matchedCards+=1;
  });
  document.querySelectorAll('.skill-chip').forEach(button=>{
    button.setAttribute('aria-pressed',String(button.dataset.skill.toLowerCase()===normalizedSkill));
  });
  const status=document.querySelector('.skill-match-status');
  if(status) status.textContent=normalizedSkill?`PROJECT SIGNAL / ${selectedSkill.toUpperCase()} · ${matchedCards} CARDS`:'PROJECTS / ALL';
}
const featuredGrid=document.querySelector('#featured-grid');
featuredGrid.innerHTML=featuredProjects.map(p=>`<article class="featured-card" data-project-id="${p.id}" data-technologies="${projectTechnologies(p).join('|')}"><h3>${p.name}</h3><p>${p.description}</p><div class="featured-tech-tags">${projectTechnologies(p).slice(0,3).map(technology=>`<span>${technology}</span>`).join('')}</div><div class="project-actions">${p.demo?`<a class="project-demo" href="${p.demo}" target="_blank" rel="noopener noreferrer">▶ Live Demo</a>`:'<span class="local-only">Local run only</span>'}<a class="project-code" href="${p.repo}" target="_blank" rel="noopener noreferrer">&lt;/&gt; Code</a></div></article>`).join('');
const allProjects=[...projects];
function renderProjects(filter='All'){
  const items=filter==='All'?allProjects:allProjects.filter(p=>projectTechnologies(p).some(technology=>technology.toLowerCase()===filter.toLowerCase())||p.category.toLowerCase().includes(filter.toLowerCase()));
  document.querySelector('#project-grid').innerHTML=items.map(p=>`<article class="project-card" data-project-id="${p.id}" data-technologies="${projectTechnologies(p).join('|')}"><h3>${p.name}</h3><p>${p.description}</p><div class="featured-tech-tags">${projectTechnologies(p).slice(0,3).map(technology=>`<span>${technology}</span>`).join('')}</div><div class="project-actions">${p.demo?`<a class="project-demo" href="${p.demo}" target="_blank" rel="noopener noreferrer">▶ Live Demo</a>`:'<span class="local-only">Local run only</span>'}<a class="project-code" href="${p.repo}" target="_blank" rel="noopener noreferrer">&lt;/&gt; Code</a></div></article>`).join('');
}
renderProjects();
updateProjectSkillHighlight();
document.querySelectorAll('.skill-chip').forEach(button=>button.addEventListener('click',()=>updateProjectSkillHighlight(button.dataset.skill===selectedSkill?'':button.dataset.skill)));
document.addEventListener('click',event=>{
  const projectCard=event.target.closest('.featured-card,.project-card,.github-repo-card');
  if(!projectCard)return;
  const technology=(projectCard.dataset.technologies||'').split('|').find(Boolean);
  if(technology)updateProjectSkillHighlight(technology);
});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(filterButton=>{
    const active=filterButton===button;
    filterButton.classList.toggle('active',active);
    filterButton.setAttribute('aria-pressed',String(active));
  });
  renderProjects(button.dataset.filter);
  updateProjectSkillHighlight();
}));
const modal=document.querySelector('#case-study');
let caseReturnFocus=null;
function openCase(id){const p=featuredProjects.find(item=>item.id===id);if(!p)return;caseReturnFocus=document.activeElement;updateProjectSkillHighlight(p.filter?.[0]||'');document.querySelector('#case-content').innerHTML=`<p class="case-kicker">Case study / ${p.index} - ${p.category}</p><h2>${p.caseTitle}</h2><p class="case-summary">${p.overview}</p><div class="case-grid">${p.details.map(([title,text])=>`<div class="case-block"><h4>${title}</h4><p>${text}</p></div>`).join('')}</div>${p.repo?`<a class="case-repo" href="${p.repo}" target="_blank" rel="noreferrer">Open GitHub repository <span>-&gt;</span></a>`:'<span class="case-repo">Project under development</span>'}`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('.case-close')?.focus()}
function closeCase(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';if(location.hash.startsWith('#/project/'))history.replaceState(null,'','#work');if(caseReturnFocus?.isConnected)caseReturnFocus.focus();caseReturnFocus=null}
function route(){const match=location.hash.match(/^#\/project\/(.+)$/);if(match)openCase(match[1]);else if(modal.classList.contains('open'))closeCase()}
document.addEventListener('click',e=>{const caseTrigger=e.target.closest('[data-case]');if(caseTrigger){const target=caseTrigger.dataset.case;openCase(target);return;}if(e.target.closest('.case-close')||e.target.classList.contains('case-backdrop'))closeCase()});window.addEventListener('hashchange',route);route();
const nexoraSection=document.querySelector('#nexora-case-study');
const currentFocusSection=document.querySelector('.focus-section');
if(nexoraSection&&currentFocusSection)currentFocusSection.after(nexoraSection);

async function fetchGitHubRepos(){
  const container=document.getElementById('github-repo-grid');
  if(!container) return;

  const endpoint='https://api.github.com/users/siddhi7921/repos?sort=updated&per_page=6';
  try {
    const response=await fetch(endpoint, {headers:{Accept:'application/vnd.github+json'}});
    if(!response.ok) throw new Error('GitHub API request failed');
    const repos=await response.json();
    if(!Array.isArray(repos)||!repos.length){
      container.innerHTML='<p class="repo-empty">GitHub data is temporarily unavailable.</p>';
      return;
    }

    const visibleRepos=repos.filter(repo=>!repo.fork && repo.name).slice(0,6);
    container.innerHTML=visibleRepos.map(repo=>`<article class="github-repo-card"><h3>${repo.name}</h3><p>${repo.description || 'Public repository from Siddhinath Chakraborty\'s GitHub profile.'}</p><div class="project-actions"><span class="local-only">Local run only</span><a class="project-code" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">&lt;/&gt; Code</a></div></article>`).join('');
    container.querySelectorAll('.github-repo-card').forEach((card,index)=>{card.dataset.technologies=visibleRepos[index]?.language||''});
    updateProjectSkillHighlight();
  } catch (error) {
    container.innerHTML='<p class="repo-empty">GitHub data could not be loaded right now, but the direct GitHub profile remains available.</p>';
  }
}

fetchGitHubRepos();

const portfolioKnowledge={
  profile:{
    name:'Siddhinath Chakraborty',
    role:'AI Engineer in the Making',
    degree:'B.Tech CSE (AI & ML)',
    college:'RCCIIT',
    cohort:'RCCIIT 2028',
    location:'Kolkata, West Bengal, India',
    email:'siddhinathchakraborty792@gmail.com',
    github:'https://github.com/siddhi7921',
    linkedin:'https://www.linkedin.com/in/siddhinath-chakraborty-53177a335/',
    instagram:'https://www.instagram.com/siddhinathchakraborty423/'
  },
  projects:[
    {name:'Nexora AI', summary:'Project intelligence dashboard with project-state visibility, task signals, and a data-aware assistant.', tags:['AI / ML','AI Agents','Web Development']},
    {name:'SITARA', summary:'An ongoing AI-agent project focused on planning, tool-use, and workflow-oriented assistance.', tags:['AI / ML','AI Agents']},
    {name:'SIDDHIVERSE AI Exam Companion', summary:'AI-supported exam preparation and learning workflow for educational use.', tags:['AI / ML','Education']},
    {name:'AI-Agent', summary:'Voice and conversational assistant experiment with speech and retrieval-oriented behavior.', tags:['AI / ML','AI Agents']},
    {name:'Student Performance Prediction', summary:'Machine learning project for educational performance prediction.', tags:['AI / ML','Python']},
    {name:'Fake News Detector', summary:'Multilingual fake-news classification with credibility scoring.', tags:['AI / ML','Python']}
  ],
  focus:['AI systems','Machine learning','Generative AI','LLM applications','RAG','AI agents','Full-stack development','Python','FastAPI','React'],
  resume:{title:'Siddhinath Chakraborty', tagline:'CSE (AI & ML) - RCCIIT 2028'},
  caseStudyArchitecture:'Context layer -> project signals -> assistant recommendations'
};

const assistantLauncher=document.querySelector('.assistant-launcher');
const assistantPanel=document.querySelector('#portfolio-assistant');
const assistantClose=document.querySelector('.assistant-close');
const assistantMessages=document.querySelector('#assistant-messages');
const assistantForm=document.querySelector('#assistant-form');
const assistantInput=document.querySelector('#assistant-input');
const assistantLanguage=document.querySelector('#assistant-language');
const assistantVoice=document.querySelector('#assistant-voice');
const assistantKnowledge={
  name:'Siddhinath Chakraborty',
  intro:'Siddhinath Chakraborty is a B.Tech Computer Science and Engineering student specialising in Artificial Intelligence and Machine Learning at RCCIIT, graduating with the RCCIIT 2028 cohort.',
  focus:'His focus includes artificial intelligence, machine learning, generative AI, LLM applications, RAG, AI agents, full-stack development, and intelligent automation.',
  projects:'His selected projects include Nexora AI, Fake News Detector, AI-Agent, Student Performance Prediction, and SIDDHIVERSE AI Exam Companion.',
  journey:'His learning journey moves from programming and web development to machine learning, AI applications, generative AI, AI agents, intelligent systems, and Smart India Hackathon 2026.',
  contact:'You can connect with Siddhinath by email at siddhinathchakraborty792@gmail.com, through GitHub at github.com/siddhi7921, LinkedIn at linkedin.com/in/siddhinath-chakraborty-53177a335, or Instagram at instagram.com/siddhinathchakraborty423.',
  achievement:'Siddhinath and his team qualified the Smart India Hackathon 2026 internal round at their college.'
};
const assistantTranslations={
  'bn-IN':{
    greeting:'হাই! আমি সিদ্দিনাথের পোর্টফোলিও এআই অ্যাসিস্ট্যান্ট। আমি তার ব্যাকগ্রাউন্ড, স্কিল, প্রজেক্ট, জার্নি এবং যোগাযোগের তথ্য বুঝতে পারি।',
    name:'সিদ্দিনাথ চক্রবর্তী RCCIIT-এ B.Tech Computer Science এবং AI & ML-এ পড়ছেন, RCCIIT 2028 ব্যাচের ছাত্র।',
    focus:'তার ফোকাসে Artificial Intelligence, Machine Learning, Generative AI, LLM, RAG, AI Agents, Full-Stack Development এবং Intelligent Automation রয়েছে।',
    projects:'তার নির্বাচিত প্রোজেক্টগুলো হল Nexora AI, Fake News Detector, AI-Agent, Student Performance Prediction এবং SIDDHIVERSE AI Exam Companion।',
    journey:'তার শেখার যাত্রা Programming থেকে Web Development, তারপর Machine Learning, AI Applications, Generative AI, AI Agents, Intelligent Systems এবং Smart India Hackathon 2026 পর্যন্ত বিস্তৃত।',
    contact:'ইমেল: siddhinathchakraborty792@gmail.com। GitHub, LinkedIn এবং Instagram লিংক Contact section-এ আছে।',
    achievement:'সিদ্দিনাথ এবং তার টিম Smart India Hackathon 2026-এর internal round-এ qualify হয়েছে।',
    fallback:'আমি সিদ্দিনাথের ব্যাকগ্রাউন্ড, স্কিল, প্রজেক্ট, জার্নি, অর্জন, এবং যোগাযোগের তথ্য সম্পর্কে বলতে পারি। অন্যভাবে জিজ্ঞেস করুন।'
  },
  'hi-IN':{
    greeting:'नमस्ते! मैं सिद्दिनाथ के पोर्टफोलियो एआई सहायक हूँ। मैं उसके बैकग्राउंड, कौशल, प्रोजेक्ट, यात्रा, और संपर्क जानकारी में मदद कर सकता हूँ।',
    name:'सिद्दिनाथ चक्रवर्ती RCCIIT में B.Tech Computer Science और AI & ML में पढ़ रहे हैं, RCCIIT 2028 बैच के छात्र हैं।',
    focus:'उनका फोकस Artificial Intelligence, Machine Learning, Generative AI, LLM, RAG, AI Agents, Full-Stack Development और Intelligent Automation पर है।',
    projects:'उनके चुने हुए प्रोजेक्ट्स Nexora AI, Fake News Detector, AI-Agent, Student Performance Prediction और SIDDHIVERSE AI Exam Companion हैं।',
    journey:'उनकी सीखने की यात्रा Programming और Web Development से शुरू होकर Machine Learning, AI Applications, Generative AI, AI Agents, Intelligent Systems और Smart India Hackathon 2026 तक पहुँची है।',
    contact:'ईमेल: siddhinathchakraborty792@gmail.com। GitHub, LinkedIn और Instagram लिंक Contact section में उपलब्ध हैं।',
    achievement:'सिद्दिनाथ और उनकी टीम ने Smart India Hackathon 2026 के internal round में क्वालिफाई किया।',
    fallback:'मैं सिद्दिनाथ के बैकग्राउंड, कौशल, प्रोजेक्ट, यात्रा, उपलब्धि, और संपर्क जानकारी के बारे में बता सकता हूँ। किसी अन्य तरीके से पूछें।'
  }
};
function assistantLanguagePack(){return assistantTranslations[assistantLanguage.value]||{greeting:"Hi! I am Siddhinath's portfolio assistant. Ask me about his background, skills, projects, journey, or contact details.",name:assistantKnowledge.intro,focus:assistantKnowledge.focus,projects:assistantKnowledge.projects,journey:assistantKnowledge.journey,contact:assistantKnowledge.contact,achievement:assistantKnowledge.achievement,fallback:"I can explain Siddhinath's profile, skills, projects, journey, achievement, and contact details. Try asking in another way."}}
function addAssistantMessage(text,type='bot'){const message=document.createElement('div');message.className=`assistant-message ${type}`;message.textContent=text;assistantMessages.appendChild(message);assistantMessages.scrollTop=assistantMessages.scrollHeight}
function getKnowledgeAnswer(question){
  const text=question.toLowerCase();
  if(/architect|context layer|workflow|how does nexora|nexora.*work/.test(text)){
    return 'Nexora is framed around a context layer, project signals, and assistant recommendations: tasks and notes become structured signals, risk and priority cues make project state legible, and the assistant turns that context into guidance. Detailed implementation claims remain grounded in the repository.';
  }
  if(/nexora|project intelligence|project health|risk|priority|smart dashboard/.test(text)){
    return 'Nexora AI is a flagship project focused on project-state visibility and intelligent decision support. Its direction is to combine project signals, risk cues, and an assistant layer so teams can understand what needs attention before a problem grows.';
  }
  if(/machine learning|\bml\b|prediction|phishing|fake news/.test(text)){
    return 'The portfolio highlights Student Performance Prediction and Fake News Detector as machine-learning projects. Their datasets, models, and evaluation details are documented in their repositories.';
  }
  if(/currently building|what.*building|working on|now building/.test(text)){
    return 'The current build focus is Nexora AI as the flagship project, while SITARA remains the longer-horizon AI-agent direction. The portfolio assistant demonstrates the smaller, knowledge-grounded version of that idea.';
  }
  if(/sitara|agent|assistant/.test(text)){
    return 'SITARA is the name of the curated portfolio assistant available here. Its answers come from portfolio information rather than a live LLM.';
  }
  if(/github|repo|repository|projects/.test(text)){
    return 'Siddhinath has a public GitHub profile with multiple repositories spanning AI, web development, education, cybersecurity, and experiments. The live portfolio fetches a subset of those repositories to stay aligned with the current public code trail.';
  }
  return null;
}
function assistantReply(question){const text=question.toLowerCase();const pack=assistantLanguagePack();const knowledgeAnswer=getKnowledgeAnswer(question);if(knowledgeAnswer){return knowledgeAnswer;}if(/who|about|কে|कौन|परिचय|siddhinath|सिद्धिनाथ/.test(text))return assistantLanguage.value==='en-IN'?assistantKnowledge.intro:pack.name;if(/skill|technology|stack|tech|দক্ষতা|কৌशल|तकनीक/.test(text))return assistantLanguage.value==='en-IN'?assistantKnowledge.focus:pack.focus;if(/project|build|work|প্রজেক্ট|পরियोजना|काम/.test(text))return assistantLanguage.value==='en-IN'?assistantKnowledge.projects:pack.projects;if(/journey|learn|career|पथ|यात्रा|सीख|यात्रा/.test(text))return assistantLanguage.value==='en-IN'?assistantKnowledge.journey:pack.journey;if(/contact|email|github|linkedin|যোগাযোগ|संपर्क/.test(text))return assistantLanguage.value==='en-IN'?assistantKnowledge.contact:pack.contact;if(/hackathon|sih|achievement|অর্জন|উपलब्धि/.test(text))return assistantLanguage.value==='en-IN'?assistantKnowledge.achievement:pack.achievement;return pack.fallback}
function speakAssistant(text){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang=assistantLanguage.value;window.speechSynthesis.speak(utterance)}
assistantLauncher.addEventListener('click',()=>setAssistantOpen(!assistantPanel.classList.contains('open')));
assistantClose.addEventListener('click',()=>setAssistantOpen(false));
assistantForm.addEventListener('submit',event=>{event.preventDefault();sendAssistantQuestion(assistantInput.value);assistantInput.value=''});
assistantForm.querySelector('button[type="submit"]')?.addEventListener('click',event=>{event.preventDefault();sendAssistantQuestion(assistantInput.value);assistantInput.value=''});
document.querySelectorAll('.assistant-suggestions button').forEach(button=>button.addEventListener('click',()=>sendAssistantQuestion(button.dataset.question)));
assistantLanguage.addEventListener('change',()=>{assistantMessages.innerHTML='';addAssistantMessage(assistantLanguagePack().greeting)});
const speechSupport = (() => {
  const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionCtor) return { supported: false, message: 'Voice input is not supported in this browser.' };
  if (!window.isSecureContext && location.protocol === 'file:') return { supported: false, message: 'Voice input requires a secure context. Run the site via localhost or HTTPS.' };
  return { supported: true, Recognition: SpeechRecognitionCtor, message: '' };
})();

if (speechSupport.supported) {
  const recognition = new speechSupport.Recognition();
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  assistantVoice.addEventListener('click', () => {
    try {
      recognition.lang = assistantLanguage.value;
      recognition.start();
      assistantVoice.textContent = 'Listening...';
      assistantVoice.disabled = true;
    } catch (error) {
      assistantVoice.textContent = 'Retry';
      assistantVoice.disabled = false;
      addAssistantMessage('Voice input is busy. Please try again in a moment.');
    }
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    assistantInput.value = transcript;
    sendAssistantQuestion(transcript);
    assistantInput.value = '';
  });

  recognition.addEventListener('error', () => {
    assistantVoice.textContent = 'Speak';
    assistantVoice.disabled = false;
    addAssistantMessage('Voice input could not understand the audio. Please try again or type your question.');
  });

  recognition.addEventListener('end', () => {
    assistantVoice.textContent = 'Speak';
    assistantVoice.disabled = false;
  });
} else {
  assistantVoice.disabled = true;
  assistantVoice.title = speechSupport.message;
  assistantVoice.textContent = 'Voice unavailable';
}

const themeToggle=document.getElementById('theme-toggle');
const recruiterToggle=document.getElementById('recruiter-mode-toggle');
function handleAssistantAction(question){
  const text=question.toLowerCase();
  if(/recruiter (mode|view)/.test(text)){
    setRecruiterMode(true);
    recruiterSummary?.scrollIntoView({behavior:'smooth',block:'start'});
    return 'Recruiter view is active, with education, projects, achievements, and contact links at the top.';
  }
  if(/show|open|visit|go to/.test(text)&&/github|repo|repository/.test(text)){
    return {text:'Here is Siddhinath\'s GitHub profile:',label:'Open GitHub profile',url:'https://github.com/siddhi7921'};
  }
  if(/show|open|download|view/.test(text)&&/resume|cv/.test(text)){
    return {text:'Here is the ATS resume:',label:'Open resume',url:'Siddhinath_Chakraborty_ATS_Resume.docx'};
  }
  if(/open|go to|show/.test(text)&&/nexora/.test(text)){
    document.querySelector('#nexora-case-study')?.scrollIntoView({behavior:'smooth'});
    return 'Taking you to the Nexora AI case study.';
  }
  return null;
}
function sendAssistantQuestion(question){
  const clean=question.trim();
  if(!clean)return;
  addAssistantMessage(clean,'user');
  const action=handleAssistantAction(clean);
  const reply=action||assistantReply(clean);
  window.setTimeout(()=>{
    addAssistantMessage(reply.text||reply);
    if(action?.url){
      const link=document.createElement('a');
      link.className='assistant-action-link';
      link.href=action.url;
      link.target='_blank';
      link.rel='noopener noreferrer';
      link.textContent=action.label;
      assistantMessages.appendChild(link);
    }
    speakAssistant(reply.text||reply);
  },180);
}
function setAssistantOpen(open){
  assistantPanel.classList.toggle('open',open);
  assistantPanel.setAttribute('aria-hidden',String(!open));
  assistantLauncher.setAttribute('aria-expanded',String(open));
  if(open){
    if(!assistantMessages.children.length)addAssistantMessage(assistantLanguagePack().greeting);
    assistantInput.focus();
  }else{
    assistantLauncher.focus();
  }
}
const commandPalette=document.getElementById('command-palette');
const commandPaletteTrigger=document.getElementById('command-palette-trigger');
const commandInput=document.getElementById('command-input');
const recruiterSummary=document.getElementById('recruiter-summary');

function applyTheme(theme){
  const resolved=theme==='light'?'light':'dark';
  document.body.dataset.theme=resolved;
  if(themeToggle){
    themeToggle.textContent=resolved==='dark'?'Light':'Dark';
    themeToggle.setAttribute('aria-label', resolved==='dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  localStorage.setItem('portfolio-theme', resolved);
}

function toggleTheme(){
  const next=document.body.dataset.theme==='light'?'dark':'light';
  applyTheme(next);
}

function setRecruiterMode(active){
  document.body.classList.toggle('recruiter-mode', active);
  recruiterSummary.hidden = !active;
  if(recruiterToggle){
    recruiterToggle.textContent = active ? 'Recruiter Mode' : 'Developer Mode';
    recruiterToggle.setAttribute('aria-label',active?'Switch to Developer Mode':'Switch to Recruiter Mode');
    recruiterToggle.setAttribute('aria-pressed',String(active));
  }
}

function openCommandPalette(){
  if(!commandPalette) return;
  commandPalette.classList.add('open');
  commandPalette.setAttribute('aria-hidden','false');
  requestAnimationFrame(()=>commandInput && commandInput.focus());
}

function closeCommandPalette(){
  if(!commandPalette) return;
  commandPalette.classList.remove('open');
  commandPalette.setAttribute('aria-hidden','true');
}

if(themeToggle){
  const savedTheme=localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);
  themeToggle.addEventListener('click', toggleTheme);
}

if(recruiterToggle){
  setRecruiterMode(false);
  recruiterToggle.addEventListener('click', ()=> setRecruiterMode(!document.body.classList.contains('recruiter-mode')));
}

if(commandPaletteTrigger){
  commandPaletteTrigger.addEventListener('click', openCommandPalette);
}

if(commandPalette){
  commandPalette.addEventListener('click', (event)=>{
    if(event.target === commandPalette) closeCommandPalette();
  });
}

document.querySelectorAll('.command-options button').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const selector=button.dataset.target;
    const action=button.dataset.action;
    if(action==='github'||action==='linkedin'){
      const url=action==='github'?'https://github.com/siddhi7921':'https://www.linkedin.com/in/siddhinath-chakraborty-53177a335/';
      window.open(url,'_blank','noopener,noreferrer');
      closeCommandPalette();
      return;
    }
    if(action==='recruiter'){
      const active=!document.body.classList.contains('recruiter-mode');
      setRecruiterMode(active);
      if(active) recruiterSummary.scrollIntoView({behavior:'smooth',block:'nearest'});
      closeCommandPalette();
      return;
    }
    if(action==='theme'){
      toggleTheme();
      closeCommandPalette();
      return;
    }
    if(selector==='#portfolio-assistant'){
      closeCommandPalette();
      setAssistantOpen(true);
      return;
    }
    if(selector){
      const target=document.querySelector(selector);
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
    closeCommandPalette();
  });
});

if(commandInput){
  commandInput.addEventListener('input', (event)=>{
    const value=event.target.value.trim().toLowerCase();
    document.querySelectorAll('.command-options button').forEach((button)=>{
      const text=button.textContent.toLowerCase();
      button.style.display = value && !text.includes(value) ? 'none' : '';
    });
  });
}

document.addEventListener('keydown', (event)=>{
  const isCommandKey = event.metaKey || event.ctrlKey;
  if(isCommandKey && event.key.toLowerCase()==='k'){
    event.preventDefault();
    const isOpen=commandPalette && commandPalette.classList.contains('open');
    if(isOpen){
      closeCommandPalette();
    } else {
      openCommandPalette();
    }
  }
  if(event.key === 'Escape'){
    if(commandPalette && commandPalette.classList.contains('open')){
      closeCommandPalette();
      commandPaletteTrigger?.focus();
      return;
    }
    if(modal && modal.classList.contains('open')){
      closeCase();
      return;
    }
    if(assistantPanel && assistantPanel.classList.contains('open'))setAssistantOpen(false);
  }
});

const introScreen=document.querySelector('#intro-screen');
const introSkip=document.querySelector('#intro-skip');
const introTerminalLine=document.querySelector('#intro-terminal-line');
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const introSeen=localStorage.getItem('siddhinath-intro-seen')==='true';
function finishIntro(){
  if(!introScreen)return;
  localStorage.setItem('siddhinath-intro-seen','true');
  introScreen.setAttribute('aria-hidden','true');
  introScreen.classList.add('celebrate');
  window.setTimeout(()=>introScreen.classList.add('is-complete'),prefersReducedMotion?0:120);
}
function startIntro(){
  if(!introScreen)return;
  if(introSeen){introScreen.classList.add('is-complete');return;}
  introScreen.classList.add('is-active');
  introScreen.setAttribute('aria-hidden','false');
  if(prefersReducedMotion){finishIntro();return;}
  window.setTimeout(()=>{
    if(introTerminalLine) introTerminalLine.textContent='AI SYSTEMS ONLINE / SITARA READY';
    introScreen.classList.add('phase-system');
  },400);
  window.setTimeout(()=>introScreen.classList.add('phase-reveal'),650);
  window.setTimeout(finishIntro,1050);
}
introSkip?.addEventListener('click',finishIntro);
startIntro();

const sitaraCore=document.querySelector('#sitara-core');
sitaraCore?.addEventListener('click',()=>setAssistantOpen(true));
document.querySelectorAll('[data-open-assistant]').forEach(card=>{
  card.addEventListener('click',()=>setAssistantOpen(true));
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setAssistantOpen(true)}});
});
document.querySelectorAll('.focus-card[data-case]').forEach(card=>{
  card.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();openCase(card.dataset.case)}
  });
});

const konamiSequence=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex=0;
let logoClicks=0;
let logoTimer;
const wordmark=document.querySelector('.wordmark');
const logoReveal=document.createElement('div');
logoReveal.className='logo-reveal';
logoReveal.setAttribute('aria-live','polite');
logoReveal.textContent='BUILD / LEARN / BREAK / IMPROVE / REPEAT';
document.body.appendChild(logoReveal);
function showDeveloperMode(){
  document.body.classList.add('developer-easter-egg');
  window.setTimeout(()=>document.body.classList.remove('developer-easter-egg'),2200);
}
document.addEventListener('keydown',event=>{
  const key=event.key.length===1?event.key.toLowerCase():event.key;
  if(key===konamiSequence[konamiIndex]){konamiIndex+=1;if(konamiIndex===konamiSequence.length){konamiIndex=0;showDeveloperMode()}}else{konamiIndex=0}
});
wordmark?.addEventListener('click',event=>{
  event.preventDefault();
  logoClicks+=1;
  window.clearTimeout(logoTimer);
  logoTimer=window.setTimeout(()=>{logoClicks=0},900);
  if(logoClicks>=3){logoClicks=0;logoReveal.classList.add('show');window.setTimeout(()=>logoReveal.classList.remove('show'),1800)}
});

const cursorDot=document.createElement('span');
const cursorRing=document.createElement('span');
cursorDot.className='cursor-dot';cursorRing.className='cursor-ring';document.body.append(cursorDot,cursorRing);
if(!prefersReducedMotion&&window.matchMedia('(pointer: fine)').matches){
  document.body.classList.add('has-custom-cursor');
  document.addEventListener('mousemove',event=>{cursorDot.style.left=`${event.clientX}px`;cursorDot.style.top=`${event.clientY}px`;cursorRing.style.left=`${event.clientX}px`;cursorRing.style.top=`${event.clientY}px`;cursorDot.style.opacity='1';cursorRing.style.opacity='1';const hero=document.querySelector('.hero');if(hero){hero.style.setProperty('--pointer-x',`${event.clientX}px`);hero.style.setProperty('--pointer-y',`${event.clientY}px`)}});
  document.querySelectorAll('a,button,.focus-card,.featured-card').forEach(element=>element.addEventListener('mouseenter',()=>cursorRing.classList.add('is-hover')));
  document.querySelectorAll('a,button,.focus-card,.featured-card').forEach(element=>element.addEventListener('mouseleave',()=>cursorRing.classList.remove('is-hover')));
  document.querySelectorAll('.featured-card').forEach(card=>{
    card.addEventListener('pointermove',event=>{const box=card.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5;const y=(event.clientY-box.top)/box.height-.5;card.style.setProperty('--tilt-x',`${y*-2}deg`);card.style.setProperty('--tilt-y',`${x*2}deg`)});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')});
  });
}

const scrollProgress=document.createElement('span');
scrollProgress.className='scroll-progress';document.body.appendChild(scrollProgress);
function updateScrollProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;scrollProgress.style.width=`${max>0?(window.scrollY/max)*100:0}%`}
window.addEventListener('scroll',updateScrollProgress,{passive:true});updateScrollProgress();
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.section-heading,.featured-card,.journey-track').forEach(element=>revealObserver.observe(element));

