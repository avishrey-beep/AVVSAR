/* =========================================================
   LOGIN GATE (prototype — stored locally in this browser only)
   ========================================================= */
const LOGIN_KEY = "avsar_user";
const loginScreen = document.getElementById("loginScreen");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const guestBtn = document.getElementById("guestBtn");
const navUser = document.getElementById("navUser");
const logoutBtn = document.getElementById("logoutBtn");

function showApp(user){
  document.body.classList.add("logged-in");
  document.body.classList.remove("pre-login");
  navUser.textContent = user.name ? `Hi, ${user.name.split(" ")[0]}` : "Hi, guest";
}

function logIn(user){
  try { localStorage.setItem(LOGIN_KEY, JSON.stringify(user)); } catch (e) { /* storage unavailable, continue anyway */ }
  showApp(user);
}

function logOut(){
  try { localStorage.removeItem(LOGIN_KEY); } catch (e) { /* ignore */ }
  document.body.classList.remove("logged-in");
  document.body.classList.add("pre-login");
  loginForm.reset();
  loginError.hidden = true;
  document.getElementById("loginName").focus();
}

/* restore existing session on load */
(function restoreSession(){
  try {
    const saved = JSON.parse(localStorage.getItem(LOGIN_KEY) || "null");
    if (saved) showApp(saved);
  } catch (e) { /* corrupted or unavailable storage, show login screen */ }
})();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("loginName").value.trim();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || password.length < 6){
    loginError.textContent = !name
      ? "Enter your name to continue."
      : !emailOk
        ? "Enter a valid email address."
        : "Password needs to be at least 6 characters.";
    loginError.hidden = false;
    return;
  }
  loginError.hidden = true;
  logIn({ name, email });
});

guestBtn.addEventListener("click", () => logIn({ name: "Guest", email: "" }));
logoutBtn.addEventListener("click", logOut);

/* =========================================================
   AVSAR — sample scholarship dataset (illustrative, for demo)
   ========================================================= */
