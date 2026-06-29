const topStages = [
  { id: "rapport", label: "Build<br>Rapport", family: "neutral", objective: "To create an open, comfortable conversation.", script: '"How are you today?"' },
  { id: "fishnet", label: "Fish Net<br>Questions", family: "problem", objective: 'To identify any "pain" within the active memory.', script: '"How are things with your insurance program?"<br>"Have you had any problems with . . ."<ul><li>claims or how they&rsquo;ve been handled?</li><li>service issues?</li><li>anything about coverage that keeps you up at night?</li></ul>' },
  { id: "qualifying", label: "Qualifying<br>Questions", family: "problem", objective: "To determine whether a proactive service is needed.", script: "qualifying-table" },
  { id: "picture", label: "Picture<br>Perfect", family: "problem", objective: "To visualize the difference between perfection and their past experience.", script: "picture-perfect" },
  { id: "takeaway", label: "Take Away", family: "problem", objective: "To get the prospect emotionally involved.", script: '"okay... so having that is not that important..."' }
];

const bottomStages = [
  { id: "vision", label: "Vision Box", family: "solution", objective: "To elicit a concrete and specific deliverable.", script: '"In regard to . . . what would you like to have happen?"' },
  { id: "replay", label: "Replay", family: "solution", objective: "To confirm what they want.", script: '"Here’s what I’m hearing you say you want . . ."' },
  { id: "whiteflag", label: "White<br>Flag", family: "commitment", objective: "To get invited in.", script: '"Okay. There is your game plan. What would you like me to do?"' },
  { id: "transition", label: "Transition", family: "commitment", objective: "To move naturally from agreement to action.", script: '"That’s the easy part. Can we talk about the hard part next logical step would be . . ."' },
  { id: "rehearsal", label: "Rehearsal", family: "commitment", objective: "To justify whether they can fire the incumbent agent.", script: '"Suppose for a moment...8 weeks from now..."' }
];

const decisionStages = [
  { id: "shelf", label: "Shelf", family: "neutral", objective: "A mental shelf for placing proactive service wedges as they are developed.", script: "shelf-script" },
  { id: "gestalt", label: "Gestalt?", family: "neutral", objective: "To determine whether the separate issues have become one larger reason to move forward.", script: "gestalt-definition" },
  { id: "transitionBranch", label: "Transition", family: "neutral", objective: "To get permission to gather additional information.", script: '"Thatâ€™s the easy part. Can we talk about the hard part next logical step would be . . ."' }
];

const reactiveStages = [
  { id: "reactiveWedge", label: "Reactive<br>Wedge", family: "problem", objective: "To get the prospect to see that their agent did not effectively react to the problem.", script: '"When you told your agent you were unhappy with . . . and wanted . . ., what did they say?"' },
  { id: "checkPulse", label: "Check<br>Pulse", family: "problem", objective: "To find out what they did in relationship to what they said they would do.", script: '"How’s it gone so far?"' },
  { id: "reactiveTakeaway", label: "Take Away", family: "problem", objective: "To get the prospect emotionally involved.", script: '"And you’re satisfied with that!"' }
];

const qqServices = [
  {
    id: "claimsReview",
    label: "Claims Review",
    questions: [
      "Have you had any claims?",
      "What kind?",
      "How many?"
    ]
  },
  {
    id: "payrollReview",
    label: "Payroll Review",
    questions: [
      "Growing much?",
      "How much this year over last year?",
      "Have you had to add any people?"
    ]
  },
  {
    id: "buildingValuation",
    label: "Building Valuation",
    questions: [
      "How many buildings are on campus?",
      "How old are they?",
      "Have they been refinanced lately?"
    ]
  },
  {
    id: "benchmark",
    label: "Benchmark",
    questions: [
      "Have you had any turnover?",
      "What % would you say?",
      "When you do an exit interview, what % left to move with a family member out of town? <vs> What % left to find a job locally with better pay & benefits?"
    ]
  },
  {
    id: "wellnessPlan",
    label: "Wellness Plan",
    questions: [
      "What is the general age of your workforce?",
      "What % are highly active <vs> a little sedentary?"
    ]
  }
];

