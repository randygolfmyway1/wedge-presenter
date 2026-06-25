const screens = ["menu", "objective", "company", "pain", "ladder"];
let current = "menu";
let historyStack = [];
let painStep = 0;
let ladderExample = "Dairy section";

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
  progressBar.style.width = `${Math.max(0, index) / (screens.length - 1) * 100}%`;
  sectionLabel.textContent = current === "menu" ? "Main menu" : `The Wedge Workshop · ${index} of ${screens.length - 1}`;
  document.querySelector('[data-action="back"]').disabled = current === "menu" && historyStack.length === 0;
  document.querySelector('[data-action="next"]').disabled = current === "ladder";

  const templates = { menu: menuScreen, objective: objectiveScreen, company: companyScreen, pain: painScreen, ladder: ladderScreen };
  app.innerHTML = templates[current]();
  app.focus({ preventScroll: true });
}

function menuScreen() {
  return `<section class="screen menu-layout">
    <div class="menu-card">
      <span class="eyebrow">Modern rebuild · pilot</span>
      <h1>Main menu</h1>
      <p class="lead">A working replacement for the original Flash presenter. The first section below is active; the remaining sections show how the complete library will grow.</p>
      <div class="menu-list">
        <a class="menu-item sales-call-entry" href="sales-call.html"><span>Sales Call Structure — animated replica</span><span class="arrow">→</span></a>
        <button class="menu-item" data-screen="objective"><span>The Wedge Workshop</span><span class="arrow">→</span></button>
        <button class="menu-item" data-unavailable><span>Sales Leadership</span><span>Planned</span></button>
        <button class="menu-item" data-unavailable><span>Red Hot Introductions</span><span>Planned</span></button>
        <button class="menu-item" data-unavailable><span>Million Dollar Producer</span><span>Planned</span></button>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true"><div class="rings"></div><div class="hero-word">W</div></div>
  </section>`;
}

function objectiveScreen() {
  return `<section class="screen">
    <header class="lesson-header"><span class="eyebrow">The Wedge Workshop</span><h1>The Wedge</h1></header>
    <div class="objective-card">
      <p class="objective"><strong>Objective:</strong> Learn how to break incumbent relationships to win new business.</p>
      <h2>Workshop strategies</h2>
      <ol class="strategy-list">
        <li>Know where you are strong and where the competition is weak.</li>
        <li>Help the prospect recognize how they are being underserved.</li>
        <li>Use that hidden pain to challenge the incumbent relationship.</li>
        <li>Test the prospect’s ability to make a change before investing in a proposal.</li>
      </ol>
    </div>
  </section>`;
}

function companyScreen() {
  const items = [
    ["Your strengths", "Capabilities the prospect values and the incumbent cannot match."],
    ["Incumbent strengths", "Areas where changing providers offers little benefit."],
    ["Your gaps", "Risks to address honestly before proposing a solution."],
    ["Unmet needs", "The strongest territory for differentiation and discovery."]
  ];
  return `<section class="screen">
    <header class="lesson-header"><span class="eyebrow">Interactive exercise</span><h1>How is your company better?</h1><p class="lead">Click each quadrant to reveal the thinking behind it.</p></header>
    <div class="quadrant-wrap">
      <div><h2>Different—or better?</h2><p class="lead">If what you bring is the same as what the prospect already has, there is no compelling reason to change. Difference becomes valuable when it solves an unmet need.</p><button class="action-button" data-action="reveal-all">Reveal all</button></div>
      <div class="quadrant">${items.map(([title, copy]) => `<button data-quadrant><strong>${title}</strong><span>${copy}</span></button>`).join("")}</div>
    </div>
  </section>`;
}

function painScreen() {
  const states = ["", painStep >= 1 ? "active" : "", painStep >= 2 ? "active" : "", painStep >= 3 ? "active" : ""];
  return `<section class="screen">
    <header class="lesson-header"><span class="eyebrow">Interactive model</span><h1>Locating your prospect’s hidden pain</h1><p class="lead">Advance the model one step at a time, mirroring the staged reveals in the Flash application.</p></header>
    <div class="pain-layout">
      <div class="person-card"><div class="person" aria-label="Prospect thinking">♟<div class="thought">Cost · Time · Resources · Capability · Effort</div></div></div>
      <div>
        <div class="pain-flow">
          <div class="flow-node problem ${states[1]}">Problem</div><span class="flow-arrow">→</span>
          <div class="flow-node solution ${states[2]}">Solution</div><span class="flow-arrow">→</span>
          <div class="flow-node commitment ${states[3]}">Commitment</div>
        </div>
        <div class="reveal-controls">
          <button class="tool secondary" data-action="pain-clear">Clear</button>
          <button class="tool primary" data-action="pain-reveal">${painStep >= 3 ? "Restart" : "Reveal next"}</button>
        </div>
      </div>
    </div>
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
  if (target.dataset.screen) navigate(target.dataset.screen);
  if (target.hasAttribute("data-unavailable")) {
    modalContent.innerHTML = `<h2>Planned section</h2><p>This prototype proves the architecture with The Wedge Workshop first. This section will be migrated after the pilot is approved.</p>`;
    modal.showModal();
  }
  if (target.hasAttribute("data-quadrant")) target.classList.toggle("revealed");
  if (target.dataset.example) { ladderExample = target.dataset.example; render(); }
  if (target.dataset.node) document.querySelector("#tree-detail").textContent = `${target.dataset.node}: ask what evidence supports this level, then move one level more specific.`;
  if (target.dataset.calc) handleCalculator(target.dataset.calc);

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
    case "close-modal": modal.close(); break;
    case "reveal-all": document.querySelectorAll("[data-quadrant]").forEach(el => el.classList.add("revealed")); break;
    case "pain-clear": painStep = 0; render(); break;
    case "pain-reveal": painStep = painStep >= 3 ? 0 : painStep + 1; render(); break;
  }
});

modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });
render();