const SCHOLARSHIPS = [
  {
    id: "nsp-pre-matric-sc",
    name: "Pre-Matric Scholarship for SC Students",
    provider: "Ministry of Social Justice & Empowerment (National Scholarship Portal)",
    type: "need",
    levels: ["class10"],
    categories: ["sc"],
    minScore: 0,
    maxIncome: 250000,
    gender: "any",
    states: "all",
    amount: "₹3,500 – ₹7,000 / year",
    deadline: "31 Oct",
    documents: ["Caste certificate", "Income certificate", "Previous year marksheet", "Bank passbook copy", "Aadhaar card"],
    steps: [
      "Register on the National Scholarship Portal (scholarships.gov.in)",
      "Fill the pre-matric SC application and upload documents",
      "Get the form verified by your school",
      "Track status on the portal until disbursal"
    ]
  },
  {
    id: "nsp-post-matric-st",
    name: "Post-Matric Scholarship for ST Students",
    provider: "Ministry of Tribal Affairs (National Scholarship Portal)",
    type: "need",
    levels: ["class12", "ug", "pg", "diploma"],
    categories: ["st"],
    minScore: 0,
    maxIncome: 250000,
    gender: "any",
    states: "all",
    amount: "Tuition fee + maintenance allowance",
    deadline: "30 Nov",
    documents: ["Tribe certificate", "Income certificate", "Bonafide certificate from institute", "Fee receipt", "Bank passbook copy"],
    steps: [
      "Register as a fresh applicant on the NSP",
      "Select 'Post-Matric ST Scholarship' scheme",
      "Upload institute-verified documents",
      "Institute verifies, then district & state approve"
    ]
  },
  {
    id: "ews-central-sector",
    name: "Central Sector Scheme for EWS Students",
    provider: "Department of Higher Education",
    type: "both",
    levels: ["ug"],
    categories: ["ews", "general"],
    minScore: 80,
    maxIncome: 800000,
    gender: "any",
    states: "all",
    amount: "₹10,000 / year",
    deadline: "15 Oct",
    documents: ["Class 12 marksheet", "EWS/income certificate", "College admission proof", "Bank passbook copy"],
    steps: [
      "Confirm you scored 80%+ in Class 12 boards",
      "Apply through NSP under Central Sector Scheme",
      "Attach EWS or income certificate",
      "Renew every year by maintaining 50%+ in college"
    ]
  },
  {
    id: "obc-post-matric",
    name: "Post-Matric Scholarship for OBC Students",
    provider: "Ministry of Social Justice & Empowerment",
    type: "need",
    levels: ["class12", "ug", "pg"],
    categories: ["obc"],
    minScore: 0,
    maxIncome: 150000,
    gender: "any",
    states: "all",
    amount: "Course fee + monthly allowance",
    deadline: "20 Nov",
    documents: ["OBC-NCL certificate", "Income certificate (current year)", "Institute bonafide letter", "Bank passbook copy"],
    steps: [
      "Get an updated OBC non-creamy-layer certificate",
      "Apply on NSP under state OBC scheme",
      "Institute verifies enrolment and fee structure",
      "Scholarship disbursed directly to bank account"
    ]
  },
  {
    id: "minority-merit-cum-means",
    name: "Merit-cum-Means Scholarship for Minorities",
    provider: "Ministry of Minority Affairs",
    type: "both",
    levels: ["ug", "pg"],
    categories: ["minority"],
    minScore: 50,
    maxIncome: 250000,
    gender: "any",
    states: "all",
    amount: "Up to ₹20,000 / year",
    deadline: "30 Nov",
    documents: ["Minority community certificate", "Income certificate", "Previous exam marksheet", "Course fee structure"],
    steps: [
      "Check your community is listed as a notified minority",
      "Register on NSP and select the scheme",
      "Upload marksheet and income proof",
      "Institute + district nodal officer verify the form"
    ]
  },
  {
    id: "pragati-girls-technical",
    name: "AICTE Pragati Scholarship for Girl Students",
    provider: "All India Council for Technical Education",
    type: "need",
    levels: ["ug", "diploma"],
    categories: ["general", "obc", "sc", "st", "ews", "minority"],
    minScore: 0,
    maxIncome: 800000,
    gender: "girl",
    states: "all",
    amount: "₹50,000 / year",
    deadline: "31 Dec",
    documents: ["Admission proof in AICTE-approved college", "Income certificate", "Aadhaar card", "Bank passbook copy"],
    steps: [
      "Confirm your college is AICTE-approved",
      "Apply via AICTE's Pragati portal",
      "Only one girl child per family among two siblings is eligible",
      "Renewal depends on passing without a backlog"
    ]
  },
  {
    id: "inspire-scheme",
    name: "INSPIRE Scholarship for Higher Education",
    provider: "Department of Science & Technology",
    type: "merit",
    levels: ["ug"],
    categories: ["general", "obc", "sc", "st", "ews", "minority"],
    minScore: 85,
    maxIncome: null,
    gender: "any",
    states: "all",
    amount: "₹80,000 / year",
    deadline: "15 Sep",
    documents: ["Class 12 marksheet (top 1% or 85%+)", "Admission proof in a natural/basic science course", "Bank passbook copy"],
    steps: [
      "Check you're in the top 1% of your board or scored 85%+",
      "Enrol in a B.Sc / integrated M.Sc science course",
      "Register on the INSPIRE portal (online-inspire.gov.in)",
      "Maintain performance for yearly renewal"
    ]
  },
  {
    id: "state-topper-up",
    name: "Uttar Pradesh Board Topper Scholarship",
    provider: "UP State Government",
    type: "merit",
    levels: ["class12"],
    categories: ["general", "obc", "sc", "st", "ews"],
    minScore: 90,
    maxIncome: null,
    gender: "any",
    states: ["Uttar Pradesh"],
    amount: "₹25,000 one-time",
    deadline: "5 Sep",
    documents: ["Board marksheet", "Domicile certificate", "Bank passbook copy"],
    steps: [
      "Confirm your board result places you in the top rank list",
      "Apply through the UP scholarship portal",
      "Submit domicile and marksheet",
      "Verification at district education office"
    ]
  },
  {
    id: "maharashtra-ews-fee",
    name: "Maharashtra EBC Fee Waiver Scheme",
    provider: "Government of Maharashtra",
    type: "need",
    levels: ["ug", "diploma"],
    categories: ["ews", "general"],
    minScore: 0,
    maxIncome: 800000,
    gender: "any",
    states: ["Maharashtra"],
    amount: "Up to 50% tuition fee waived",
    deadline: "Rolling, before semester fee due date",
    documents: ["Income certificate", "Domicile certificate", "College fee receipt"],
    steps: [
      "Check the fee waiver is offered by your college",
      "Apply through the Maharashtra scholarship portal (MahaDBT)",
      "Upload income and domicile proof",
      "College adjusts the waiver directly in your fee"
    ]
  },
  {
    id: "kvpy-fellowship",
    name: "KVPY-style Research Fellowship (Basic Sciences)",
    provider: "Indian Institute of Science",
    type: "merit",
    levels: ["ug", "pg"],
    categories: ["general", "obc", "sc", "st", "ews", "minority"],
    minScore: 75,
    maxIncome: null,
    gender: "any",
    states: "all",
    amount: "₹5,000 – ₹7,000 / month + contingency grant",
    deadline: "1 Sep",
    documents: ["Marksheet", "Aptitude test score", "Interview call letter"],
    steps: [
      "Appear for the national aptitude test",
      "Clear the interview round",
      "Enrol in a basic science undergraduate course",
      "Fellowship disbursed monthly during the course"
    ]
  },
  {
    id: "dhfl-need-based-ug",
    name: "Need-Based UG Scholarship (Private Trust)",
    provider: "Independent Education Trust",
    type: "need",
    levels: ["ug"],
    categories: ["general", "obc", "sc", "st", "ews", "minority"],
    minScore: 60,
    maxIncome: 300000,
    gender: "any",
    states: "all",
    amount: "₹40,000 / year",
    deadline: "1 Oct",
    documents: ["Income certificate", "Marksheet", "Letter of recommendation", "Bank passbook copy"],
    steps: [
      "Write a short statement of financial need",
      "Get one letter of recommendation from a teacher",
      "Submit application through the trust's online form",
      "Shortlisted students attend a brief telephonic interview"
    ]
  },
  {
    id: "girl-child-diploma",
    name: "Girl Child Diploma Scholarship",
    provider: "State Directorate of Technical Education",
    type: "need",
    levels: ["diploma"],
    categories: ["general", "obc", "sc", "st", "ews"],
    minScore: 0,
    maxIncome: 200000,
    gender: "girl",
    states: "all",
    amount: "₹15,000 / year",
    deadline: "20 Oct",
    documents: ["Income certificate", "Admission proof", "Aadhaar card"],
    steps: [
      "Confirm enrolment in a government polytechnic",
      "Apply on the state technical education portal",
      "Upload income and admission proof",
      "Verification by polytechnic principal"
    ]
  },
  {
    id: "phd-jrf-ugc",
    name: "UGC Junior Research Fellowship",
    provider: "University Grants Commission",
    type: "merit",
    levels: ["phd"],
    categories: ["general", "obc", "sc", "st", "ews", "minority"],
    minScore: 55,
    maxIncome: null,
    gender: "any",
    states: "all",
    amount: "₹37,000 / month + HRA",
    deadline: "As per NTA-UGC NET cycle",
    documents: ["NET/JRF scorecard", "PhD provisional admission letter", "Bank passbook copy"],
    steps: [
      "Clear UGC-NET with JRF tag",
      "Secure provisional PhD admission within 2 years",
      "Register your fellowship with the host university",
      "Fellowship paid monthly through the university"
    ]
  },
  {
    id: "pm-usp-higher-ed",
    name: "PM-USP Central Sector Scheme for College & University Students",
    provider: "Department of Higher Education (Ministry of Education)",
    type: "merit",
    levels: ["ug", "pg"],
    categories: ["general", "obc", "sc", "st", "ews"],
    minScore: 80,
    maxIncome: 450000,
    gender: "any",
    states: "all",
    amount: "₹12,000 – ₹20,000 / year",
    deadline: "15 Jan",
    documents: ["Class 12 board marksheet", "Income certificate", "Institute bonafide certificate", "Bank passbook copy", "Aadhaar card"],
    steps: [
      "Verify top-20th percentile board cutoff eligibility",
      "Register on National Scholarship Portal (scholarships.gov.in)",
      "Submit online verification form to college nodal officer",
      "State board & Ministry verify before DBT disbursal"
    ]
  },
  {
    id: "dbt-jrf-biotech",
    name: "DBT-JRF Fellowship in Biotechnology & Life Sciences",
    provider: "Department of Biotechnology (Govt. of India)",
    type: "merit",
    levels: ["phd"],
    categories: ["general", "obc", "sc", "st", "ews"],
    minScore: 60,
    maxIncome: 0,
    gender: "any",
    states: "all",
    amount: "₹37,000 / month + HRA",
    deadline: "28 Feb",
    documents: ["Master degree certificate", "BET examination scorecard", "Category certificate", "Provisional PhD enrollment letter"],
    steps: [
      "Qualify the Biotechnology Eligibility Test (BET)",
      "Obtain DBT-JRF award letter",
      "Join PhD program in an accredited institution",
      "Activate monthly DBT research stipend"
    ]
  }
];