const pictureRecipes = [
  {
    id: "claims",
    menu: "CLAIMS REVIEW",
    title: "CLAIMS REVIEW",
    what: "Claims Review",
    ingredients: "Loss Runs",
    instructions: [
      "Get out the Loss Runs",
      "Scan through open claims",
      "Locate reserves set too high",
      "Develop a plan of action to get them reduced"
    ],
    cameOut: "6-months after renewal",
    scriptInstructions: [
      "The Loss Runs",
      "Scanned through open claims",
      "Located reserves set too high",
      "Developed a plan of action to get them reduced"
    ],
    worry: "Overpaying for your insurance"
  },
  {
    id: "payroll",
    menu: "PAYROLL REVIEW",
    title: "PAYROLL REVIEW",
    what: "Payroll Review",
    ingredients: "Policies with estimated payroll, 941 form",
    instructions: [
      "Get out your policies and turn to the page with the estimated payroll",
      "Get the 941 from your accountant",
      "Compare the actual to the estimated",
      "Make the proper adjustments"
    ],
    cameOut: "6-months after renewal",
    scriptInstructions: [
      "Your policies and turned to the pages with the estimated payroll",
      "Got the 941 from your accountant",
      "Compared the actual to the estimated and made the proper adjustments"
    ],
    worry: "A surprise audit and cash out of pocket"
  },
  {
    id: "benchmark",
    menu: "BENCHMARK",
    title: "BENCHMARK - SCRIPT",
    script: true,
    when: "Your Agent",
    cameOut: "90-days prior to renewal",
    what: "Benchmark you against your peers",
    how: [
      "The Worksheet that matched you against your competitors",
      "that was broken down by:",
      "contribution,",
      "deductible,",
      "and total cost per employee",
      "So you could easily compare yourself to the competition."
    ],
    worry: "Overpaying for your employees benefits or losing your employees to your key competitors"
  },
  {
    id: "market",
    menu: "MARKET ANALYSIS",
    title: "MARKET ANALYSIS",
    what: "Market Analysis",
    ingredients: "Spreadsheet",
    instructions: [
      "Get out your spreadsheet that lists",
      "all carriers",
      "The design",
      "The rate",
      "Total cost"
    ],
    cameOut: "90-days prior to renewal",
    scriptInstructions: [
      "The spreadsheet that lists all carriers",
      "The design",
      "The rate",
      "Total cost"
    ],
    worry: "Overpaying for benefits or getting caught with poor marketing information"
  },
  {
    id: "blank",
    menu: "RECIPE CARD",
    title: "SCRIPT",
    what: "",
    ingredients: "",
    instructions: []
  }
];

const state = { active: null, tool: null, reactive: false, reactiveActive: null, qqService: null, qqMode: null, rehearsalMode: null };
const stage = document.querySelector("#sales-call-stage");
const topFlow = document.querySelector("#top-flow");
const bottomFlow = document.querySelector("#bottom-flow");
const tools = document.querySelector("#stage-tools");
const panel = document.querySelector("#teaching-panel");
const philosophicalStoryButton = document.querySelector("#philosophical-story-button");

function buildFlow(target, items) {
  target.innerHTML = items.map((item, index) => `${index ? '<span class="flow-arrow">→</span>' : ''}<button class="process-node ${item.family}" data-stage="${item.id}">${item.label}</button>`).join("");
}

function getStage(id) {
  return [...topStages, ...bottomStages, ...decisionStages].find(item => item.id === id);
}

function getReactiveStage(id) {
  return reactiveStages.find(item => item.id === id);
}

function getActiveStage() {
  return state.reactiveActive ? getReactiveStage(state.reactiveActive) : getStage(state.active);
}

function selectStage(id) {
  if (!getStage(id)) return;
  state.active = id;
  state.tool = null;
  state.reactive = false;
  state.reactiveActive = null;
  state.qqService = null;
  state.qqMode = null;
  state.rehearsalMode = null;
  panel.hidden = true;
  renderState();
  if (id === "gestalt") showTool("script");
}

