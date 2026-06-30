const screens = ["menu", "objective", "company", "survey", "components", "painModel", "painMemory", "motivates", "hooverRiver", "hooverLake", "hooverCompare", "ladder", "differentiate", "competition", "preCall", "knowledgePower", "gamesZones", "rulesWedge", "salesCall"];
let current = "menu";
let historyStack = [];
let painStep = 0;
let ladderExample = "Dairy section";
let activeMenuSection = null;
let suppressPainModelClickUntil = 0;
const painChoiceClasses = ["checked-cost", "checked-time", "checked-resource", "checked-capability", "checked-effort"];
const painXoutClasses = ["xout-cost", "xout-time", "xout-resource", "xout-capability", "xout-effort"];
const lypBoxClasses = ["lyp-box-1", "lyp-box-2", "lyp-box-3", "lyp-box-4", "lyp-box-5", "lyp-box-6", "lyp-box-7"];

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
  document.querySelector(".app-shell").classList.toggle("legacy-slide-active", ["objective", "company", "survey", "components", "painModel", "painMemory", "motivates", "hooverRiver", "hooverLake", "hooverCompare", "ladder", "differentiate", "competition", "preCall", "knowledgePower", "gamesZones", "rulesWedge", "salesCall"].includes(current));
  progressBar.style.width = `${Math.max(0, index) / (screens.length - 1) * 100}%`;
  sectionLabel.textContent = current === "menu" ? "Main menu" : `The Wedge Workshop · ${index} of ${screens.length - 1}`;
  document.querySelector('[data-action="back"]').disabled = current === "menu" && historyStack.length === 0;
  document.querySelector('[data-action="next"]').disabled = current === "salesCall";

  const templates = { menu: menuScreen, objective: objectiveScreen, company: companyScreen, survey: surveyScreen, components: componentsScreen, painModel: painModelScreen, painMemory: painMemoryScreen, motivates: motivatesScreen, hooverRiver: () => hooverScreen("river"), hooverLake: () => hooverScreen("lake"), hooverCompare: () => hooverScreen("compare"), ladder: ladderScreen, differentiate: differentiateScreen, competition: competitionScreen, preCall: preCallScreen, knowledgePower: knowledgePowerScreen, gamesZones: gamesZonesScreen, rulesWedge: rulesWedgeScreen, salesCall: salesCallScreen };
  app.innerHTML = templates[current]();
  app.focus({ preventScroll: true });
}

function revealPainMemory(slide, reveal) {
  if (!slide || !reveal) return;
  if (reveal === "boxes") {
    const currentBoxes = lypBoxClasses.filter(name => slide.classList.contains(name)).length;
    const nextCount = currentBoxes < 1 ? 1 : currentBoxes < 3 ? 3 : 7;
    for (let i = 0; i < nextCount; i++) slide.classList.add(lypBoxClasses[i]);
    slide.classList.add("show-active-line");
    return;
  }
  if (reveal === "stanford") {
    slide.classList.add("show-stanford", "show-active-line", "lyp-box-1");
    return;
  }
  if (reveal === "close-stanford") {
    slide.classList.remove("show-stanford");
    slide.classList.add("stanford-closed");
    return;
  }
  if (reveal === "close-conditions") {
    slide.classList.add("conditions-closed");
    return;
  }
  if (reveal === "close-dialog") {
    slide.classList.remove("show-dialog");
    return;
  }
  if (reveal === "problem") slide.classList.add("latent-engaged");
  if (reveal === "solution") slide.classList.add("show-problem");
  if (reveal === "hope") slide.classList.add("show-problem", "show-solution", "show-proactive");
  if (reveal === "proactive") slide.classList.add("show-problem", "show-solution", "show-hope");
  if (reveal === "dialog") slide.classList.add("show-problem", "show-solution", "show-hope", "show-proactive", "show-dialog");
  slide.classList.add(`show-${reveal}`);
}

function clickPainMemoryBox(slide, box) {
  if (!slide || !box) return;
  if (!lypBoxClasses.every(name => slide.classList.contains(name))) {
    revealPainMemory(slide, "boxes");
    return;
  }
  const greenClass = `green-${box}`;
  const redClass = `red-${box}`;
  if (!slide.classList.contains(greenClass) && !lypBoxClasses.every((_, index) => slide.classList.contains(`green-${index + 1}`))) {
    slide.classList.add(greenClass);
    return;
  }
  if (lypBoxClasses.every((_, index) => slide.classList.contains(`green-${index + 1}`))) {
    slide.classList.add(redClass);
  }
}