/* deadline dates (ISO) for the urgency radar — kept separate from the
   display-friendly `deadline` string above so the radar can compute
   real day-counts without reparsing free text. */
const DEADLINE_INFO = {
  "nsp-pre-matric-sc":        { date: "2026-10-31" },
  "nsp-post-matric-st":       { date: "2026-11-30" },
  "ews-central-sector":       { date: "2026-10-15" },
  "obc-post-matric":          { date: "2026-11-20" },
  "minority-merit-cum-means": { date: "2026-11-30" },
  "pragati-girls-technical":  { date: "2026-12-31" },
  "inspire-scheme":           { date: "2026-09-15" },
  "state-topper-up":          { date: "2026-09-05" },
  "maharashtra-ews-fee":      { rolling: true },
  "kvpy-fellowship":          { date: "2026-09-01" },
  "dhfl-need-based-ug":       { date: "2026-10-01" },
  "girl-child-diploma":       { date: "2026-10-20" },
  "phd-jrf-ugc":              { rolling: true },
  "pm-usp-higher-ed":         { date: "2027-01-15" },
  "dbt-jrf-biotech":          { date: "2027-02-28" }
};
SCHOLARSHIPS.forEach(s => {
  const info = DEADLINE_INFO[s.id] || {};
  s.deadlineDate = info.date || null;
  s.rolling = !!info.rolling;
});

/* =========================================================
   DEADLINE RADAR — urgency classification + rendering
   ========================================================= */
const DAY_MS = 86400000;

function getUrgency(s){
  if (s.rolling) return { level: "rolling", label: "Rolling / ongoing", days: null };
  const deadline = new Date(s.deadlineDate + "T23:59:59");
  const days = Math.ceil((deadline - new Date()) / DAY_MS);
  if (days < 0) return { level: "red", label: "Closed for this cycle", days };
  if (days <= 14) return { level: "red", label: `${days} day${days === 1 ? "" : "s"} left`, days };
  if (days <= 60) return { level: "yellow", label: `${days} days left`, days };
  return { level: "green", label: `${days} days left`, days };
}

function renderRadar(){
  const track = document.getElementById("radarTrack");
  if (!track) return;
  const sorted = [...SCHOLARSHIPS].sort((a, b) => {
    const da = getUrgency(a).days;
    const db = getUrgency(b).days;
    return (da === null ? Infinity : da) - (db === null ? Infinity : db);
  });
  track.innerHTML = sorted.map(s => {
    const u = getUrgency(s);
    return `
      <div class="radar-card ${u.level}" data-id="${s.id}" role="button" tabindex="0">
        <div class="radar-card-name">${s.name}</div>
        <div class="radar-card-days ${u.level}">${u.label}</div>
      </div>`;
  }).join("");
  track.querySelectorAll(".radar-card").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.id));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter") openModal(card.dataset.id); });
  });
}

/* =========================================================
   FILTER MATCHING
   ========================================================= */
function scholarshipMatches(s, u){
  if (!s.levels.includes(u.level)) return false;
  if (!s.categories.includes(u.category)) return false;

  if (u.type !== "either" && s.type !== "both" && s.type !== u.type) return false;

  if (s.minScore && u.score < s.minScore) return false;

  if ((s.type === "need" || s.type === "both") && s.maxIncome != null && u.income > s.maxIncome) return false;

  if (s.gender !== "any" && u.gender !== "any" && s.gender !== u.gender) return false;

  if (s.states !== "all" && u.state !== "all" && !s.states.includes(u.state)) return false;

  return true;
}