function selectReactiveStage(id) {
  if (!state.reactive || !getReactiveStage(id)) return;
  state.reactiveActive = id;
  state.tool = null;
  panel.hidden = true;
  renderState();
}

function positionTools(node, above) {
  const stageRect = stage.getBoundingClientRect();
  const nodeRect = node.getBoundingClientRect();
  tools.style.left = `${(nodeRect.left - stageRect.left) / stageRect.width * 100 + 1.2}%`;
  tools.style.top = above
    ? `${(nodeRect.top - stageRect.top - tools.offsetHeight) / stageRect.height * 100 - 1.1}%`
    : `${(nodeRect.bottom - stageRect.top) / stageRect.height * 100 + 1.3}%`;
}

function positionActiveTools(node, above, activeId, reactive) {
  positionTools(node, above);
  setTimeout(() => {
    const stillActive = reactive ? state.reactiveActive === activeId : state.active === activeId && !state.reactive;
    if (stillActive) positionTools(node, above);
  }, 280);
}

function renderState() {
  document.querySelectorAll(".process-node[data-stage], .diamond[data-stage]").forEach(node => {
    node.classList.toggle("active", !state.reactive && node.dataset.stage === state.active);
    node.classList.remove("muted");
  });
  document.querySelectorAll(".top-flow .flow-arrow").forEach(arrow => arrow.classList.remove("muted"));
  document.querySelector("#reactive-flow")?.remove();
  document.querySelector("#picture-menu")?.remove();

  const bottomActive = !state.reactive && bottomStages.some(item => item.id === state.active);
  stage.classList.toggle("bottom-stage-active", bottomActive);
  stage.classList.toggle("reactive-mode", state.reactive);
  stage.classList.toggle("shelf-mode", !state.reactive && state.active === "shelf");

  if (!state.active) {
    tools.hidden = true;
    panel.hidden = true;
    return;
  }

  let activeNode = null;
  let activeId = state.active;
  let reactiveNode = false;

  if (state.reactive) {
    renderReactiveFlow();
    if (state.reactiveActive) {
      activeId = state.reactiveActive;
      reactiveNode = true;
      activeNode = document.querySelector(`[data-reactive-stage="${state.reactiveActive}"]`);
    }
  } else {
    activeNode = document.querySelector(`.process-node[data-stage="${state.active}"], .diamond[data-stage="${state.active}"]`);
  }

  tools.hidden = !activeNode;
  if (activeNode) positionActiveTools(activeNode, bottomActive, activeId, reactiveNode);
  tools.querySelectorAll("button").forEach(button => button.classList.toggle("selected", button.dataset.tool === state.tool));
  if (!state.reactive && state.active === "picture" && state.tool === "more" && panel.hidden) {
    renderPicturePerfectMenu();
  }
}

function renderReactiveFlow() {
  const branch = document.createElement("div");
  branch.id = "reactive-flow";
  branch.className = "flow";
  branch.innerHTML = reactiveStages.map((item, index) => `${index ? '<span class="flow-arrow">→</span>' : ''}<button class="process-node ${item.family} ${item.id === state.reactiveActive ? 'active' : ''}" data-reactive-stage="${item.id}">${item.label}</button>`).join("");
  stage.appendChild(branch);

  const qualifying = document.querySelector('[data-stage="qualifying"]');
  qualifying?.classList.add("muted");
  qualifying?.previousElementSibling?.classList.add("muted");
  qualifying?.nextElementSibling?.classList.add("muted");

  branch.querySelectorAll("[data-reactive-stage]").forEach(button => {
    button.addEventListener("click", () => selectReactiveStage(button.dataset.reactiveStage));
  });
}

