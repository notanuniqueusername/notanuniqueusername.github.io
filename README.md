# Personal project index

A static, dependency-free dashboard for https://notanuniqueusername.github.io/.

Open `index.html` locally. Styles, illustrations, scripts, and fonts use local files or system fonts; no API key, server, build, or external library is required. Project filtering, search, sorting, accessible project briefs, and theme selection work in the browser.

Four personal ML and data projects are presented in the project index. The mathematics workbook appears separately under University Coursework. Descriptions are maintained in `projects.js`, using the public repository READMEs as checked on 3 November 2026. Illustrations are conceptual diagrams, not live model predictions. Reported metrics retain their evaluation context in the project briefs.

Publish these files at the root of the public `notanuniqueusername.github.io` repository. In Settings → Pages, choose **Deploy from a branch**, **main**, **/ (root)**. Keep `.nojekyll` in the root. The workbook stays in its own repository and is linked from this dashboard.

To add a project, extend `window.projectIndex` in `projects.js`, setting `collection` to `personal` or `university`; category and project counts update automatically. For a new custom illustration, add a corresponding entry to the artwork function in `app.js`. The generic illustration is used otherwise.

Theme preference is saved only in browser local storage when available. No analytics, cookies, remote fonts, or visitor data collection is included.