const typeLabel = { merit: "Merit-based", need: "Need-based", both: "Merit or need-based" };
const levelLabel = { class10: "Class 10", class12: "Class 12", ug: "Undergraduate", pg: "Postgraduate", phd: "PhD", diploma: "Diploma / ITI" };

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
}

/* =========================================================
   EXPLAINABLE AI — "why this matched you"
   ========================================================= */
function explainMatch(s, u){
  const reasons = [];
  reasons.push(`You're at ${levelLabel[u.level]} level, which this scheme covers.`);
  reasons.push(`Your category (${u.category.toUpperCase()}) is on its accepted list.`);
  if (s.minScore > 0){
    reasons.push(`Your score of ${u.score}% clears its ${s.minScore}% minimum.`);
  } else {
    reasons.push(`It has no minimum score requirement.`);
  }
  if ((s.type === "need" || s.type === "both") && s.maxIncome != null){
    reasons.push(`Your family income (₹${u.income.toLocaleString("en-IN")}) is within its ₹${s.maxIncome.toLocaleString("en-IN")} cap.`);
  } else if (s.type === "merit"){
    reasons.push(`It's purely merit-based, so income isn't a factor.`);
  }
  if (s.gender !== "any"){
    reasons.push(`It's reserved for ${s.gender === "girl" ? "girl students" : "your selected gender"}, which matches.`);
  }
  if (Array.isArray(s.states)){
    reasons.push(`Restricted to ${s.states.join(", ")} — matches your domicile.`);
  } else {
    reasons.push(`Open to applicants from any state.`);
  }
  return reasons;
}

/* =========================================================
   MATCH STRENGTH — a simple transparent heuristic, not a
   guarantee. Rewards margin above the minimum bar, not just
   a pass/fail, so two "eligible" results can be told apart.
   ========================================================= */
function computeMatchStrength(s, u){
  let score = 0;

  if (s.minScore > 0){
    const margin = u.score - s.minScore;
    score += Math.max(6, Math.min(30, 12 + margin));
  } else {
    score += 26;
  }

  if (s.maxIncome != null && (s.type === "need" || s.type === "both")){
    const room = (s.maxIncome - u.income) / s.maxIncome;
    score += Math.max(6, Math.min(30, room * 30));
  } else {
    score += 26;
  }

  score += s.categories.length <= 2 ? 20 : s.categories.length <= 4 ? 15 : 10;
  score += Array.isArray(s.states) ? 20 : 14;

  return Math.max(35, Math.min(98, Math.round(score)));
}

function matchBand(pct){
  if (pct >= 75) return { cls: "", label: "Strong match" };
  if (pct >= 50) return { cls: "medium", label: "Good match" };
  return { cls: "low", label: "Possible match" };
}

const RING_R = 14;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R;

/* =========================================================
   DOCUMENT INTELLIGENCE — a shared, persisted checklist of
   documents across whatever is currently matched.
   ========================================================= */
const DOC_KEY = "avsar_docs";
let docState = {};
try { docState = JSON.parse(localStorage.getItem(DOC_KEY) || "{}"); } catch (e) { docState = {}; }

function docKeyFor(text){ return text.trim().toLowerCase(); }
function saveDocState(){ try { localStorage.setItem(DOC_KEY, JSON.stringify(docState)); } catch (e) { /* storage unavailable */ } }

function docReadyForScholarship(s){
  const total = s.documents.length;
  const done = s.documents.filter(d => docState[docKeyFor(d)]).length;
  return { done, total };
}

function updateDocProgress(uniqueDocs){
  const total = uniqueDocs.length;
  const done = uniqueDocs.filter(d => docState[docKeyFor(d)]).length;
  const fill = document.getElementById("docProgressFill");
  const label = document.getElementById("docProgressLabel");
  if (fill) fill.style.width = total ? `${(done / total) * 100}%` : "0%";
  if (label) label.textContent = `${done} of ${total} ready`;
}

function updateDocChipsOnCards(matches){
  matches.forEach(s => {
    const chip = document.getElementById(`docchip-${s.id}`);
    if (!chip) return;
    const { done, total } = docReadyForScholarship(s);
    chip.textContent = `Docs ready: ${done}/${total}`;
    chip.classList.toggle("complete", total > 0 && done === total);
  });
}

function renderDocIntel(matches){
  const section = document.getElementById("docIntel");
  if (!section) return;
  if (!matches.length){ section.style.display = "none"; return; }
  section.style.display = "";

  const uniqueDocs = [...new Set(matches.flatMap(s => s.documents))];
  const checklist = document.getElementById("docChecklist");
  checklist.innerHTML = uniqueDocs.map((doc, i) => {
    const key = docKeyFor(doc);
    const checked = !!docState[key];
    return `
      <li class="${checked ? "checked" : ""}">
        <input type="checkbox" id="doc-${i}" data-key="${escapeHtml(key)}" ${checked ? "checked" : ""}>
        <label for="doc-${i}">${escapeHtml(doc)}</label>
      </li>`;
  }).join("");

  checklist.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", () => {
      docState[cb.dataset.key] = cb.checked;
      saveDocState();
      cb.closest("li").classList.toggle("checked", cb.checked);
      updateDocProgress(uniqueDocs);
      updateDocChipsOnCards(matches);
    });
  });

  updateDocProgress(uniqueDocs);
}

/* =========================================================
   OPPORTUNITY GRAPH — illustrative next-step connections
   (internship / job / research) beyond the scholarship itself.
   ========================================================= */