function renderPicturePerfectMenu() {
  document.querySelector("#picture-menu")?.remove();
  const node = document.querySelector('[data-stage="picture"]');
  if (!node) return;

  const stageRect = stage.getBoundingClientRect();
  const nodeRect = node.getBoundingClientRect();
  const menu = document.createElement("div");
  menu.id = "picture-menu";
  menu.innerHTML = pictureRecipes.map(recipe => `<button data-picture-recipe="${recipe.id}">${recipe.menu}</button>`).join("");
  stage.appendChild(menu);
  menu.style.left = `${(nodeRect.left - stageRect.left) / stageRect.width * 100 + 1.6}%`;
  menu.style.top = `${(nodeRect.bottom - stageRect.top) / stageRect.height * 100 + 10.3}%`;
  menu.querySelectorAll("[data-picture-recipe]").forEach(button => {
    button.addEventListener("click", () => {
      const recipe = pictureRecipes.find(item => item.id === button.dataset.pictureRecipe);
      if (!recipe) return;
      panel.hidden = false;
      panel.className = "teaching-panel wide";
      panel.innerHTML = picturePerfectRecipeCard(recipe);
      bindPanelActions();
      document.querySelector("#picture-menu")?.remove();
    });
  });
}

function showTool(tool) {
  const item = getActiveStage();
  if (!item) return;

  document.querySelector("#picture-menu")?.remove();
  document.querySelector("#worksheet-overlay")?.remove();
  stage.classList.remove("worksheet-mode");
  state.tool = tool;
  tools.querySelectorAll("button").forEach(button => button.classList.toggle("selected", button.dataset.tool === tool));
  panel.hidden = false;
  panel.className = "teaching-panel";
  panel.classList.toggle("reactive-panel", Boolean(state.reactiveActive));
  if (item.id !== "qualifying" || tool !== "script") {
    state.qqService = null;
    state.qqMode = null;
  } else if (!state.qqMode) {
    state.qqMode = "script";
  }

  if (tool === "objective") {
    panel.innerHTML = state.reactiveActive
      ? `<p><strong class="objective-inline">OBJECTIVE:</strong> ${item.objective}</p>`
      : `<h2>OBJECTIVE:</h2><p>${item.objective}</p>`;
  } else if (tool === "script") {
    panel.innerHTML = item.script === "qualifying-table"
      ? qualifyingScript()
      : item.script === "picture-perfect"
        ? picturePerfectScript()
        : item.id === "rehearsal"
          ? rehearsalScript()
        : item.script === "gestalt-definition"
          ? gestaltDefinition()
          : item.script === "shelf-script"
            ? shelfScript()
            : `<p>${item.script}</p>${extraActions(item.id)}`;
  } else if (tool === "media") {
    panel.innerHTML = `<h2>VISUAL EXAMPLE</h2><p class="small">Supporting visual for this sales-call stage.</p>${item.id === "fishnet" ? '<div class="panel-actions"><button data-panel-action="active">ACTIVE MEMORY</button><button data-panel-action="reactive">REACTIVE WEDGE</button></div>' : ''}`;
  } else {
    if (item.id === "rapport") {
      openWedgeProcessWorksheet();
      return;
    } else if (item.id === "picture") {
      panel.hidden = true;
      panel.innerHTML = "";
      renderPicturePerfectMenu();
      return;
    } else {
      panel.innerHTML = `<h2>${item.label.replace("<br>", " ")}</h2><p class="small">Use the objective, example language, and supporting visual before moving to the next stage.</p>${extraActions(item.id)}`;
    }
  }

  panel.classList.toggle("wide", item.id === "qualifying" || item.id === "picture");
  panel.classList.toggle("fishnet-dialog", item.id === "fishnet" && tool === "script");
  bindPanelActions();
}

function openWedgeProcessWorksheet() {
  panel.hidden = true;
  panel.innerHTML = "";
  tools.hidden = true;
  stage.classList.add("worksheet-mode");

  const overlay = document.createElement("section");
  overlay.id = "worksheet-overlay";
  overlay.className = "worksheet-overlay";
  overlay.setAttribute("aria-label", "The Wedge Sales Process worksheet");
  overlay.innerHTML = `
    <img src="assets/wedge-process-worksheet.png" alt="The Wedge Sales Process worksheet">
    <button class="worksheet-close" data-worksheet-action="close">CLOSE</button>
  `;
  stage.appendChild(overlay);

  overlay.querySelector("[data-worksheet-action='close']").addEventListener("click", closeWedgeProcessWorksheet);
}