function revealLoa(slide, action) {
  if (!slide) return;
  const stages = ["show-root", "show-top", "show-blue-1", "show-blue-2", "show-blue-3", "show-blue-driver", "show-blue-teams", "show-blue-direct", "show-blue-indirect", "show-orange-1", "show-orange-driver", "show-orange-classroom", "show-orange-owner", "show-orange-2", "show-orange-3"];
  if (action === "none") return;
  if (action === "clear") {
    slide.classList.remove(...stages);
    slide.classList.add("show-root");
    return;
  }
  if (action === "all") {
    slide.classList.add(...stages);
    return;
  }
  if (action === "direct-cost") {
    slide.classList.add("show-blue-direct");
    return;
  }
  if (action === "indirect-cost") {
    slide.classList.add("show-blue-indirect");
    return;
  }
  if (action === "driver-incentive") {
    slide.classList.add("show-blue-driver");
    return;
  }
  if (action === "teams") {
    slide.classList.add("show-blue-teams");
    return;
  }
  if (action === "plan") {
    slide.classList.remove("show-blue-1", "show-blue-2", "show-blue-3", "show-blue-driver", "show-blue-teams", "show-blue-direct", "show-blue-indirect");
    slide.classList.add("show-top", "show-orange-1");
    return;
  }
  if (action === "buyin") {
    slide.classList.remove("show-orange-1", "show-orange-driver", "show-orange-classroom", "show-orange-owner", "show-orange-2", "show-orange-3");
    slide.classList.add("show-top", "show-blue-1");
    return;
  }
  if (action === "driver-training") {
    slide.classList.add("show-orange-driver");
    return;
  }
  if (action === "classroom") {
    slide.classList.add("show-orange-classroom");
    return;
  }
  if (action === "owner-communication") {
    slide.classList.add("show-orange-owner");
    return;
  }
  const currentIndex = stages.findLastIndex(name => slide.classList.contains(name));
  slide.classList.add(stages[Math.min(stages.length - 1, currentIndex + 1)]);
}

function revealPainModel(slide, reveal) {
  if (!slide || !reveal) return;
  if (reveal === "solution") slide.classList.add("show-problem");
  if (reveal === "fix") slide.classList.add("show-problem", "show-solution", "show-bubble");
  if (reveal === "problem-x") slide.classList.add("show-problem", "show-solution", "show-fix");
  if (reveal === "no-solution") slide.classList.add("show-problem", "show-bubble");
  if (reveal === "forget") slide.classList.add("show-no-solution");
  if (reveal === "condition") slide.classList.add("show-no-solution", "show-forget");
  slide.classList.add(`show-${reveal}`);
}

function checkPainChoice(slide, choice) {
  if (!slide || !choice) return;
  const isXoutPass = slide.classList.contains("show-problem-x") || painXoutClasses.some(name => slide.classList.contains(name));
  if (isXoutPass) {
    slide.classList.remove("show-problem-x");
    slide.classList.add(`xout-${choice}`);
    if (painXoutClasses.every(name => slide.classList.contains(name))) {
      revealPainModel(slide, "no-solution");
    }
    return;
  }
  if (choice === "effort" && !slide.classList.contains("show-fix")) {
    slide.classList.add("checked-effort");
    revealPainModel(slide, "fix");
    return;
  }
  slide.classList.add(`checked-${choice}`);
  if (painChoiceClasses.every(name => slide.classList.contains(name))) {
    revealPainModel(slide, "no-solution");
  }
}

function revealPainModelFromPoint(slide, clientX, clientY) {
  if (!slide) return false;
  const rect = slide.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;

  if (x >= .63 && x <= .80 && y >= .88 && y <= .97) {
    slide.classList.remove("show-bubble", "show-problem", "show-solution", "show-fix", "show-problem-x", "show-no-solution", "show-forget", "show-condition", ...painChoiceClasses, ...painXoutClasses);
    return true;
  }
  if (x >= .92 && y >= .53) {
    navigate("ladder");
    return true;
  }
  if (x >= .86 && y >= .53) {
    navigate("components");
    return true;
  }
  if (x >= .28 && x <= .48 && y >= .30 && y <= .52) {
    revealPainModel(slide, "bubble");
    return true;
  }
  if (x >= .18 && x <= .39 && y >= .34 && y <= .88) {
    revealPainModel(slide, "problem");
    return true;
  }
  if (x >= .46 && x <= .66 && y >= .38 && y <= .88) {
    revealPainModel(slide, "solution");
    return true;
  }
  if (x >= .68 && x <= .90 && y >= .42 && y <= .67) {
    revealPainModel(slide, slide.classList.contains("show-fix") ? "problem-x" : "fix");
    return true;
  }
  if (x >= .28 && x <= .50 && y >= .60 && y <= .82) {
    revealPainModel(slide, slide.classList.contains("show-forget") ? "condition" : "forget");
    return true;
  }
  if (x >= .02 && x <= .34 && y >= .75) {
    revealPainModel(slide, "condition");
    return true;
  }
  return false;
}