const OPPORTUNITY_SUGGESTIONS = {
  class10: { internship: "Summer STEM camp volunteering", job: "Peer-tutoring (part-time)", research: "School science exhibition project" },
  class12: { internship: "Young Scholars summer internship", job: "Exam-prep content intern", research: "State-level science fair project" },
  ug:      { internship: "Campus ambassador / summer internship", job: "Graduate trainee / junior analyst roles", research: "Undergraduate research assistantship" },
  pg:      { internship: "Industry research internship", job: "Research analyst / associate roles", research: "Postgraduate thesis collaboration" },
  diploma: { internship: "Polytechnic apprenticeship", job: "Junior technician roles", research: "Applied skills project" },
  phd:     { internship: "Visiting / postdoctoral position", job: "Research scientist roles", research: "Peer-reviewed publication or conference" }
};

function buildGraphSVG(centerLabel, opp){
  const cx = 150, cy = 160;
  const nodes = [
    { type: "internship", label: opp.internship, x: 470, y: 60 },
    { type: "job", label: opp.job, x: 470, y: 160 },
    { type: "research", label: opp.research, x: 470, y: 260 }
  ];
  const truncatedCenter = centerLabel.length > 30 ? centerLabel.slice(0, 28) + "…" : centerLabel;

  const edges = nodes.map(n => `<line class="opp-edge" x1="${cx + 60}" y1="${cy}" x2="${n.x - 74}" y2="${n.y}"/>`).join("");
  const nodeEls = nodes.map(n => `
    <g class="opp-node ${n.type}">
      <circle cx="${n.x}" cy="${n.y}" r="7"></circle>
      <text class="opp-type" x="${n.x + 16}" y="${n.y - 6}">${n.type}</text>
      <text class="opp-title" x="${n.x + 16}" y="${n.y + 12}">${escapeHtml(n.label)}</text>
    </g>`).join("");

  return `
    <g class="opp-node-center">
      <circle cx="${cx}" cy="${cy}" r="48"></circle>
      <text x="${cx}" y="${cy - 6}" text-anchor="middle">YOUR</text>
      <text x="${cx}" y="${cy + 10}" text-anchor="middle">MATCH</text>
    </g>
    <text class="opp-graph-caption" x="${cx}" y="${cy + 74}" text-anchor="middle">${escapeHtml(truncatedCenter)}</text>
    ${edges}
    ${nodeEls}
  `;
}

function renderOpportunityGraph(matches, user){
  const section = document.getElementById("oppGraph");
  if (!section) return;
  if (!matches.length){ section.style.display = "none"; return; }
  section.style.display = "";

  const top = matches[0];
  const level = top.levels.includes(user.level) ? user.level : top.levels[0];
  const opp = OPPORTUNITY_SUGGESTIONS[level] || OPPORTUNITY_SUGGESTIONS.ug;
  const svg = document.getElementById("oppGraphSvg");
  svg.innerHTML = buildGraphSVG(top.name, opp);
}

let lastUser = null;

function renderResults(list, user){
  const wrap = document.getElementById("ledgerList");
  wrap.innerHTML = "";

  if (list.length === 0){
    wrap.innerHTML = `<div class="empty-state">No entries match every field exactly. Try widening your income limit or switching "Looking for" to "Either works" — Saathi can also help you double check.</div>`;
    return;
  }

  list.forEach(s => {
    const urgency = getUrgency(s);
    const strengthPct = computeMatchStrength(s, user);
    const band = matchBand(strengthPct);
    const offset = RING_CIRCUMFERENCE * (1 - strengthPct / 100);
    const reasons = explainMatch(s, user);
    const { done, total } = docReadyForScholarship(s);

    const entry = document.createElement("div");
    entry.className = "ledger-entry";
    entry.innerHTML = `
      <span class="eligible-stamp">ELIGIBLE</span>
      <div class="ledger-entry-main">
        <h3>${s.name}</h3>
        <div class="ledger-provider">${s.provider}</div>
        <div class="ledger-tags">
          <span class="tag">${typeLabel[s.type]}</span>
          <span class="tag">${s.levels.map(l => levelLabel[l]).join(", ")}</span>
          <span class="tag">${Array.isArray(s.states) ? s.states.join(", ") : "All-India"}</span>
        </div>
        <div class="match-strength">
          <span class="match-ring">
            <svg width="34" height="34" viewBox="0 0 34 34">
              <circle class="match-ring-track" cx="17" cy="17" r="${RING_R}"></circle>
              <circle class="match-ring-fill ${band.cls}" cx="17" cy="17" r="${RING_R}"
                stroke-dasharray="${RING_CIRCUMFERENCE}" stroke-dashoffset="${offset}"></circle>
            </svg>
          </span>
          <span class="match-label"><strong>${strengthPct}%</strong> ${band.label} · estimate, not a guarantee</span>
        </div>
        <button type="button" class="why-toggle" data-id="${s.id}">Why this matches you ▾</button>
        <ul class="why-list" id="why-${s.id}">
          ${reasons.map(r => `<li>${escapeHtml(r)}</li>`).join("")}
        </ul>
      </div>
      <div class="ledger-entry-side">
        <span class="ledger-amount">${s.amount}</span>
        <span class="ledger-deadline"><span class="radar-dot ${urgency.level}"></span>${s.deadline}</span>
        <span class="doc-ready-chip ${total > 0 && done === total ? "complete" : ""}" id="docchip-${s.id}">Docs ready: ${done}/${total}</span>
        <button class="ledger-view-btn" data-id="${s.id}">View steps →</button>
      </div>
    `;
    wrap.appendChild(entry);
  });

  wrap.querySelectorAll(".ledger-view-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.id));
  });

  wrap.querySelectorAll(".why-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const list2 = document.getElementById(`why-${btn.dataset.id}`);
      const open = list2.classList.toggle("open");
      btn.textContent = open ? "Why this matches you ▴" : "Why this matches you ▾";
    });
  });
}

