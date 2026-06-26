const screens = ["menu", "objective", "company", "survey", "components", "pain", "painModel", "ladder"];
let current = "menu";
let historyStack = [];
let painStep = 0;
let ladderExample = "Dairy section";
let activeMenuSection = null;

const app = document.querySelector("#app");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");
const progressBar = document.querySelector("#progress-bar");
const sectionLabel = document.querySelector("#section-label");

const ladderData = {
  "Dairy section": [
    ["Dairy section"], ["Milk", "Eggs", "Cheese"], ["Taste", "Packaging"], ["Feed", "Breed"], ["Grass", "Grain"]
  ],
  "Great restaurant": [
    ["Great restaurant"], ["Food", "Service", "Atmosphere"], ["Quality", "Timing"], ["Ingredients", "Preparation"]
  ],
  "World's best hamburger": [
    ["World's best hamburger"], ["Taste", "Texture", "Presentation"], ["Beef", "Bun", "Toppings"], ["Source", "Freshness"]
  ],
  "Loss control": [
    ["Loss control"], ["Buy-in", "Plan of action"], ["Driver training", "Owner communication"], ["Classroom interaction", "AV", "Draft letter"], ["Prevent accidents", "Workers comp", "Send to drivers"]
  ]
};

function navigate(next, push = true) {
  if (!screens.includes(next)) return;
  if (push && next !== current) historyStack.push(current);
  current = next;
  render();
}

function render() {
  const index = screens.indexOf(current);
  document.querySelector(".app-shell").classList.toggle("legacy-menu-active", current === "menu");
  document.querySelector(".app-shell").classList.toggle("legacy-slide-active", ["objective", "company", "survey", "components", "pain", "painModel"].includes(current));
  progressBar.style.width = `${Math.max(0, index) / (screens.length - 1) * 100}%`;
  sectionLabel.textContent = current === "menu" ? "Main menu" : `The Wedge Workshop · ${index} of ${screens.length - 1}`;
  document.querySelector('[data-action="back"]').disabled = current === "menu" && historyStack.length === 0;
  document.querySelector('[data-action="next"]').disabled = current === "ladder";

  const templates = { menu: menuScreen, objective: objectiveScreen, company: companyScreen, survey: surveyScreen, components: componentsScreen, pain: painScreen, painModel: painModelScreen, ladder: ladderScreen };
  app.innerHTML = templates[current]();
  app.focus({ preventScroll: true });
}

function menuScreen() {
  const wedgeItems = [
    ["Objective", "objective"],
    ["How Is Your Company Better?", "company"],
    ["Survey Results", "survey"],
    ["3 Major Components of Business", "components"],
    ["Locate Your Prospect's Pain", "pain"],
    ["What Motivates People?", ""],
    ["Hoover Dam", ""],
    ["Ladder of Abstraction", "ladder"],
    ["Differentiate", ""],
    ["Know Your Competition", ""],
    ["Pre-Call Strategy", ""],
    ["Knowledge Is Power", ""],
    ["Games and Zones", ""],
    ["Rules of The Wedge", ""],
    ["The Wedge Sales Process", ""],
    ["How The Wedge Busts Incumbent Relationships", ""],
    ["Conclusion", ""]
  ];
  const wedgeSubmenu = `<nav class="legacy-submenu" aria-label="The Wedge Workshop menu">
        ${wedgeItems.map(([label, screen]) => screen
          ? `<button data-screen="${screen}">${label}</button>`
          : `<button data-unavailable>${label}</button>`).join("")}
      </nav>`;
  return `<section class="legacy-main-menu" aria-label="Main menu">
    <aside class="legacy-menu-sidebar">
      <h1>main menu</h1>
      <nav class="legacy-menu-groups" aria-label="Presenter sections">
        <div class="legacy-menu-group">
          <button data-unavailable>Sales Leadership™</button>
          <button class="${activeMenuSection === "wedge" ? "selected" : ""}" data-menu-section="wedge">The Wedge Workshop™</button>
          <button data-unavailable>Red Hot Introductions™</button>
          <button data-unavailable>Million Dollar Producer™</button>
          <button data-unavailable>Presenter™ - Custom</button>
        </div>
        <div class="legacy-menu-group">
          <button data-unavailable>Prophet™</button>
          <button data-unavailable>Differentiation/LOA</button>
        </div>
        <div class="legacy-menu-group">
          <button data-unavailable>Wedge Sales Culture™</button>
          <a href="sales-call.html">Wedge® Overview - MS</a>
          <button data-unavailable>iWin™</button>
          <button data-unavailable>Coach to the Coach™</button>
        </div>
      </nav>
    </aside>
    <section class="legacy-menu-canvas">
      <h2>The Wedge Group: Presenter™</h2>
      <img class="legacy-wedge-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
      <div class="legacy-menu-arcs" aria-hidden="true"></div>
      ${wedgeSubmenu}
      <div class="legacy-menu-footer">
        <p>©Copyright 2004-2010 The Wedge Group. All rights reserved. Information presented is confidential and/or privileged material.</p>
        <button data-action="calculator">calculator</button>
        <button data-action="about">about</button>
      </div>
    </section>
  </section>`;
}