function closeWedgeProcessWorksheet() {
  document.querySelector("#worksheet-overlay")?.remove();
  stage.classList.remove("worksheet-mode");
  state.tool = null;
  renderState();
}

function openPhilosophicalStory() {
  document.querySelector("#philosophical-story-dialog")?.remove();
  panel.hidden = true;
  tools.hidden = true;
  stage.classList.add("philosophical-story-mode");

  const story = document.createElement("section");
  story.id = "philosophical-story-dialog";
  story.className = "philosophical-story-dialog";
  story.setAttribute("role", "dialog");
  story.setAttribute("aria-modal", "true");
  story.setAttribute("aria-labelledby", "philosophical-story-title");
  story.innerHTML = `
    <button class="philosophical-story-close" aria-label="Close Philosophical Story">×</button>
    <h2 id="philosophical-story-title">Philosophical Story</h2>
    <div class="philosophical-story-content">
      <p class="story-lead">What do Buyers Deserve?</p>
      <p>The Difference between Doctor and Dentist</p>
      <p class="story-note">(reactive vs. proactive)</p>
    </div>
  `;
  stage.appendChild(story);
  story.querySelector(".philosophical-story-close").addEventListener("click", closePhilosophicalStory);
}

function closePhilosophicalStory() {
  document.querySelector("#philosophical-story-dialog")?.remove();
  stage.classList.remove("philosophical-story-mode");
  renderState();
}

function extraActions(id) {
  if (id === "fishnet") return '<div class="panel-actions"><button data-panel-action="active">ACTIVE MEMORY</button><button data-panel-action="reactive">REACTIVE WEDGE</button></div>';
  if (id === "vision") return '<div class="panel-actions vision-actions"><button data-vision-action="open">VISION BOX</button><button>TP Menu Story</button></div>';
  return "";
}

function rehearsalScript() {
  const scripts = {
    future: '"Suppose for a moment . . . 8 weeks from now . . ."',
    dilemma: '"That will create a new dilemma, and I am wondering if we can talk about that?"',
    weenie: '"That easy?"',
    prophecy: '"Can I tell you what\'s going to happen?"'
  };
  const active = state.rehearsalMode || "future";
  return `<div class="rehearsal-panel">
    <p>${scripts[active]}</p>
    <div class="rehearsal-actions">
      <button class="${active === "future" ? "selected" : ""}" data-rehearsal-action="future">FUTURE FACE<br>CARROT</button>
      <button class="${active === "dilemma" ? "selected" : ""}" data-rehearsal-action="dilemma">DILEMMA</button>
      <button class="${active === "weenie" ? "selected" : ""}" data-rehearsal-action="weenie">WEENIE</button>
      <button class="${active === "prophecy" ? "selected" : ""}" data-rehearsal-action="prophecy">PROPHECY</button>
    </div>
  </div>`;
}

function visionBoxDiagram() {
  return `<div class="vision-box-dialog">
    <button class="vision-close" data-vision-action="close" aria-label="Close Vision Box">×</button>
    <div class="vision-identify" data-vision-reveal="what">IDENTIFY<br>PROACTIVE SERVICE</div>
    <span class="vision-arrow vision-arrow-top"></span>
    <button class="vision-word vision-what" data-vision-part="what">WHAT</button>
    <button class="vision-word vision-why" data-vision-part="why">WHY</button>
    <button class="vision-word vision-where" data-vision-part="where">WHERE</button>
    <button class="vision-word vision-who" data-vision-part="who">WHO</button>
    <button class="vision-word vision-how" data-vision-part="how">HOW</button>
    <button class="vision-word vision-when" data-vision-part="when">WHEN</button>
    <div class="vision-core" aria-label="Vision Box"></div>
    <div class="vision-detail vision-purpose" data-vision-reveal="why">PURPOSE<br>+/-</div>
    <div class="vision-detail vision-location" data-vision-reveal="where">LOCATION</div>
    <div class="vision-detail vision-agenda" data-vision-reveal="how">- AGENDA<br>- PROCESS</div>
    <div class="vision-detail vision-time" data-vision-reveal="when">- TIME<br>- DATE</div>
    <div class="vision-detail vision-people" data-vision-reveal="who">IDENTIFY<br>PEOPLE INVOLVED</div>
    <div class="vision-final">
      <p>▶ Why is having it done this way important?</p>
      <p>▶ What are you afraid would go wrong if it's not done this way?</p>
    </div>
  </div>`;
}

