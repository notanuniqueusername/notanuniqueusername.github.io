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
      case 'workbook': return svg(`<g fill="none" stroke="var(--line)"><path d="M38 166h285M65 185V30"/><path d="m65 166 221-83" stroke-dasharray="3 5"/><ellipse cx="235" cy="148" rx="61" ry="19"/></g><path class="diagram-line draw-path" d="M40 147C88 143 93 67 139 93S189 173 222 122 273 61 323 47"/><path d="M159 52h-9v72h9m64-72h9v72h-9" class="diagram-line"/><g class="diagram-ink" font-family="Georgia,serif" font-style="italic" font-size="17"><text x="167" y="77">a</text><text x="201" y="77">b</text><text x="167" y="108">c</text><text x="201" y="108">d</text></g><circle cx="139" cy="93" r="5" class="diagram-accent flow-node"/><circle cx="278" cy="64" r="4" class="diagram-accent"/><g class="diagram-small diagram-muted"><text x="80" y="40">f(x)</text><text x="315" y="184">x</text><text x="253" y="181">∫ f(x) dx</text></g><path d="M195 148 235 73 276 148" class="diagram-line" stroke="var(--purple)"/><path d="M235 73v94" stroke="var(--purple)" stroke-dasharray="3 4" opacity=".5"/>`);
      case 'taxi': return svg(`<g fill="none" stroke="var(--line)" stroke-width="9"><path d="m20 52 312 74M33 106 333 177M39 168 326 47M100 20 57 202M161 10 117 203M225 15 181 202M286 24 243 205"/></g><path class="draw-path" d="m86 141 35-65 74 18 41-30 48 12" fill="none" stroke="var(--orange)" stroke-width="3"/><g fill="var(--panel)" stroke="var(--orange)" stroke-width="2"><circle cx="86" cy="141" r="5"/><circle cx="121" cy="76" r="4"/><circle cx="195" cy="94" r="4"/><circle cx="236" cy="64" r="4"/><circle cx="284" cy="76" r="6"/></g><g transform="translate(157 115)"><rect width="97" height="42" rx="6" class="diagram-panel"/><text x="10" y="16" class="diagram-small diagram-muted">AUGUST 2025</text><text x="10" y="32" class="diagram-small diagram-orange">NYC / YELLOW TAXI</text></g><circle cx="86" cy="141" r="15" stroke="var(--orange)" fill="none" class="flow-node" opacity=".3"/>`);
      case 'yolo': return svg(`<rect x="44" y="24" width="273" height="161" rx="5" class="diagram-panel"/><path d="M44 147h273m-250-3 38-30 43 5 40-25 33 9 41-23 33 34" fill="none" stroke="var(--line)"/><path d="m176 137 7-48 21-13 18 9 5 52m-31-38-15 30m27-31 23 27m-36 14-8 25m27-25 8 25" fill="none" stroke="var(--muted)" stroke-width="6" stroke-linecap="round"/><rect x="162" y="63" width="79" height="109" fill="none" stroke="var(--purple)" stroke-dasharray="4 4" opacity=".7"/><rect x="166" y="65" width="74" height="105" fill="none" stroke="var(--accent)" stroke-width="2"/><rect x="166" y="49" width="74" height="16" fill="var(--accent)"/><text x="172" y="60" fill="var(--bg)" class="diagram-mono">prediction</text><path d="M90 35v139" stroke="var(--accent)" stroke-width="1" class="scan-line"/><g class="diagram-small diagram-muted"><text x="57" y="42">FRAME / 120</text><text x="57" y="175">reference</text></g><path d="M113 172h28" stroke="var(--purple)" stroke-dasharray="3 3"/>`);
      case 'cats': return svg(`<g transform="translate(31 58)"><rect width="82" height="82" rx="9" class="diagram-panel"/><path d="m20 35-3-17 18 10h12l18-10-3 19c11 30-50 30-42-2Z" fill="var(--purple)" opacity=".75"/><path d="M32 44h1m17 0h1" stroke="var(--panel)" stroke-width="4" stroke-linecap="round"/><path d="m39 51 3 3 3-3" stroke="var(--panel)" fill="none"/></g><path d="M116 99h36m58 0h32" stroke="var(--muted)" stroke-dasharray="3 4"/><rect x="152" y="63" width="58" height="72" rx="5" class="diagram-panel"/><g stroke="var(--purple)" opacity=".6"><path d="m162 80 18 19 20-19m-38 38 18-19 20 19m-38-19h38m-20-19v38"/></g><g fill="var(--purple)"><circle cx="162" cy="80" r="3"/><circle cx="162" cy="99" r="3"/><circle cx="162" cy="118" r="3"/><circle cx="180" cy="99" r="4"/><circle cx="200" cy="80" r="3"/><circle cx="200" cy="99" r="3"/><circle cx="200" cy="118" r="3"/></g><g class="diagram-small"><rect x="243" y="69" width="88" height="27" rx="4" fill="var(--soft)" stroke="var(--accent)"/><text x="256" y="86" class="diagram-accent">CAT</text><circle cx="315" cy="82" r="3" class="diagram-accent flow-node"/><rect x="243" y="105" width="88" height="27" rx="4" class="diagram-panel"/><text x="256" y="122" class="diagram-muted">DOG</text></g><g class="diagram-mono diagram-muted"><text x="41" y="163">224 × 224</text><text x="145" y="163">MobileNetV2</text></g>`);
      case 'bert': return svg(`<text x="27" y="42" class="diagram-small diagram-muted">TEXT → TOKENS → REPRESENTATION</text><g class="token"><rect x="27" y="62" width="53" height="32" rx="4" class="diagram-panel"/><text x="40" y="82" class="diagram-mono diagram-ink">[CLS]</text></g><g class="token"><rect x="88" y="62" width="35" height="32" rx="4" class="diagram-panel"/><text x="102" y="82" class="diagram-mono diagram-ink">I</text></g><g class="token"><rect x="131" y="62" width="89" height="32" rx="4" fill="var(--soft)" stroke="var(--purple)"/><text x="149" y="82" class="diagram-mono diagram-purple">enjoyed</text></g><g class="token"><rect x="228" y="62" width="53" height="32" rx="4" class="diagram-panel"/><text x="240" y="82" class="diagram-mono diagram-ink">this</text></g><g class="token"><rect x="289" y="62" width="44" height="32" rx="4" class="diagram-panel"/><text x="298" y="82" class="diagram-mono diagram-ink">[SEP]</text></g><path d="m54 98 126 33m-74-33 74 33m-5-33 5 33m75-33-75 33m132-33-132 33" stroke="var(--purple)" opacity=".4" fill="none"/><rect x="100" y="132" width="160" height="36" rx="6" class="diagram-panel"/><text x="116" y="155" class="diagram-mono diagram-purple">BERT / sentiment</text><circle cx="242" cy="150" r="4" class="diagram-purple flow-node"/>`);
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
