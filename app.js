'use strict';
(() => {
  const projects = window.projectIndex || [];
  const personalProjects = projects.filter(p => p.collection !== 'university');
  const universityMaterials = projects.filter(p => p.collection === 'university');
  const grid = document.querySelector('#project-grid');
  const universityGrid = document.querySelector('#university-grid');
  const search = document.querySelector('#search');
  const sort = document.querySelector('#sort');
  const dialog = document.querySelector('#project-dialog');
  let category = 'all';
  let returnFocus = null;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const repository = project => `https://github.com/notanuniqueusername/${encodeURIComponent(project.repo)}`;
  const svg = content => `<svg viewBox="0 0 360 210" aria-hidden="true">${content}</svg>`;
  function artwork(id) {
    switch (id) {
      case 'workbook': return svg(`
        <text x="20" y="36" class="diagram-mono diagram-muted">ONE WORKBOOK / THREE FOUNDATIONS</text>
        <g class="diagram-panel"><rect x="20" y="57" width="96" height="110" rx="7"/><rect x="132" y="57" width="96" height="110" rx="7"/><rect x="244" y="57" width="96" height="110" rx="7"/></g>
        <path d="M46 80h-7v57h7m44-57h7v57h-7" class="diagram-line"/>
        <g class="diagram-ink" font-family="Georgia,serif" font-size="19" text-anchor="middle"><text x="56" y="102">1</text><text x="80" y="102">2</text><text x="56" y="126">3</text><text x="80" y="126">4</text></g>
        <path d="M148 137h65m-57 6V79" fill="none" stroke="var(--muted)" stroke-width="1"/>
        <path d="m156 137 43-48 9 34Z" fill="var(--purple)" fill-opacity=".12" stroke="var(--purple)" stroke-width="1.8"/><circle cx="199" cy="89" r="3" class="diagram-purple flow-node"/>
        <path d="M258 137h70m-65 6V78" fill="none" stroke="var(--muted)" stroke-width="1"/>
        <path d="M271 137v-12c15-1 21-37 43-39v51Z" fill="var(--accent)" fill-opacity=".12"/>
        <path d="M266 126c21 0 23-39 57-41" class="diagram-line draw-path"/>
        <g class="diagram-mono diagram-muted" text-anchor="middle"><text x="68" y="154">ALGEBRA</text><text x="180" y="154">GEOMETRY</text><text x="292" y="154">CALCULUS</text></g>`);
      case 'taxi': return svg(`
        <text x="25" y="36" class="diagram-mono diagram-muted">NYC TAXI / FROM RECORDS TO INSIGHT</text>
        <rect x="25" y="53" width="96" height="94" rx="7" class="diagram-panel"/>
        <path d="m47 89 7-14h29l10 14 9 4v14H42V93Z" fill="var(--orange)" fill-opacity=".16" stroke="var(--orange)" stroke-width="1.6"/><path d="m58 80-5 10h33l-7-10Z" fill="var(--orange)" fill-opacity=".3"/><path d="M64 72h10" stroke="var(--orange)" stroke-width="3"/><circle cx="54" cy="107" r="5" class="diagram-orange"/><circle cx="89" cy="107" r="5" class="diagram-orange"/>
        <text x="73" y="132" text-anchor="middle" class="diagram-mono diagram-ink">3.57M trips</text>
        <path d="M126 100h20m-5-4 5 4-5 4m69-4h20m-5-4 5 4-5 4" fill="none" stroke="var(--muted)" stroke-width="1.4"/>
        <rect x="151" y="66" width="57" height="68" rx="7" class="diagram-panel"/>
        <path d="m163 91 16-8 17 8-17 8Zm0 11 16 8 17-8m-33 11 16 8 17-8" fill="none" stroke="var(--orange)" stroke-width="1.7" class="flow-node"/>
        <rect x="235" y="53" width="100" height="94" rx="7" class="diagram-panel"/>
        <g fill="var(--orange)" class="taxi-bars"><rect x="248" y="114" width="8" height="19" rx="2"/><rect x="262" y="105" width="8" height="28" rx="2"/><rect x="276" y="88" width="8" height="45" rx="2"/><rect x="290" y="98" width="8" height="35" rx="2"/><rect x="304" y="77" width="8" height="56" rx="2"/><rect x="318" y="108" width="6" height="25" rx="2"/></g>
        <path d="M245 135h82" stroke="var(--muted)" opacity=".5"/>
        <g class="diagram-mono diagram-muted" text-anchor="middle"><text x="73" y="171">TRIP DATA</text><text x="180" y="171">SPARK SQL</text><text x="285" y="171">PATTERNS</text></g>`);
      case 'yolo': return svg(`
        <rect x="23" y="35" width="177" height="127" rx="7" class="diagram-panel"/>
        <path d="M35 145h151m-143-13 20-19 17 5m61 1 19-13 22 17" fill="none" stroke="var(--line)"/>
        <circle cx="115" cy="74" r="9" class="diagram-muted"/><path d="m103 90 12-5 12 5 6 29h-12l5 21h-9l-4-20-5 20h-9l7-23H96Zm-3 4-11 22m39-22 12 22" fill="var(--muted)" stroke="var(--muted)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
        <rect x="88" y="55" width="58" height="91" fill="var(--accent)" fill-opacity=".07" stroke="var(--purple)" stroke-width="1.8" stroke-dasharray="4 3"/>
        <g class="detection-box"><rect x="94" y="59" width="56" height="87" fill="var(--accent)" fill-opacity=".06" stroke="var(--accent)" stroke-width="2"/><path d="M94 70V59h11m34 0h11v11m0 65v11h-11m-34 0H94v-11" fill="none" stroke="var(--accent)" stroke-width="3"/></g>
        <text x="35" y="51" class="diagram-mono diagram-muted">VIDEO FRAME</text>
        <path d="M206 100h18m-5-4 5 4-5 4" fill="none" stroke="var(--muted)" stroke-width="1.4"/>
        <rect x="231" y="53" width="106" height="94" rx="7" class="diagram-panel"/>
        <text x="284" y="79" text-anchor="middle" class="diagram-ink" font-family="Georgia,serif" font-size="21">IoU</text>
        <g class="diagram-small" text-anchor="middle"><text x="284" y="103" class="diagram-accent">intersection</text><text x="284" y="128" class="diagram-muted">union</text></g><path d="M247 111h74" stroke="var(--line)"/>
        <path d="M26 180h15" stroke="var(--purple)" stroke-width="2" stroke-dasharray="3 2"/><text x="47" y="183" class="diagram-small diagram-muted">Reference</text><path d="M131 180h15" stroke="var(--accent)" stroke-width="2"/><text x="152" y="183" class="diagram-small diagram-muted">Prediction</text>`);
      case 'cats': return svg(`<g transform="translate(31 58)"><rect width="82" height="82" rx="9" class="diagram-panel"/><path d="m20 35-3-17 18 10h12l18-10-3 19c11 30-50 30-42-2Z" fill="var(--purple)" opacity=".75"/><path d="M32 44h1m17 0h1" stroke="var(--panel)" stroke-width="4" stroke-linecap="round"/><path d="m39 51 3 3 3-3" stroke="var(--panel)" fill="none"/></g><path d="M116 99h36m58 0h32" stroke="var(--muted)" stroke-dasharray="3 4"/><rect x="152" y="63" width="58" height="72" rx="5" class="diagram-panel"/><g stroke="var(--purple)" opacity=".6"><path d="m162 80 18 19 20-19m-38 38 18-19 20 19m-38-19h38m-20-19v38"/></g><g fill="var(--purple)"><circle cx="162" cy="80" r="3"/><circle cx="162" cy="99" r="3"/><circle cx="162" cy="118" r="3"/><circle cx="180" cy="99" r="4"/><circle cx="200" cy="80" r="3"/><circle cx="200" cy="99" r="3"/><circle cx="200" cy="118" r="3"/></g><g class="diagram-small"><rect x="243" y="69" width="88" height="27" rx="4" fill="var(--soft)" stroke="var(--accent)"/><text x="256" y="86" class="diagram-accent">CAT</text><circle cx="315" cy="82" r="3" class="diagram-accent flow-node"/><rect x="243" y="105" width="88" height="27" rx="4" class="diagram-panel"/><text x="256" y="122" class="diagram-muted">DOG</text></g><g class="diagram-mono diagram-muted"><text x="41" y="163">224 × 224</text><text x="145" y="163">MobileNetV2</text></g>`);
      case 'bert': return svg(`
        <text x="23" y="36" class="diagram-mono diagram-muted">A SENTENCE IN. A SENTIMENT OUT.</text>
        <path d="M30 62h89a7 7 0 0 1 7 7v49a7 7 0 0 1-7 7H51l-12 11v-11h-9a7 7 0 0 1-7-7V69a7 7 0 0 1 7-7Z" class="diagram-panel"/>
        <g class="diagram-ink" font-family="Georgia,serif" font-size="15"><text x="35" y="89">“I enjoyed</text><text x="35" y="110">this.”</text></g>
        <path d="M132 98h21m-5-4 5 4-5 4m67-4h21m-5-4 5 4-5 4" fill="none" stroke="var(--muted)" stroke-width="1.4"/>
        <rect x="161" y="59" width="58" height="76" rx="7" class="diagram-panel"/>
        <g fill="none" stroke="var(--purple)" stroke-width="1.5"><path d="m171 82 19-9 19 9-19 9Z"/><path d="m171 94 19 9 19-9m-38 12 19 9 19-9" class="flow-node"/></g>
        <rect x="245" y="62" width="92" height="73" rx="7" fill="var(--soft)" stroke="var(--accent)"/>
        <circle cx="291" cy="86" r="10" fill="var(--accent)" fill-opacity=".13"/><path d="m286 86 4 4 7-8" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"/>
        <text x="291" y="117" text-anchor="middle" class="diagram-small diagram-accent">POSITIVE</text>
        <g class="diagram-mono diagram-muted" text-anchor="middle"><text x="75" y="166">INPUT TEXT</text><text x="190" y="166">BERT</text><text x="291" y="166">SENTIMENT</text></g>`);
      default: return svg('<circle cx="180" cy="100" r="58" class="diagram-line pulse-ring"/><path d="m150 100 20 20 40-40" class="diagram-line"/>');
    }
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting));
  }, {rootMargin:'120px'}) : null;

  function cardMarkup(p) {
    const university = p.collection === 'university';
    const briefLabel = university ? 'Coursework brief' : 'Project brief';
    return `<article class="project-card${university ? ' featured' : ''}" data-project="${escape(p.id)}" data-category="${escape(p.category)}" aria-labelledby="title-${escape(p.id)}">
      <div class="card-illustration">${artwork(p.id)}${university ? '<span class="feature-flag">UNIVERSITY COURSEWORK</span>' : ''}<span class="art-index">/${escape(p.number)}</span><span class="art-caption">${university ? 'ALGEBRA · GEOMETRY · CALCULUS' : 'CONCEPT SKETCH · NOT LIVE INFERENCE'}</span></div>
      <div class="card-body"><div class="category-line">${escape(p.categoryLabel)}</div><h3 class="card-title" id="title-${escape(p.id)}">${escape(p.title)}</h3><p class="card-description">${escape(p.description)}</p><div class="tags">${p.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div><div class="card-bottom"><div class="metric"><strong>${escape(p.metric)}</strong><span>${escape(p.metricLabel)}</span></div><div class="card-actions"><button class="brief-button" type="button" data-brief="${escape(p.id)}" aria-label="Read the ${escape(p.shortTitle)} ${university ? 'coursework' : 'project'} brief">${briefLabel} ↗</button>${p.live ? `<a class="open-button" href="${escape(p.live)}">Open workbook ↗</a>` : `<a class="repo-link" href="${repository(p)}" aria-label="View ${escape(p.shortTitle)} on GitHub">Code ↗</a>`}</div></div></div></article>`;
  }

  function render() {
    observer?.disconnect();
    const term = search.value.trim().toLocaleLowerCase();
    const filtered = personalProjects.filter(p => (category === 'all' || p.category === category) &&
      [p.title,p.shortTitle,p.categoryLabel,p.description,p.repo,...p.tags].join(' ').toLocaleLowerCase().includes(term));
    if (sort.value === 'az') filtered.sort((a,b) => a.shortTitle.localeCompare(b.shortTitle));
    grid.innerHTML = filtered.map(cardMarkup).join('');
    document.querySelector('#result-count').textContent = `${filtered.length} personal ${filtered.length === 1 ? 'project' : 'projects'} to explore`;
    document.querySelector('#empty-state').hidden = filtered.length > 0;
    document.querySelectorAll('.project-card').forEach(card => observer?.observe(card));
  }

  function filterBy(value) {
    category = value;
    document.querySelectorAll('[data-filter]').forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    render();
  }
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.querySelector('span').textContent = personalProjects.filter(p => button.dataset.filter === 'all' || p.category === button.dataset.filter).length;
    button.addEventListener('click', () => filterBy(button.dataset.filter));
  });
  document.querySelectorAll('[data-jump]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.jump === 'university') {
      document.querySelector('#university').scrollIntoView({block:'start'});
      document.querySelector('#university-title').focus({preventScroll:true});
      return;
    }
    search.value = '';
    filterBy(button.dataset.jump);
    document.querySelector('#projects').scrollIntoView({block:'start'});
    document.querySelector(`[data-filter="${button.dataset.jump}"]`).focus({preventScroll:true});
  }));
  search.addEventListener('input', render);
  sort.addEventListener('change', render);
  document.querySelector('#reset-filters').addEventListener('click', () => {
    search.value = '';
    sort.value = 'featured';
    filterBy('all');
    search.focus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !dialog.open &&
      !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
      event.preventDefault(); search.focus();
    }
  });

  function openBrief(event) {
    const button = event.target.closest('[data-brief]');
    if (!button) return;
    const project = projects.find(p => p.id === button.dataset.brief);
    if (!project) return;
    returnFocus = button;
    document.querySelector('#dialog-category').textContent = project.categoryLabel;
    document.querySelector('#dialog-content').innerHTML = `<h2 id="dialog-title">${escape(project.shortTitle)}</h2><p>${escape(project.brief)}</p><h3>The approach</h3><ol>${project.methods.map(step => `<li>${escape(step)}</li>`).join('')}</ol><div class="result-note"><h3>${project.id === 'workbook' ? 'Inside the workbook' : 'Reported in the project README'}</h3><p>${escape(project.result)}</p></div><p class="context-note">${escape(project.context)}</p><div class="dialog-actions">${project.live ? `<a class="open-button" href="${escape(project.live)}">Open workbook ↗</a>` : ''}<a class="brief-button" href="${repository(project)}">Explore the repository ↗</a></div>`;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.scrollTop = 0;
  }
  grid.addEventListener('click', openBrief);
  universityGrid.addEventListener('click', openBrief);
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    returnFocus?.focus({preventScroll:true});
  });
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark';
    document.querySelector('#theme-label').textContent = dark ? 'Light appearance' : 'Dark appearance';
    document.querySelector('.theme-toggle').setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = dark ? '#111310' : '#f4f3ec';
  }
  let savedTheme;
  try { savedTheme = localStorage.getItem('project-index-theme'); } catch (_) { /* Storage can be disabled. */ }
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('project-index-theme', theme); } catch (_) { /* Theme still works without persistence. */ }
  });
  document.querySelector('.nav-count').textContent = String(personalProjects.length).padStart(2,'0');
  document.querySelector('.index-strip .strip-number').textContent = String(personalProjects.length).padStart(2,'0');
  document.querySelector('.index-strip>div:nth-child(2) .strip-number').textContent = String(universityMaterials.length).padStart(2,'0');
  universityGrid.innerHTML = universityMaterials.map(cardMarkup).join('');
  render();
})();