function qualifyingTableLegacy() {
  return `<div class="three-column"><div><strong style="color:#079b10;font-size:1.85cqw">What would have to be going on to need this service?</strong></div><div><div><strong>Qualifying Questions</strong><br><br>What is the general age of your workforce?<br><br>What % are highly active versus sedentary?</div></div><div><div><strong>Proactive Services</strong><br><br>• Claims Review<br><br>• Payroll Review<br><br>• Building Valuation<br><br>• Benchmark<br><br>• Wellness Plan</div></div></div>`;
}

function qualifyingScript() {
  if (state.qqMode === "shelfBack") {
    return `<div class="qualifying-script">
      <p>"Are you growing much?"</p>
      <p>"How much?"</p>
    </div>`;
  }
  const optionSelected = state.qqMode === "option";
  return `<div class="qualifying-script">
    <p>"Have you actually had any claims?"</p>
    <p>"What kind?"</p>
    <div class="qq-script-actions">
      <button data-qq-action="qq">QQ</button>
      <button class="${optionSelected ? "selected" : ""}" data-qq-action="option">OPTION</button>
    </div>
  </div>`;
}

function gestaltDefinition() {
  return `<div class="gestalt-panel">
    <p><strong>TIPPING POINT:</strong></p>
    <p>A "tipping point" is the moment in a situation... when a small, cumulative change triggers a major shift.</p>
  </div>`;
}

function shelfScript() {
  return `<div class="shelf-script-panel">
    <p>Can we put that on the shelf for a moment and let me ask you this?</p>
    <button class="back-to-qq" data-shelf-action="back-to-qq">BACK TO QQ</button>
  </div>`;
}

function qualifyingTable() {
  const selected = qqServices.find(service => service.id === state.qqService);
  const serviceButtons = qqServices.map(service => `<button class="${service.id === state.qqService ? "selected" : ""}" data-qq-service="${service.id}">${service.label}</button>`).join("");
  const middle = selected
    ? selected.questions.map(question => `<p>${question}</p>`).join("")
    : "";

  return `<div class="three-column qualifying-table">
    <div class="qq-prompt"><strong>What would have to<br>be going on to need<br>this service?</strong></div>
    <div class="qq-middle"><header>Qualifying Questions</header><div>${middle}</div></div>
    <div class="qq-services"><strong>Proactive Services</strong>${serviceButtons}</div>
    <button class="qq-close" data-qq-action="close">×</button>
  </div>`;
}

function picturePerfectScript() {
  return `<div class="picture-perfect-panel">
    <div class="picture-perfect-copy">
      <p>"When your agent came out</p>
      <p>6 months after renewal to do a . . .</p>
      <p>So you would not have to worry</p>
      <p>about . . .</p>
    </div>
    <img class="picture-perfect-conditions" src="assets/picture-perfect-conditions.png" alt="Active and latent conditions illustration">
    <button class="pp-button" data-pp-action="recipe" data-picture-recipe="claims">PP</button>
  </div>`;
}