/* initial empty prompt */
document.getElementById("ledgerList").innerHTML =
  `<div class="prompt-state">No matches shown yet — fill the form above and click "Show my matches".</div>`;

/* =========================================================
   FORM HANDLING
   ========================================================= */
const form = document.getElementById("checkerForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    level: document.getElementById("level").value,
    category: document.getElementById("category").value,
    type: form.querySelector('input[name="type"]:checked').value,
    score: Number(document.getElementById("score").value) || 0,
    income: Number(document.getElementById("income").value) || 0,
    gender: document.getElementById("gender").value,
    state: document.getElementById("state").value
  };

  const matches = SCHOLARSHIPS.filter(s => scholarshipMatches(s, user));
  lastUser = user;

  document.getElementById("resultsEyebrow").textContent = `Page 02 — ${matches.length} match${matches.length === 1 ? "" : "es"} found`;
  document.getElementById("resultsTitle").textContent = matches.length
    ? "Here's what you're eligible for right now."
    : "Nothing matched exactly — here's how to widen the search.";

  renderResults(matches, user);
  renderDocIntel(matches);
  renderOpportunityGraph(matches, user);
  document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
});

/* =========================================================
   MODAL
   ========================================================= */
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");

function openModal(id){
  const s = SCHOLARSHIPS.find(x => x.id === id);
  if (!s) return;

  modalBody.innerHTML = `
    <h3 id="modalTitle">${s.name}</h3>
    <div class="modal-provider">${s.provider}</div>
    <div class="modal-meta-row">
      <div class="modal-meta-item"><strong>Amount</strong>${s.amount}</div>
      <div class="modal-meta-item"><strong>Deadline</strong>${s.deadline}</div>
      <div class="modal-meta-item"><strong>Type</strong>${typeLabel[s.type]}</div>
    </div>
    <div class="modal-section">
      <h4>Documents to prepare</h4>
      <ul>${s.documents.map(d => `<li>${d}</li>`).join("")}</ul>
    </div>
    <div class="modal-section">
      <h4>Steps to apply</h4>
      <ol>${s.steps.map(st => `<li>${st}</li>`).join("")}</ol>
    </div>
  `;
  modalOverlay.classList.add("open");
}

document.getElementById("modalClose").addEventListener("click", () => modalOverlay.classList.remove("open"));
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove("open"); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") modalOverlay.classList.remove("open"); });

/* =========================================================
   NAV / SCROLL HELPERS
   ========================================================= */