function menuScreen() {
  const wedgeItems = [
    ["Objective", "objective"],
    ["How Is Your Company Better?", "company"],
    ["Survey Results", "survey"],
    ["3 Major Components of Business", "components"],
    ["Locate Your Prospect's Pain", "painModel"],
    ["Active / Latent Memory", "painMemory"],
    ["What Motivates People?", "motivates"],
    ["Hoover Dam", "hooverRiver"],
    ["Ladder of Abstraction", "ladder"],
    ["Differentiate", "differentiate"],
    ["Know Your Competition", "competition"],
    ["Pre-Call Strategy", "preCall"],
    ["Knowledge Is Power", "knowledgePower"],
    ["Games and Zones", "gamesZones"],
    ["Rules of The Wedge", "rulesWedge"],
    ["The Wedge Sales Process", "salesCall"],
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
      <h1>Main Menu</h1>
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
          <button data-screen="salesCall">Wedge® Overview - MS</button>
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
        <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
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
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function companyScreen() {
  return `<section class="legacy-lesson-slide company-better-slide" aria-label="How Is Your Company Better?">
    <div class="legacy-slide-arcs" aria-hidden="true"></div>
    <h1>How Is Your Company Better?</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <p class="company-better-prompt">If what you bring to the table is the same as what they already have, they don't need you.<br>They only need you for what you do different or better.</p>
    <div class="company-better-grid" aria-label="Four quadrant worksheet">
      <span></span><span></span><span></span><span></span>
    </div>
    <button class="company-pooge-button" data-action="open-pooge">POOGE</button>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="objective" aria-label="Previous slide">&#9664;</button>
    <button class="legacy-slide-arrow next" data-screen="survey" aria-label="Next slide">&#9654;</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
    <section class="pooge-overlay" role="dialog" aria-modal="true" aria-label="POOGE" hidden>
      <div class="legacy-slide-arcs" aria-hidden="true"></div>
      <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
      <img class="pooge-art" src="assets/pooge.png" alt="No POOGE">
      <div class="legacy-slide-footer pooge-footer">
        <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
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
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function componentsScreen() {
  return `<section class="legacy-lesson-slide components-slide" aria-label="3 Major Components of Business">
    <div class="legacy-slide-arcs" aria-hidden="true"></div>
    <h1>3 Major Components Of Business</h1>
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
    <button class="legacy-slide-arrow next" data-screen="painModel" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function painModelScreen() {
  return `<section class="legacy-lesson-slide pain-model-slide" aria-label="Hidden pain model">
    <img class="pain-model-base" src="assets/hidden-pain-base.png" alt="Locating your prospect's hidden pain">
    <div class="pain-model-mask pain-model-mask-title" aria-hidden="true"></div>
    <div class="pain-model-mask pain-model-mask-logo" aria-hidden="true"></div>
    <div class="pain-model-mask pain-model-mask-footer" aria-hidden="true"></div>
    <div class="pain-model-mask pain-model-mask-t3-artifact" aria-hidden="true"></div>
    <div class="pain-model-mask pain-model-mask-old-next" aria-hidden="true"></div>
    <h1>Locating Your Prospect's Hidden Pain</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="pain-model-reveals" aria-hidden="true">
      <div class="pain-checklist">
        <button class="pain-choice pain-choice-cost" data-pain-choice="cost"><span class="pain-box"></span><span class="pain-number">1.</span> cost</button>
        <button class="pain-choice pain-choice-time" data-pain-choice="time"><span class="pain-box"></span><span class="pain-number">2.</span> time</button>
        <button class="pain-choice pain-choice-resource" data-pain-choice="resource"><span class="pain-box"></span><span class="pain-number">3.</span> resource</button>
        <button class="pain-choice pain-choice-capability" data-pain-choice="capability"><span class="pain-box"></span><span class="pain-number">4.</span> capability</button>
        <button class="pain-choice pain-choice-effort" data-pain-choice="effort"><span class="pain-box"></span><span class="pain-number">5.</span> effort</button>
      </div>
      <div class="pain-question">?</div>
      <div class="pain-arrow pain-arrow-to-problem">➜</div>
      <div class="pain-problem-block"><span>PROBLEM</span></div>
      <div class="pain-problem-x" aria-hidden="true"></div>
      <div class="pain-arrow pain-arrow-to-solution">➜</div>
      <div class="pain-solution-block">SOLUTION</div>
      <div class="pain-fix-block">Fix It</div>
      <div class="pain-fix-arrows"><span>↑</span></div>
      <div class="pain-arrow pain-arrow-to-no-solution">➜</div>
      <div class="pain-no-solution-block">NO SOLUTION</div>
      <div class="pain-down-arrow pain-arrow-to-forget">↓</div>
      <div class="pain-forget-block">Forget It</div>
      <div class="pain-condition-label">CONDITION</div>
    </div>
    <button class="pain-model-hotspot pain-model-man" data-pain-reveal="problem" aria-label="Reveal problem"></button>
    <button class="pain-model-hotspot pain-model-question-button" data-pain-reveal="bubble" aria-label="Reveal hidden pain checklist"></button>
    <button class="pain-model-hotspot pain-model-problem-button" data-pain-reveal="solution" aria-label="Reveal solution"></button>
    <button class="pain-model-hotspot pain-model-solution-button" data-pain-reveal="fix" aria-label="Reveal fix it"></button>
    <button class="pain-model-hotspot pain-model-fix-button" data-pain-reveal="problem-x" aria-label="Cross out problem"></button>
    <button class="pain-model-hotspot pain-model-no-solution-button" data-pain-reveal="forget" aria-label="Reveal no solution"></button>
    <button class="pain-model-hotspot pain-model-condition-button" data-pain-reveal="condition" aria-label="Reveal condition"></button>
    <button class="pain-model-hotspot pain-model-clear" data-action="pain-model-clear" aria-label="Clear"></button>
    <button class="pain-model-hotspot pain-model-back" data-screen="components" aria-label="Previous slide"></button>
    <button class="pain-model-hotspot pain-model-next" data-screen="painMemory" aria-label="Next slide"></button>
    <button class="pain-model-clear-live" data-action="pain-model-clear">CLEAR</button>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="components" aria-label="Previous slide">&#9664;</button>
    <button class="legacy-slide-arrow next" data-screen="painMemory" aria-label="Next slide">&#9654;</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function painMemoryScreen() {
  const boxes = Array.from({ length: 7 }, (_, i) => `<button class="lyp-box lyp-box-${i + 1}" data-lyp-box="${i + 1}" aria-label="Memory box ${i + 1}"></button>`).join("");
  return `<section class="legacy-lesson-slide pain-memory-slide" aria-label="Locating your prospect's hidden pain memory model">
    <h1>Locating Your Prospect's Hidden Pain</h1>
    <img class="pain-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <img class="lyp-head" src="assets/lyp-head.png" alt="Active and latent memory">
    <div class="lyp-reveals" aria-hidden="true">
      <div class="lyp-stanford-card">
        <div class="stanford-seal">S</div>
        <div class="stanford-word">STANFORD</div>
        <div class="stanford-subword">UNIVERSITY</div>
      </div>
      <div class="lyp-conditions-cover"></div>
      <div class="lyp-active-line"></div>
      <div class="lyp-boxes">${boxes}</div>
      <div class="lyp-problem-arrow">Problem</div>
      <div class="lyp-solution-arrow">Solution</div>
      <div class="lyp-hope-arrow">Hope</div>
      <div class="lyp-reactive-wedges">REACTIVE WEDGES<span></span></div>
      <div class="lyp-proactive-wedges">PROACTIVE WEDGES<span></span></div>
      <div class="lyp-dialog">
        <p>When your agent<br>came out 90 days after renewal<br>to do a claims review<br>and they got out your loss runs<br>-<br>-<br>-<br>so you wouldn't have to worry about....<br>are you comfortable with how they went through the process?</p>
      </div>
    </div>
    <button class="lyp-hotspot lyp-active-hotspot" data-lyp-reveal="stanford" aria-label="Active memory"></button>
    <button class="lyp-hotspot lyp-box-seed" data-lyp-reveal="boxes" aria-label="Reveal active memory boxes"></button>
    <button class="lyp-hotspot lyp-stanford-close" data-lyp-reveal="close-stanford" aria-label="Close Stanford"></button>
    <button class="lyp-hotspot lyp-conditions-close" data-lyp-reveal="close-conditions" aria-label="Close Conditions"></button>
    <button class="lyp-hotspot lyp-latent-hotspot" data-lyp-reveal="problem" aria-label="Latent memory"></button>
    <button class="lyp-hotspot lyp-problem-hotspot" data-lyp-reveal="solution" aria-label="Reveal solution"></button>
    <button class="lyp-hotspot lyp-solution-hotspot" data-lyp-reveal="hope" aria-label="Reveal hope"></button>
    <button class="lyp-hotspot lyp-hope-hotspot" data-lyp-reveal="proactive" aria-label="Reveal proactive wedges"></button>
    <button class="lyp-hotspot lyp-proactive-hotspot" data-lyp-reveal="dialog" aria-label="Open proactive dialogue"></button>
    <button class="lyp-hotspot lyp-dialog-close" data-lyp-reveal="close-dialog" aria-label="Close dialogue"></button>
    <button class="lyp-hotspot lyp-clear" data-action="pain-memory-clear" aria-label="Clear"></button>
    <button class="legacy-slide-arrow previous" data-screen="painModel" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="motivates" aria-label="Next slide">▶</button>
  </section>`;
}

function motivatesScreen() {
  return `<section class="legacy-lesson-slide motivates-slide" aria-label="What Motivates People">
    <h1>What Motivates People</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <img class="motivates-pie-art" src="assets/motivates-pie.png" alt="Avoid pain 60 - 70 percent, pleasure 30 - 35 percent">
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="painMemory" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="hooverRiver" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function hooverScreen(stage = "compare") {
  const isRiver = stage === "river";
  const isLake = stage === "lake";
  const isCompare = stage === "compare";
  const previous = isRiver ? "motivates" : isLake ? "hooverRiver" : "hooverLake";
  const next = isRiver ? "hooverLake" : isLake ? "hooverCompare" : "ladder";
  return `<section class="legacy-lesson-slide hoover-slide hoover-${stage}" aria-label="Hoover Dam Analogy">
    ${isRiver ? `<div class="hoover-river-title"><div>Ladder Of Abstraction:</div><strong>Hoover Dam – River View</strong></div>` : ""}
    ${isLake ? `<div class="hoover-river-title hoover-lake-title"><div>LADDER OF ABSTRACTION:</div><strong>Hoover Dam – Lake View</strong></div>` : ""}
    ${isCompare ? `<div class="hoover-river-title hoover-side-title"><div>LADDER OF ABSTRACTION:</div><strong>Hoover Dam – Side-by-Side</strong></div>` : ""}
    ${!isRiver && !isLake && !isCompare ? `<h1>Introduction: Ladder Of Abstraction – Hoover Dam Analogy</h1>` : ""}
    <img class="${isRiver || isLake || isCompare ? "legacy-slide-logo" : "hoover-logo"}" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="hoover-watermark">Hoover Dam</div>
    ${isRiver ? `<img class="hoover-river-photo" src="assets/hoover-river-view.png" alt="Hoover Dam river view">
    <div class="hoover-river-text"><strong>Differentiation:</strong><br>Build the Client's<br>Perspective.</div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>` : ""}
    ${isLake ? `<img class="hoover-lake-photo" src="assets/hoover-lake-side.jpg" alt="Hoover Dam lake side">
    <div class="hoover-river-text hoover-lake-text"><strong>Differentiation:</strong><br>Build the Client's<br>Perspective.</div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>` : ""}
    ${isCompare ? `<div class="hoover-side-photos">
      <img class="hoover-side-dam" src="assets/hoover-dam-face.jpg" alt="Hoover Dam face">
      <img class="hoover-side-lake" src="assets/hoover-lake-side.jpg" alt="Hoover Dam lake side">
      <div class="hoover-side-text"><strong>Differentiation:</strong><br>Build the Client's<br>Perspective.</div>
    </div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>` : ""}
    <div class="hoover-tabs" aria-label="Hoover Dam analogy sections">
      <button data-screen="hooverRiver">River Side</button>
      <button data-screen="hooverLake">Lake Side</button>
      <button data-screen="hooverCompare">700 Feet of Secret</button>
      <button>Both Sides</button>
      <button>The Challenge</button>
    </div>
    <button class="legacy-slide-arrow previous" data-screen="${previous}" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="${next}" aria-label="Next slide">▶</button>
  </section>`;
}

function ladderScreen() {
  return `<section class="legacy-lesson-slide loa-slide show-root" aria-label="Ladder of Abstraction">
    <h1>Ladder Of Abstraction</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="loa-mode-icons" aria-hidden="true"><span>D</span><span>R</span><span>H</span><span class="active">L</span></div>
    <div class="loa-tree">
      <svg class="loa-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g class="loa-line-set loa-top-lines"><path d="M54 8 V15 H38 V22"/><path d="M54 15 H68 V22"/></g>
        <g class="loa-line-set loa-blue-lines-1"><path d="M38 26 V33 H28 V37"/><path d="M38 33 H48 V37"/></g>
        <g class="loa-line-set loa-blue-lines-2"><path d="M28 41 V51"/></g>
        <g class="loa-line-set loa-blue-driver-lines"><path d="M48 41 V47 H43 V51"/><path d="M48 47 H60 V51"/></g>
        <g class="loa-line-set loa-blue-lines-3"><path d="M28 56 V62 H21 V66"/><path d="M28 62 H35 V66"/></g>
        <g class="loa-line-set loa-blue-teams-lines"><path d="M60 56 V62 H49 V66"/><path d="M60 62 H66 V66"/></g>
        <g class="loa-line-set loa-blue-direct-lines"><path d="M20 70 V76 H14 V82"/><path d="M20 76 H32 V82"/></g>
        <g class="loa-line-set loa-blue-indirect-lines"><path d="M35 70 V76 H48 V82"/><path d="M35 76 H65 V82"/><path d="M35 76 H81 V82"/></g>
        <g class="loa-line-set loa-orange-lines-1"><path d="M68 26 V33 H51 V37"/><path d="M68 33 H80 V37"/></g>
        <g class="loa-line-set loa-orange-lines-2"><path d="M51 41 V47 H42 V52"/><path d="M51 47 H61 V52"/></g>
        <g class="loa-line-set loa-orange-lines-3"><path d="M43 56 V67"/><path d="M38 71 V77 H27 V82"/><path d="M38 77 H43 V82"/><path d="M38 77 H59 V82"/></g>
        <g class="loa-line-set loa-orange-owner-lines"><path d="M80 41 V52"/><path d="M80 56 V67"/></g>
      </svg>
      <button class="loa-node green root" data-loa-action="next">LOSS<br>CONTROL</button>
      <button class="loa-node blue buyin" data-loa-action="buyin">BUY-IN</button>
      <button class="loa-node orange plan" data-loa-action="plan">PLAN OF<br>ACTION</button>
      <button class="loa-node blue owner-cost" data-loa-action="next">OWNER'S<br>COST</button>
      <button class="loa-node blue driver-incentive" data-loa-action="driver-incentive">DRIVER<br>INCENTIVE</button>
      <button class="loa-node blue spreadsheet" data-loa-action="next">SPREADSHEET</button>
      <button class="loa-node blue bonus-pool" data-loa-action="none">BONUS<br>POOL</button>
      <button class="loa-node blue teams" data-loa-action="teams">TEAMS</button>
      <button class="loa-node blue direct-cost" data-loa-action="direct-cost">DIRECT<br>COST</button>
      <button class="loa-node blue indirect-cost" data-loa-action="indirect-cost">INDIRECT<br>COST</button>
      <button class="loa-node blue a-node" data-loa-action="next">A</button>
      <button class="loa-node blue b-node" data-loa-action="next">B</button>
      <button class="loa-node blue premiums" data-loa-action="next">PREMIUMS</button>
      <button class="loa-node blue deductibles" data-loa-action="next">DEDUCTIBLES</button>
      <button class="loa-node blue pay-overtime" data-loa-action="next">PAY<br>OVERTIME</button>
      <button class="loa-node blue recruiting" data-loa-action="next">RECRUITING</button>
      <button class="loa-node blue training" data-loa-action="next">TRAINING</button>
      <button class="loa-node orange driver-training" data-loa-action="driver-training">DRIVER<br>TRAINING</button>
      <button class="loa-node orange owner-communication" data-loa-action="owner-communication">OWNER<br>COMMUNICATION</button>
      <button class="loa-node orange classroom" data-loa-action="classroom">CLASSROOM<br>INTERACTION</button>
      <button class="loa-node orange av" data-loa-action="none">AV</button>
      <button class="loa-node orange draft-letter" data-loa-action="next">DRAFT<br>LETTER</button>
      <button class="loa-node orange prevent" data-loa-action="next">HOW TO PREVENT<br>ACCIDENTS</button>
      <button class="loa-node orange workmans" data-loa-action="next">BACKING</button>
      <button class="loa-node orange send-drivers" data-loa-action="next">INTERSECTION</button>
      <button class="loa-node orange rear" data-loa-action="next">REAR</button>
      <button class="loa-node orange send-all-drivers" data-loa-action="next">SEND TO<br>ALL DRIVERS</button>
    </div>
    <div class="loa-step-buttons" aria-label="Ladder steps">
      <button data-loa-action="next">1</button>
      <button data-loa-action="next">2</button>
      <button data-loa-action="all">3</button>
    </div>
    <button class="loa-overview" data-loa-action="clear">OVERVIEW</button>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="hooverCompare" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="differentiate" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function differentiateScreen() {
  return `<section class="legacy-lesson-slide differentiate-slide" aria-label="Differentiate">
    <h1>Differentiate</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <svg class="differentiate-swoosh" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="differentiate-swoosh-top" d="M24 39 C42 17 66 4 85 6"/>
      <path class="differentiate-swoosh-mid" d="M18 58 C33 76 66 68 88 56"/>
      <path class="differentiate-swoosh-bottom" d="M24 61 C9 82 24 95 73 84"/>
    </svg>
    <div class="differentiate-boxes" aria-label="Differentiate reveal boxes">
      <button class="differentiate-box" data-differentiate="unique"><span>Unique</span></button>
      <button class="differentiate-box" data-differentiate="process"><span>Better<br>Process</span></button>
      <button class="differentiate-box" data-differentiate="articulate"><span>Articulate</span></button>
    </div>
    <button class="differentiate-clear" data-differentiate="clear">CLEAR</button>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="ladder" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="competition" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function competitionScreen() {
  const rows = Array.from({ length: 9 }, () => `<div class="kyc-row-label"></div>${Array.from({ length: 7 }, () => `<div></div>`).join("")}`).join("");
  return `<section class="legacy-lesson-slide kyc-slide" aria-label="Know Your Competition">
    <h1>Know Your Competition</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="kyc-grid-wrap" aria-label="Proactive Services comparison grid">
      <h2>PROACTIVE SERVICES</h2>
      <svg class="kyc-headers" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="100" x2="12" y2="0"></line>
        <line x1="14.286" y1="100" x2="26.286" y2="0"></line>
        <line x1="28.571" y1="100" x2="40.571" y2="0"></line>
        <line x1="42.857" y1="100" x2="54.857" y2="0"></line>
        <line x1="57.143" y1="100" x2="69.143" y2="0"></line>
        <line x1="71.429" y1="100" x2="83.429" y2="0"></line>
        <line x1="85.714" y1="100" x2="97.714" y2="0"></line>
        <line x1="100" y1="100" x2="112" y2="0"></line>
      </svg>
      <div class="kyc-grid">${rows}</div>
    </div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="differentiate" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="preCall" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function preCallScreen() {
  const buyerBox = () => `<div class="pcs-buyer-card">
    <p>Name:</p>
    <p>Title:</p>
    <p>Buyer Type:</p>
  </div>`;
  return `<section class="legacy-lesson-slide pcs-slide" aria-label="Pre-Call Strategy">
    <h1>Pre-Call Strategy<sup>TM</sup></h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="pcs-field pcs-business"><div>BUSINESS NAME (Prospect)</div></div>
    <div class="pcs-buyers">
      <div class="pcs-buyers-head">BUYERS</div>
      ${buyerBox()}${buyerBox()}${buyerBox()}
    </div>
    <div class="pcs-pain-arrow">
      <div class="pcs-pain-title">TOP 3 "MOST PROBABLE" PAINS</div>
      <span></span><span></span><span></span>
    </div>
    <div class="pcs-field pcs-revenue"><div>$ REVENUE</div></div>
    <div class="pcs-incumbent">
      <div>INCUMBENT</div>
      <p>Agent:</p>
      <p>Agency:</p>
      <p>Carrier:</p>
    </div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="competition" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="knowledgePower" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function knowledgePowerScreen() {
  return `<section class="legacy-lesson-slide kip-slide" aria-label="Knowledge Is Power">
    <h1>Knowledge Is Power – Four Levels Of Knowing</h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="kip-boxes" aria-label="Four levels of knowing">
      <button class="kip-box kip-know" data-kip="know"><span>Know</span></button>
      <button class="kip-box kip-know-about" data-kip="know-about"><span>Know<br>About</span></button>
      <button class="kip-box kip-dont-know" data-kip="dont-know"><span>Don't<br>Know</span></button>
    </div>
    <svg class="kip-wave" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 6 C4 2 8 2 12 6 S20 10 24 6 S32 2 36 6 S44 10 48 6 S56 2 60 6 S68 10 72 6 S80 2 84 6 S96 10 100 4"></path>
    </svg>
    <button class="kip-clear" data-kip="clear">CLEAR</button>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="preCall" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="gamesZones" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function gamesZonesScreen() {
  return `<section class="legacy-lesson-slide games-zones-slide" aria-label="Games and Zones">
    <h1>Games And Zones</h1>
    <p class="games-zones-subtitle">How big of a game are you playing?</p>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="games-zones-stack" aria-label="Games and zones size diagram">
      <div class="games-zone-ball games-zone-big"><span>BIG</span></div>
      <div class="games-zone-divider" aria-hidden="true"></div>
      <div class="games-zone-ball games-zone-medium"><span>MEDIUM</span></div>
      <div class="games-zone-divider" aria-hidden="true"></div>
      <div class="games-zone-ball games-zone-small"><span>SMALL</span></div>
    </div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <button class="legacy-slide-arrow previous" data-screen="knowledgePower" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="rulesWedge" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function rulesWedgeScreen() {
  const rules = [
    "The Law of Physics says that no two objects can occupy the same space at the same time.",
    "Nothing is either good or bad except by comparison.",
    "It is easier to get someone to deny what they have is perfection than to get them to admit there is a problem.",
    "The easiest way to get someone defensive is to talk negatively about a decision they have made.",
    "The more you push them the more they will push back to get even.",
    "The best idea anyone ever heard was the one they thought of themselves.",
    "To gain leverage, never ask for the sale. Make them ask you."
  ];
  const buttons = rules.map((text, index) => {
    const number = index + 1;
    const page = number < 4 ? "one" : "two";
    return `<div class="row-rule row-rule-${number}" data-row-page="${page}">
      <button class="row-circle" data-row-rule="${number}" aria-label="Reveal rule ${number}">${number}</button>
      <p>${text}</p>
    </div>`;
  }).join("");

  return `<section class="legacy-lesson-slide rules-wedge-slide row-page-one" aria-label="Rules of The Wedge">
    <h1>Rules Of The Wedge<sup>®</sup></h1>
    <img class="legacy-slide-logo" src="assets/wedge-logo.gif" alt="The Wedge.net">
    <div class="row-rules">${buttons}</div>
    <div class="legacy-t3-mark" aria-label="T3">T<sup>3</sup></div>
    <div class="row-controls">
      <button class="row-clear" data-row-action="clear">CLEAR</button>
      <button class="row-back" data-row-action="back">BACK</button>
      <button class="row-next" data-row-action="next">NEXT</button>
    </div>
    <button class="legacy-slide-arrow previous" data-screen="gamesZones" aria-label="Previous slide">◀</button>
    <button class="legacy-slide-arrow next" data-screen="salesCall" aria-label="Next slide">▶</button>
    <div class="legacy-slide-footer">
      <p>&copy;Copyright 2004-2026 The Wedge Group. All rights reserved.</p>
      <button data-action="about">about</button>
      <button data-action="home">close</button>
    </div>
  </section>`;
}

function salesCallScreen() {
  return `<section class="legacy-lesson-slide sales-call-slide" aria-label="The Wedge Sales Process">
    <iframe src="sales-call.html" title="The Wedge Sales Process"></iframe>
  </section>`;
}

function openAbout() {
  modalContent.innerHTML = `<span class="eyebrow">About this prototype</span><h2>A modern foundation</h2><p>This browser version recreates the original Presenter’s structure while replacing Flash with accessible HTML, CSS, and JavaScript. It is responsive, keyboard-friendly, and can later be packaged as a Windows application.</p>`;
  modal.showModal();
}


function revealRowRule(slide, number) {
  if (!slide) return;
  const rule = slide.querySelector(`.row-rule-${number}`);
  rule?.classList.add("revealed");
  if (number === 3) slide.classList.add("row-show-next");
}

function rowNext(slide) {
  if (!slide) return;
  slide.classList.remove("row-page-one", "row-show-next");
  slide.classList.add("row-page-two");
  slide.querySelectorAll(".row-rule").forEach(rule => rule.classList.remove("revealed"));
  revealRowRule(slide, 4);
}

function rowBack(slide) {
  if (!slide) return;
  if (slide.classList.contains("row-page-two")) {
    slide.classList.remove("row-page-two");
    slide.classList.add("row-page-one", "row-show-next");
    slide.querySelectorAll(".row-rule").forEach(rule => rule.classList.remove("revealed"));
    [1, 2, 3].forEach(number => revealRowRule(slide, number));
    return;
  }
  slide.querySelectorAll(".row-rule").forEach(rule => rule.classList.remove("revealed"));
  slide.classList.remove("row-show-next");
}

function rowClear(slide) {
  if (!slide) return;
  slide.classList.remove("row-page-two", "row-show-next");
  slide.classList.add("row-page-one");
  slide.querySelectorAll(".row-rule").forEach(rule => rule.classList.remove("revealed"));
}

document.addEventListener("click", event => {
  const target = event.target.closest("button");
  const painModelSlide = event.target.closest(".pain-model-slide");
  const painMemorySlide = event.target.closest(".pain-memory-slide");
  if (painModelSlide && Date.now() < suppressPainModelClickUntil) return;
  if (!target) {
    if (painModelSlide) revealPainModelFromPoint(painModelSlide, event.clientX, event.clientY);
    return;
  }
  if (painModelSlide && target.classList.contains("pain-model-hotspot") && !target.dataset.action && !target.dataset.screen && !target.dataset.painReveal) {
    revealPainModelFromPoint(painModelSlide, event.clientX, event.clientY);
    return;
  }
  if (target.dataset.menuSection) {
    return;
  }
  if (target.dataset.rowRule) {
    revealRowRule(target.closest(".rules-wedge-slide"), Number(target.dataset.rowRule));
    return;
  }
  if (target.dataset.rowAction) {
    const slide = target.closest(".rules-wedge-slide");
    if (target.dataset.rowAction === "next") rowNext(slide);
    if (target.dataset.rowAction === "back") rowBack(slide);
    if (target.dataset.rowAction === "clear") rowClear(slide);
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
  if (target.dataset.component) target.classList.add("revealed");
  if (target.dataset.serviceType) target.classList.add("revealed");
  if (target.dataset.lypBox) {
    clickPainMemoryBox(target.closest(".pain-memory-slide"), target.dataset.lypBox);
    return;
  }
  if (target.dataset.lypReveal) {
    const slide = target.closest(".pain-memory-slide");
    if (target.dataset.lypReveal === "close-dialog") slide?.classList.remove("show-dialog");
    else revealPainMemory(slide, target.dataset.lypReveal);
    return;
  }
  if (target.dataset.loaAction) {
    revealLoa(target.closest(".loa-slide"), target.dataset.loaAction);
    return;
  }
  if (target.dataset.differentiate) {
    const slide = target.closest(".differentiate-slide");
    if (target.dataset.differentiate === "clear") {
      slide?.querySelectorAll(".differentiate-box").forEach(box => box.classList.remove("revealed"));
    } else {
      target.classList.add("revealed");
    }
    return;
  }
  if (target.dataset.kip) {
    const slide = target.closest(".kip-slide");
    if (target.dataset.kip === "clear") {
      slide?.querySelectorAll(".kip-box").forEach(box => box.classList.remove("revealed"));
    } else {
      target.classList.add("revealed");
    }
    return;
  }
  if (target.closest(".kip-slide") && target.classList.contains("next")) {
    navigate("gamesZones");
    return;
  }
  if (target.dataset.zone) {
    const detail = document.querySelector("#games-zone-detail");
    const notes = {
      comfort: "Coaching point: start where the buyer feels safe, then ask a question that gently exposes what is not working.",
      stretch: "Coaching point: this is where The Wedge lives. The buyer begins comparing the incumbent relationship to the problem they now see.",
      danger: "Coaching point: slow down. If the buyer feels pushed, return to questions and let them own the conclusion."
    };
    target.closest(".games-panel")?.querySelectorAll(".games-card").forEach(card => card.classList.remove("revealed"));
    target.classList.add("revealed");
    if (detail) detail.textContent = notes[target.dataset.zone] || "Click a zone to reveal the coaching point.";
    return;
  }
  if (target.dataset.painChoice) {
    checkPainChoice(target.closest(".pain-model-slide"), target.dataset.painChoice);
    return;
  }
  if (target.dataset.painReveal) {
    const slide = target.closest(".pain-model-slide");
    if (target.classList.contains("pain-model-solution-button") && slide?.classList.contains("show-fix")) {
      revealPainModel(slide, "problem-x");
    } else {
      revealPainModel(slide, target.dataset.painReveal);
    }
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
    case "open-pooge": {
      const overlay = document.querySelector(".pooge-overlay");
      overlay.hidden = false;
      overlay.querySelector('[data-action="close-pooge"]').focus();
      break;
    }
    case "close-pooge": {
      document.querySelector(".pooge-overlay").hidden = true;
      document.querySelector(".company-pooge-button")?.focus();
      break;
    }
    case "close-modal": modal.close(); break;
    case "reveal-all": document.querySelectorAll("[data-quadrant]").forEach(el => el.classList.add("revealed")); break;
    case "pain-clear": painStep = 0; render(); break;
    case "pain-reveal": painStep = painStep >= 3 ? 0 : painStep + 1; render(); break;
    case "pain-model-clear": {
      target.closest(".pain-model-slide")?.classList.remove("show-bubble", "show-problem", "show-solution", "show-fix", "show-problem-x", "show-no-solution", "show-forget", "show-condition", ...painChoiceClasses, ...painXoutClasses);
      break;
    }
    case "pain-memory-clear": {
      const slide = target.closest(".pain-memory-slide");
      if (slide) slide.className = "legacy-lesson-slide pain-memory-slide";
      break;
    }
    case "components-clear": {
      document.querySelectorAll(".components-boxes button, .service-oval").forEach(el => el.classList.remove("revealed"));
      break;
    }
  }
});

document.addEventListener("mousedown", event => {
  if (event.target.closest(".pain-memory-slide button")) {
    event.preventDefault();
    return;
  }
  const target = event.target.closest(".legacy-submenu button[data-screen]");
  if (!target) return;
  event.preventDefault();
  suppressPainModelClickUntil = Date.now() + 350;
  navigate(target.dataset.screen);
});

modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });
if (screens.includes(location.hash.slice(1))) current = location.hash.slice(1);
render();