function picturePerfectRecipeCard(recipe = pictureRecipes[0]) {
  if (recipe.script) return picturePerfectScriptCard(recipe);
  const rows = [
    `<div class="recipe-row recipe-what"><strong>WHAT:</strong><span>${recipe.what}</span></div>`,
    `<div class="recipe-row"><strong>INGREDIENTS:</strong><span>${recipe.ingredients}</span></div>`,
    `<div class="recipe-row"></div>`,
    `<div class="recipe-row"><strong>INSTRUCTIONS (How):</strong></div>`,
    ...recipe.instructions.map(item => `<div class="recipe-row">${item}</div>`)
  ];
  while (rows.length < 11) rows.push('<div class="recipe-row"></div>');

  return `<div class="picture-recipe-card">
    <h2>PICTURE PERFECT RECIPE CARD</h2>
    <h3>${recipe.title}</h3>
    <div class="recipe-sheet">${rows.join("")}</div>
    <button class="wedge-script-arrow" data-pp-action="wedge-script" data-picture-recipe="${recipe.id}">To Wedge<br>Script</button>
    <button class="recipe-previous" data-pp-action="menu">PREVIOUS</button>
    <button class="recipe-clear" data-pp-action="clear">CLEAR</button>
    <button class="recipe-overview" data-pp-action="overview">OVERVIEW</button>
  </div>`;
}

function picturePerfectScriptCard(recipe) {
  const instructions = recipe.how || recipe.scriptInstructions || recipe.instructions || [];
  const title = recipe.title.includes("SCRIPT") ? recipe.title : `${recipe.title} - SCRIPT`;
  return `<div class="picture-recipe-card picture-script-card">
    <h2>PICTURE PERFECT RECIPE CARD</h2>
    <h3>${title}</h3>
    <div class="script-fields">
      <label>WHEN</label><div class="script-box">${recipe.when || "Your Agent"}</div><span>(WHO) Incumbent</span>
      <label>CAME OUT</label><div class="script-box">${recipe.cameOut || "6-months after renewal"}</div><span>(WHEN) Specific Time</span>
      <label>TO DO</label><div class="script-box script-yellow script-large">${recipe.what}</div><span>(WHAT) Event</span>
      <label>AND THEY<br>GOT OUT</label><div class="script-box script-yellow script-how">${instructions.map(line => `<p>${line}</p>`).join("")}</div><span>(HOW) Instructions</span>
      <label>SO THAT YOU<br>WOULDN'T HAVE<br>TO WORRY<br>ABOUT</label><div class="script-box script-worry">${recipe.worry}</div><span>(WHY) Go Negative<br><b>PAIN</b></span>
    </div>
    <div class="script-curious">I'M CURIOUS, WERE YOU<br>COMFORTABLE WITH HOW<br>THEY WENT THROUGH<br>THE PROCESS?</div>
    <button class="recipe-close" data-pp-action="menu">CLOSE</button>
    <button class="recipe-previous" data-pp-action="recipe" data-picture-recipe="${recipe.id}">PREVIOUS</button>
    <button class="recipe-clear" data-pp-action="clear">CLEAR</button>
    <button class="recipe-overview" data-pp-action="overview">OVERVIEW</button>
  </div>`;
}