document.querySelectorAll("[data-scroll]").forEach(el => {
  el.addEventListener("click", () => {
    document.getElementById(el.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* count-up stat animation */
const statNums = document.querySelectorAll(".stat-num");
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const el = entry.target;
      const target = Number(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.round(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target){ current = target; clearInterval(timer); }
        el.textContent = current;
      }, 25);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });
statNums.forEach(el => statObserver.observe(el));

/* =========================================================
   SAATHI CHATBOT (rule-based demo)
   ========================================================= */
const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const chatMinimize = document.getElementById("chatMinimize");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

chatToggle.addEventListener("click", () => {
  chatPanel.classList.toggle("open");
  if (chatPanel.classList.contains("open")) chatInput.focus();
});
chatMinimize.addEventListener("click", () => chatPanel.classList.remove("open"));

function addChatLine(text, who){
  const line = document.createElement("div");
  line.className = `chat-line chat-line-${who}`;
  line.textContent = text;
  chatMessages.appendChild(line);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* =========================================================
   SAATHI — knowledge base + reply engine

   Checked in order:
   1. Scholarship lookup — if the message names a scheme in
      SCHOLARSHIPS, the answer is generated live from that
      scheme's real data (amount, deadline, docs), so it's
      always accurate instead of a canned line.
   2. Topic rules — matched on whole words so short keywords
      like "sc" or "st" don't fire inside unrelated words.
   ========================================================= */

function hasKeyword(text, keyword){
  return new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i").test(text);
}
function escapeRegex(s){ return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); }

const SCHOLARSHIP_ALIASES = {
  "nsp-pre-matric-sc":        ["pre-matric sc", "pre matric sc", "class 10 sc scholarship"],
  "nsp-post-matric-st":       ["post-matric st", "post matric st", "tribal affairs scholarship"],
  "ews-central-sector":       ["central sector scheme", "central sector scholarship"],
  "obc-post-matric":          ["obc post-matric", "obc post matric", "obc scholarship"],
  "minority-merit-cum-means": ["merit-cum-means", "merit cum means", "minority scholarship"],
  "pragati-girls-technical":  ["pragati"],
  "inspire-scheme":           ["inspire"],
  "state-topper-up":          ["up board topper", "up topper", "uttar pradesh topper"],
  "maharashtra-ews-fee":      ["ebc fee waiver", "mahadbt", "maharashtra fee waiver"],
  "kvpy-fellowship":          ["kvpy", "research fellowship"],
  "dhfl-need-based-ug":       ["trust scholarship", "need-based ug scholarship"],
  "girl-child-diploma":       ["girl child diploma"],
  "phd-jrf-ugc":              ["jrf", "ugc net", "net-jrf", "junior research fellowship"]
};

function findScholarshipMention(lower){
  for (const s of SCHOLARSHIPS){
    const aliases = SCHOLARSHIP_ALIASES[s.id] || [];
    const nameFirstTwo = s.name.toLowerCase().split(" ").slice(0, 2).join(" ");
    if (aliases.some(a => lower.includes(a)) || lower.includes(s.name.toLowerCase()) || lower.includes(nameFirstTwo)){
      return s;
    }
  }
  return null;
}

function scholarshipAnswer(s){
  const u = getUrgency(s);
  const urgencyPhrase = u.level === "rolling" ? "it's a rolling/ongoing deadline" : `${u.label.toLowerCase()}`;
  return `${s.name} (${s.provider}) offers ${s.amount}, for ${s.levels.map(l => levelLabel[l]).join(", ")} level. It's ${typeLabel[s.type].toLowerCase()}, open to ${s.categories.length > 4 ? "most categories" : s.categories.map(c => c.toUpperCase()).join(", ")} — and right now ${urgencyPhrase}. Key documents: ${s.documents.slice(0, 3).join(", ")}${s.documents.length > 3 ? ", and more" : ""}. Tap "View steps" on its card above for the full checklist.`;
}

const SAATHI_RULES = [
  {
    keywords: ["document", "documents", "papers", "kagaz"],
    reply: "Most scholarships ask for: your latest marksheet, an income certificate (for need-based ones), a category certificate if relevant (SC/ST/OBC/EWS/minority), a bonafide/admission letter from your institute, Aadhaar, and a bank passbook copy in the applicant's own name. Merit-based scholarships usually skip the income certificate. Once you've searched, the 'Document Intelligence' section below your matches lets you tick off what you already have."
  },
  {
    keywords: ["income certificate", "income proof"],
    reply: "Yes, if you're applying for a need-based or 'merit or need-based' scholarship, you'll need a current income certificate — get it from your tehsildar, SDM office, or the state e-district portal. It's usually valid for 6–12 months, so time it close to your application. Purely merit-based scholarships usually don't ask for it."
  },
  {
    keywords: ["ews"],
    reply: "EWS (Economically Weaker Section) covers General category students whose family income is below the government's EWS threshold (currently ₹8 lakh/year) and who don't fall under any reserved category (SC/ST/OBC). You'll need a specific EWS certificate, not a caste certificate, issued by a competent authority (Tehsildar/SDM)."
  },
  {
    keywords: ["obc", "non-creamy", "ncl", "creamy layer"],
    reply: "OBC-NCL means OBC Non-Creamy Layer — it confirms your family income is below the 'creamy layer' cutoff (currently ₹8 lakh/year, revised periodically). Unlike a caste certificate, the NCL certificate needs renewal — usually every 1–3 years — so check the issue date before applying."
  },
  {
    keywords: ["sc", "scheduled caste"],
    reply: "SC (Scheduled Caste) scholarships need a valid caste certificate issued by a competent authority (Tehsildar/SDM/District Magistrate). Unlike OBC-NCL, this certificate doesn't expire — but some portals still ask for one issued within the last few years, so check the specific scheme's notification."
  },
  {
    keywords: ["st", "scheduled tribe", "tribal"],
    reply: "ST (Scheduled Tribe) scholarships need a valid tribe certificate — issued by the same authority as caste certificates. Many are run by the Ministry of Tribal Affairs and cover tuition plus a maintenance allowance, not just a flat amount, so check the specific scheme for what's included."
  },
  {
    keywords: ["minority", "minorities", "which communities"],
    reply: "The notified minority communities for central scholarships are Muslim, Christian, Sikh, Buddhist, Jain, and Parsi. You'll need a community certificate along with income proof — most minority scholarships are also income-capped, so both documents matter."
  },
  {
    keywords: ["merit", "need based", "need-based", "difference"],
    reply: "Merit-based scholarships are awarded purely on marks or exam rank, regardless of family income. Need-based ones are awarded mainly on family income, usually with a minimum passing score as a basic bar. A few, marked 'merit or need-based' here, combine the two — either route can qualify you."
  },
  {
    keywords: ["deadline", "missed", "late", "last date"],
    reply: "Check the Deadline Radar strip near the top of the page — it colour-codes every scheme by urgency: green means comfortably far off, amber means apply soon, red means it's closing within two weeks. If you've already missed one, look for a second window; many state portals reopen briefly for late corrections."
  },
  {
    keywords: ["qualify", "eligible", "eligibility"],
    reply: "The quickest way is to use the eligibility checker above — it compares your education level, category, marks, and income against every scholarship in this list, and each result also shows a 'Why this matches you' breakdown and a match-strength estimate. Ask me about a specific scheme by name for more detail."
  },
  {
    keywords: ["match strength", "probability", "chance", "how likely"],
    reply: "The percentage on each result card is a transparent estimate — it rewards how comfortably you clear the score and income bars, not just a pass/fail. It's a heuristic to help you prioritise which forms to fill first, not a guarantee of selection; the actual decision is always made by the scholarship provider."
  },
  {
    keywords: ["why this matches", "why match", "explain match"],
    reply: "Click 'Why this matches you' on any result card — it lists the exact reasons that scheme matched your inputs (level, category, score, income, gender, state) in plain language, generated fresh from your own answers."
  },
  {
    keywords: ["college not listed", "not listed", "private college"],
    reply: "Eligibility usually depends on your course and category, not whether your specific college is named — as long as it's a recognised (AICTE/UGC/state-affiliated) institution, most scholarships still apply. Double-check the specific scheme's official notification to be sure your college qualifies."
  },
  {
    keywords: ["how to apply", "application process", "steps to apply", "apply kaise"],
    reply: "Broadly: 1) register on the relevant portal — usually the National Scholarship Portal (scholarships.gov.in) or a state/AICTE portal, 2) fill in your academic and category details and upload documents, 3) get the form verified by your school or college, 4) track status online until it's approved and disbursed. Each result card's 'View steps' button has the exact sequence for that scheme."
  },
  {
    keywords: ["nsp", "national scholarship portal", "register", "registration"],
    reply: "The National Scholarship Portal (scholarships.gov.in) hosts most central and many state scholarships. You register once as a fresh applicant with your Aadhaar and basic details, then apply separately to each scheme you're eligible for — your institute verifies each application before it moves to the district/state level."
  },
  {
    keywords: ["bank account", "dbt", "disburse", "disbursement", "aadhaar seeding", "direct benefit"],
    reply: "Scholarship money is paid through Direct Benefit Transfer (DBT) straight into your bank account, so the account must be Aadhaar-seeded (linked and NPCI-mapped) and in the student's own name — a parent's account usually won't work. Get this done at your bank before applying, since it's a common cause of delayed payments."
  },
  {
    keywords: ["renew", "renewal", "every year", "one time", "one-time"],
    reply: "Most scholarships (aside from clearly one-time awards like state topper prizes) need renewal each year — you'll typically have to show you passed without a backlog and re-upload that year's fee receipt or bonafide certificate. Check each scheme's steps for its specific renewal condition."
  },
  {
    keywords: ["backlog", "fail", "supplementary", "compartment"],
    reply: "Having a backlog or failing a subject can pause renewal for most scholarships, since they usually require a clean pass each year. If it happens, contact your institute's scholarship cell — some schemes allow one supplementary attempt before discontinuing the award, but this varies by scheme."
  },
  {
    keywords: ["multiple scholarships", "more than one", "two scholarships", "combine"],
    reply: "You can usually apply to more than one scholarship, but most portals (like NSP) don't allow you to hold two central/state scholarships at the same time for the same purpose — read the fine print on each. Private or institution-specific ones can often be combined with a government scholarship, though."
  },
  {
    keywords: ["rejected", "not approved", "application rejected", "reapply"],
    reply: "Common rejection reasons are: income certificate too old, Aadhaar-bank mismatch, incomplete institute verification, or applying after the category/marks cutoff. Check the rejection remark on the portal — most schemes let you correct and resubmit within a short window before the final deadline."
  },
  {
    keywords: ["domicile", "domicile certificate"],
    reply: "A domicile certificate proves you're a resident of a particular state — needed mainly for state-specific scholarships. Apply through your state's e-district or revenue department portal with proof of residence (ration card, voter ID, or a parent's domicile certificate)."
  },
  {
    keywords: ["girl", "girl child", "only girls"],
    reply: "Several scholarships here are reserved for girl students — like the AICTE Pragati Scholarship and the Girl Child Diploma Scholarship. These typically also cap eligibility to one girl per family among two siblings, so check that condition specifically."
  },
  {
    keywords: ["phd", "doctoral", "research fellowship", "jrf", "net"],
    reply: "For PhD-level support, the main route is the UGC Junior Research Fellowship — you clear UGC-NET with a JRF tag, then secure provisional PhD admission within two years to start drawing the monthly fellowship. Ask me 'JRF' for the specific amount and steps."
  },
  {
    keywords: ["diploma", "iti", "polytechnic"],
    reply: "Diploma and ITI students are covered by a smaller set of schemes here — mainly state technical education scholarships and the Girl Child Diploma Scholarship. Select 'Diploma / ITI' in the checker above to see exactly which ones you qualify for."
  },
  {
    keywords: ["how much", "amount", "money will i get"],
    reply: "Amounts vary a lot by scheme — from a few thousand rupees a year for school-level scholarships to full tuition plus a monthly stipend for research fellowships. Ask me about a specific scholarship by name, or check the amount listed on each result card above, for the exact figure."
  },
  {
    keywords: ["internship", "job", "research opportunity", "opportunity graph", "what next", "after scholarship"],
    reply: "Once you have matches, scroll to the 'Opportunity Graph' section below your results — it maps your top match to typical next-step internships, junior roles, and research openings for students at the same stage, so a scholarship isn't a dead end."
  },
  {
    keywords: ["hi", "hello", "namaste", "hey"],
    reply: "नमस्ते! Ask me about eligibility, documents, deadlines, a specific scheme by name (like 'INSPIRE' or 'Pragati'), or how the match-strength and document checklist features work."
  },
  {
    keywords: ["thank you", "thanks", "thank"],
    reply: "You're welcome — good luck with the application! Come back any time if another question comes up."
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    reply: "All the best with your scholarships! Come back if you need help with documents or deadlines later."
  },
  {
    keywords: ["who are you", "what can you do", "what is saathi"],
    reply: "I'm Saathi, a built-in guide for this scholarship list — ask me about eligibility rules, required documents, deadlines, match strength, or any specific scheme by name and I'll answer from what's on this page."
  }
];

function saathiReply(userText){
  const lower = userText.toLowerCase();

  const namedScholarship = findScholarshipMention(lower);
  if (namedScholarship) return scholarshipAnswer(namedScholarship);

  for (const rule of SAATHI_RULES){
    if (rule.keywords.some(k => hasKeyword(lower, k))) return rule.reply;
  }
  return "I don't have a specific answer for that yet — try asking about documents, income certificate, EWS/OBC/SC/ST, deadlines, match strength, or a scholarship by name (e.g. 'INSPIRE' or 'Pragati'). You can also use the eligibility checker above for a personalised match.";
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addChatLine(text, "user");
  chatInput.value = "";
  setTimeout(() => addChatLine(saathiReply(text), "bot"), 380);
});

document.querySelectorAll("[data-ask]").forEach(el => {
  el.addEventListener("click", () => {
    chatPanel.classList.add("open");
    const q = el.dataset.ask;
    addChatLine(q, "user");
    setTimeout(() => addChatLine(saathiReply(q), "bot"), 380);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});

document.getElementById("chatQuickReplies").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-ask]");
  if (!btn) return;
  const q = btn.dataset.ask;
  addChatLine(q, "user");
  setTimeout(() => addChatLine(saathiReply(q), "bot"), 380);
});

/* =========================================================
   INIT
   ========================================================= */
renderRadar();