function objectiveScreen() {
  return `<section class="legacy-lesson-slide objective-slide" aria-label="The Wedge Objective">
    <div class="legacy-slide-arcs" aria-hidden="true"></div>
    <h1>The Wedge<sup>®</sup></h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="objective-content">
      <p class="objective-statement"><strong>Objective:</strong><span>Learn how to break incumbent relationships<br>to win new business.</span></p>
      <h2>Workshop Strategies:</h2>
      <ol>
        <li>Know where <em>you</em> are strong and your <em>competition</em> is weak – which<br>leads to how the prospect is being underserved.</li>
        <li>Learn a process to exploit the competition's weakness to get the<br>prospect to see how they are being underserved by the incumbent,<br>leading to their "pain".</li>
        <li>Use that "pain" to break the relationship between your prospect<br>and the incumbent.</li>
        <li>Test the prospect's ability to fire the incumbent and hire you,<br>before investing time developing a proposal.</li>
      </ol>
    </div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-action="home" aria-label="Return to menu">◀</button>
    <button class="legacy-slide-arrow next" data-screen="company" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>©Copyright 2004-2010 The Wedge Group. All rights reserved. Information presented is confidential and/or privileged material.</p>
      <button data-action="calculator">calculator</button>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function companyScreen() {
  return `<section class="legacy-lesson-slide company-better-slide" aria-label="How Is Your Company Better?">
    <img class="company-better-reference" src="assets/company-better-reference.png" alt="How Is Your Company Better? four-quadrant worksheet">
    <button class="company-hotspot pooge-hotspot" data-action="open-pooge" aria-label="POOGE"></button>
    <button class="company-hotspot previous-hotspot" data-screen="objective" aria-label="Previous slide"></button>
    <button class="company-hotspot next-hotspot" data-screen="survey" aria-label="Next slide"></button>
    <button class="company-hotspot calculator-hotspot" data-action="calculator" aria-label="calculator"></button>
    <button class="company-hotspot about-hotspot" data-action="about" aria-label="about"></button>
    <button class="company-hotspot close-hotspot" data-action="home" aria-label="close"></button>
    <section class="pooge-overlay" role="dialog" aria-modal="true" aria-label="POOGE" hidden>
      <div class="legacy-slide-arcs" aria-hidden="true"></div>
      <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
      <img class="pooge-art" src="assets/pooge.png" alt="No POOGE">
      <div class="legacy-slide-footer pooge-footer">
        <p>©Copyright 2004-2010 The Wedge Group. All rights reserved. Information presented is confidential and/or privileged material.</p>
        <button data-action="calculator">calculator</button>
        <button data-action="about">about</button>
        <button data-action="close-pooge">close</button>
      </div>
    </section>
  </section>`;
}

function surveyScreen() {
  const rows = [
    "Reputation",
    "Quality",
    "Great Solutions",
    "Products",
    "Services",
    "Technology",
    "Customer Service",
    "Competitive Pricing"
  ];
  const competitors = ["Competitor 1", "Competitor 2", "Competitor 3", "Competitor 4", "Competitor 5", "Competitor 6", "Competitor 7"];
  return `<section class="legacy-lesson-slide survey-slide" aria-label="Survey Results">
    <div class="legacy-slide-arcs" aria-hidden="true"></div>
    <h1>Survey Results</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="survey-table-wrap">
      <table class="survey-table" aria-label="Competitor survey results">
        <thead>
          <tr>
            <th class="survey-row-label"></th>
            ${competitors.map(label => `<th><span>${label}</span></th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `<tr>
            <th>${row}</th>
            ${competitors.map(() => `<td aria-label="checked">✔</td>`).join("")}
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <p class="survey-note">If there is no realization of a problem, there is no need for a solution.</p>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="company" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="components" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>©Copyright 2004-2010 The Wedge Group. All rights reserved. Information presented is confidential and/or privileged material.</p>
      <button data-action="calculator">calculator</button>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function componentsScreen() {
  return `<section class="legacy-lesson-slide components-slide" aria-label="3 Major Components of Business">
    <div class="legacy-slide-arcs" aria-hidden="true"></div>
    <h1>3 MAJOR COMPONENTS OF BUSINESS</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="components-boxes">
      <button data-component="price"><span>Price</span></button>
      <button data-component="coverage"><span>Coverage</span></button>
      <button data-component="service"><span>Service</span></button>
    </div>
    <div class="service-branches" aria-label="Service types">
      <span class="service-line reactive-line" aria-hidden="true"></span>
      <span class="service-line proactive-line" aria-hidden="true"></span>
      <button class="service-oval reactive" data-service-type="reactive"><span>Reactive</span></button>
      <button class="service-oval proactive" data-service-type="proactive"><span>Proactive</span></button>
      <button class="components-clear" data-action="components-clear">CLEAR</button>
    </div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="survey" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="pain" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>©Copyright 2004-2010 The Wedge Group. All rights reserved. Information presented is confidential and/or privileged material.</p>
      <button data-action="calculator">calculator</button>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function painScreen() {
  return `<section class="legacy-lesson-slide pain-slide" aria-label="Locating your prospect's hidden pain">
    <h1>LOCATING YOUR PROSPECT'S HIDDEN PAIN</h1>
    <img class="pain-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <img class="pain-prospect" src="assets/prospect-figure.png" alt="Prospect">
    <button class="pain-clear" data-action="pain-clear">CLEAR</button>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="components" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="painModel" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>©Copyright 2004-2010 The Wedge Group. All rights reserved. Information presented is confidential and/or privileged material.</p>
      <button data-action="calculator">calculator</button>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function painModelScreen() {
  return `<section class="legacy-lesson-slide pain-model-slide" aria-label="Hidden pain model">
    <img class="pain-model-base" src="assets/hidden-pain-base.png" alt="Locating your prospect's hidden pain">
    <div class="pain-model-reveals" aria-hidden="true">
      <div class="pain-checklist">
        <label><span>✓</span> Cost</label>
        <label><span>✓</span> Time</label>
        <label><span>✓</span> Resource</label>
        <label><span>✓</span> Capability</label>
        <label><span>✓</span> Effort</label>
      </div>
      <div class="pain-question">?</div>
      <div class="pain-arrow pain-arrow-to-problem">➜</div>
      <div class="pain-problem-block"><span>PROBLEM</span></div>
      <div class="pain-arrow pain-arrow-to-solution">➜</div>
      <div class="pain-solution-block">SOLUTION</div>
      <div class="pain-fix-block">Fix It</div>
      <div class="pain-fix-arrows"><span>↕</span><span>↑</span></div>
      <div class="pain-no-solution-block">NO SOLUTION</div>
      <div class="pain-forget-block">Forget It</div>
      <div class="pain-condition-label">CONDITION</div>
      <div class="pain-brain">
        <span class="brain-active">ACTIVE</span>
        <span class="brain-latent">LATENT</span>
      </div>
    </div>
    <button class="pain-model-hotspot pain-model-man" data-pain-reveal="problem" aria-label="Reveal problem"></button>
    <button class="pain-model-hotspot pain-model-problem-button" data-pain-reveal="solution" aria-label="Reveal solution"></button>
    <button class="pain-model-hotspot pain-model-solution-button" data-pain-reveal="fix" aria-label="Reveal fix it"></button>
    <button class="pain-model-hotspot pain-model-no-solution-button" data-pain-reveal="forget" aria-label="Reveal no solution"></button>
    <button class="pain-model-hotspot pain-model-condition-button" data-pain-reveal="condition" aria-label="Reveal condition"></button>
    <button class="pain-model-hotspot pain-model-clear" data-action="pain-model-clear" aria-label="Clear"></button>
    <button class="pain-model-hotspot pain-model-back" data-screen="pain" aria-label="Previous slide"></button>
    <button class="pain-model-hotspot pain-model-next" data-screen="ladder" aria-label="Next slide"></button>
  </section>`;
}

function ladderScreen() {
  const levels = ladderData[ladderExample];
  return `<section class="screen">
    <header class="lesson-header"><span class="eyebrow">Interactive model</span><h1>Ladder of Abstraction</h1><p class="lead">Move from broad concepts toward specific evidence. Choose an example, then click a node for guidance.</p></header>
    <div class="ladder-layout">
      <div class="example-tabs">${Object.keys(ladderData).map(name => `<button class="example-tab ${name === ladderExample ? "selected" : ""}" data-example="${name}">${name}</button>`).join("")}</div>
      <div class="tree">
        ${levels.map(level => `<div class="tree-level">${level.map(label => `<button class="tree-node" data-node="${label}">${label}</button>`).join("")}</div>`).join("")}
        <p class="tree-detail" id="tree-detail">Select a node to focus the discussion.</p>
      </div>
    </div>
  </section>`;
}

function openAbout() {
  modalContent.innerHTML = `<span class="eyebrow">About this prototype</span><h2>A modern foundation</h2><p>This browser version recreates the original Presenter’s structure while replacing Flash with accessible HTML, CSS, and JavaScript. It is responsive, keyboard-friendly, and can later be packaged as a Windows application.</p>`;
  modal.showModal();
}

function openCalculator() {
  modalContent.innerHTML = `<span class="eyebrow">Utility</span><h2>Calculator</h2><input class="calc-display" id="calc-display" value="" inputmode="decimal" aria-label="Calculator display" readonly><div class="calculator-grid">${["7","8","9","÷","4","5","6","×","1","2","3","−","0",".","=","+","C"].map(x => `<button data-calc="${x}">${x}</button>`).join("")}</div>`;
  modal.showModal();
}

function handleCalculator(key) {
  const display = document.querySelector("#calc-display");
  if (key === "C") { display.value = ""; return; }
  if (key === "=") {
    try {
      const safe = display.value.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("−", "-");
      if (!/^[0-9+*/.() -]+$/.test(safe)) throw new Error();
      display.value = String(Function(`"use strict"; return (${safe})`)());
    } catch { display.value = "Error"; }
    return;
  }
  if (display.value === "Error") display.value = "";
  display.value += key;
}

document.addEventListener("click", event => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.menuSection) {
    return;
  }
  if (target.dataset.screen) navigate(target.dataset.screen);
  if (target.hasAttribute("data-unavailable")) {
    modalContent.innerHTML = `<h2>Planned section</h2><p>This prototype proves the architecture with The Wedge Workshop first. This section will be migrated after the pilot is approved.</p>`;
    modal.showModal();
  }
  if (target.hasAttribute("data-quadrant")) target.classList.toggle("revealed");
  if (target.dataset.example) { ladderExample = target.dataset.example; render(); }
  if (target.dataset.node) document.querySelector("#tree-detail").textContent = `${target.dataset.node}: ask what evidence supports this level, then move one level more specific.`;
  if (target.dataset.calc) handleCalculator(target.dataset.calc);
  if (target.dataset.component) target.classList.add("revealed");
  if (target.dataset.serviceType) target.classList.add("revealed");
  if (target.dataset.painReveal) {
    target.closest(".pain-model-slide")?.classList.add(`show-${target.dataset.painReveal}`);
  }

  switch (target.dataset.action) {
    case "home": historyStack = []; navigate("menu", false); break;
    case "back": {
      const previous = historyStack.pop();
      if (previous) navigate(previous, false);
      else if (current !== "menu") navigate(screens[Math.max(0, screens.indexOf(current) - 1)], false);
      break;
    }
    case "next": navigate(screens[Math.min(screens.length - 1, screens.indexOf(current) + 1)]); break;
    case "about": openAbout(); break;
    case "calculator": openCalculator(); break;
    case "open-pooge": {
      const overlay = document.querySelector(".pooge-overlay");
      overlay.hidden = false;
      overlay.querySelector('[data-action="close-pooge"]').focus();
      break;
    }
    case "close-pooge": {
      document.querySelector(".pooge-overlay").hidden = true;
      document.querySelector(".pooge-hotspot").focus();
      break;
    }
    case "close-modal": modal.close(); break;
    case "reveal-all": document.querySelectorAll("[data-quadrant]").forEach(el => el.classList.add("revealed")); break;
    case "pain-clear": painStep = 0; render(); break;
    case "pain-reveal": painStep = painStep >= 3 ? 0 : painStep + 1; render(); break;
    case "pain-model-clear": {
      target.closest(".pain-model-slide")?.classList.remove("show-problem", "show-solution", "show-fix", "show-forget", "show-condition");
      break;
    }
    case "components-clear": {
      document.querySelectorAll(".components-boxes button, .service-oval").forEach(el => el.classList.remove("revealed"));
      break;
    }
  }
});

document.addEventListener("mousedown", event => {
  const target = event.target.closest(".legacy-submenu button[data-screen]");
  if (!target) return;
  event.preventDefault();
  navigate(target.dataset.screen);
});

modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });
render();