function bindPanelActions() {
  panel.querySelectorAll("[data-rehearsal-action]").forEach(button => button.addEventListener("click", () => {
    state.rehearsalMode = button.dataset.rehearsalAction;
    panel.innerHTML = rehearsalScript();
    bindPanelActions();
  }));

  panel.querySelectorAll("[data-vision-action]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.visionAction === "open") {
      panel.className = "teaching-panel wide vision-panel";
      panel.innerHTML = visionBoxDiagram();
      bindPanelActions();
    } else if (button.dataset.visionAction === "close") {
      showTool("script");
    }
  }));

  panel.querySelectorAll("[data-vision-part]").forEach(button => button.addEventListener("click", () => {
    const part = button.dataset.visionPart;
    button.classList.add("selected");
    panel.querySelectorAll(`[data-vision-reveal="${part}"]`).forEach(detail => detail.classList.add("revealed"));
    if (part === "why") panel.querySelector(".vision-final")?.classList.add("revealed");
  }));

  panel.querySelectorAll("[data-panel-action]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.panelAction === "reactive") {
      state.reactive = true;
      state.reactiveActive = null;
      state.tool = null;
      panel.hidden = true;
      renderState();
    } else {
      panel.innerHTML = "<p>Active memory identifies problems the prospect already recognizes.</p>";
    }
  }));

  panel.querySelectorAll("[data-qq-service]").forEach(button => button.addEventListener("click", () => {
    state.qqService = button.dataset.qqService;
    state.qqMode = "qq";
    panel.innerHTML = qualifyingTable();
    bindPanelActions();
  }));

  panel.querySelectorAll("[data-qq-action]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.qqAction === "qq") {
      state.qqMode = "qq";
      state.qqService = null;
      panel.innerHTML = qualifyingTable();
    } else if (button.dataset.qqAction === "option") {
      state.qqMode = "option";
      state.qqService = null;
      panel.innerHTML = qualifyingScript();
    } else {
      state.qqMode = "script";
      state.qqService = null;
      panel.innerHTML = qualifyingScript();
    }
    bindPanelActions();
  }));

  panel.querySelectorAll("[data-shelf-action]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.shelfAction === "back-to-qq") {
      state.active = "qualifying";
      state.tool = "script";
      state.reactive = false;
      state.reactiveActive = null;
      state.qqMode = "shelfBack";
      state.qqService = null;
      renderState();
      panel.hidden = false;
      panel.className = "teaching-panel wide";
      panel.innerHTML = qualifyingScript();
      bindPanelActions();
    }
  }));

  panel.querySelectorAll("[data-pp-action]").forEach(button => button.addEventListener("click", () => {
    const action = button.dataset.ppAction;
    if (action === "recipe") {
      const recipe = pictureRecipes.find(item => item.id === button.dataset.pictureRecipe) || pictureRecipes[0];
      panel.innerHTML = picturePerfectRecipeCard(recipe);
    } else if (action === "wedge-script") {
      const recipe = pictureRecipes.find(item => item.id === button.dataset.pictureRecipe) || pictureRecipes[0];
      panel.innerHTML = picturePerfectScriptCard(recipe);
    } else if (action === "menu") {
      panel.hidden = true;
      panel.innerHTML = "";
      renderPicturePerfectMenu();
      return;
    } else if (action === "clear") {
      clearAll();
      return;
    } else if (action === "overview") {
      overview();
      return;
    } else {
      panel.innerHTML = state.tool === "more" ? picturePerfectRecipeCard(pictureRecipes[0]) : picturePerfectScript();
    }
    bindPanelActions();
  }));
}

function clearAll() {
  document.querySelector("#worksheet-overlay")?.remove();
  document.querySelector("#philosophical-story-dialog")?.remove();
  stage.classList.remove("worksheet-mode");
  stage.classList.remove("philosophical-story-mode");
  state.active = null;
  state.tool = null;
  state.reactive = false;
  state.reactiveActive = null;
  state.qqService = null;
  state.qqMode = null;
  state.rehearsalMode = null;
  panel.className = "teaching-panel";
  panel.innerHTML = "";
  renderState();
}

function overview() {
  clearAll();
  const first = document.querySelector('[data-stage="rapport"]');
  first.classList.add("active");
  setTimeout(() => first.classList.remove("active"), 650);
}

function utility(type) {
  const dialog = document.querySelector("#utility-dialog");
  document.querySelector("#utility-title").textContent = type === "calculator" ? "Calculator" : "About";
  document.querySelector("#utility-content").innerHTML = type === "calculator" ? "<p>The presenter calculator will be connected here.</p>" : "<p>Sales Call Structure — HTML replica of the original Flash interaction.</p>";
  dialog.showModal();
}

buildFlow(topFlow, topStages);
buildFlow(bottomFlow, bottomStages);
document.querySelectorAll("[data-stage]").forEach(button => button.addEventListener("click", () => selectStage(button.dataset.stage)));
tools.querySelectorAll("button").forEach(button => button.addEventListener("click", () => showTool(button.dataset.tool)));
document.querySelector("#clear-button").addEventListener("click", clearAll);
document.querySelector("#overview-button").addEventListener("click", overview);
document.querySelectorAll("[data-utility]").forEach(button => button.addEventListener("click", () => utility(button.dataset.utility)));
philosophicalStoryButton.addEventListener("click", openPhilosophicalStory);
window.addEventListener("resize", () => state.active && renderState());
