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
  }
];

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

function renderResults(list, matchedIds){
  const wrap = document.getElementById("ledgerList");
  wrap.innerHTML = "";

  if (list.length === 0){
    wrap.innerHTML = `<div class="empty-state">No entries match every field exactly. Try widening your income limit or switching "Looking for" to "Either works" — Saathi can also help you double check.</div>`;
    return;
  }

  list.forEach(s => {
    const entry = document.createElement("div");
    entry.className = "ledger-entry";
    entry.innerHTML = `
      ${matchedIds ? `<span class="eligible-stamp">ELIGIBLE</span>` : ""}
      <div class="ledger-entry-main">
        <h3>${s.name}</h3>
        <div class="ledger-provider">${s.provider}</div>
        <div class="ledger-tags">
          <span class="tag">${typeLabel[s.type]}</span>
          <span class="tag">${s.levels.map(l => levelLabel[l]).join(", ")}</span>
          <span class="tag">${Array.isArray(s.states) ? s.states.join(", ") : "All-India"}</span>
        </div>
      </div>
      <div class="ledger-entry-side">
        <span class="ledger-amount">${s.amount}</span>
        <span class="ledger-deadline">Deadline: ${s.deadline}</span>
        <button class="ledger-view-btn" data-id="${s.id}">View steps →</button>
      </div>
    `;
    wrap.appendChild(entry);
  });

  wrap.querySelectorAll(".ledger-view-btn").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.id));
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

  document.getElementById("resultsEyebrow").textContent = `Page 02 — ${matches.length} match${matches.length === 1 ? "" : "es"} found`;
  document.getElementById("resultsTitle").textContent = matches.length
    ? "Here's what you're eligible for right now."
    : "Nothing matched exactly — here's how to widen the search.";

  renderResults(matches, true);
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

const SAATHI_RULES = [
  {
    keywords: ["document", "documents", "papers", "kagaz"],
    reply: "Most scholarships ask for: your latest marksheet, an income certificate (for need-based ones), a category certificate if relevant (SC/ST/OBC/EWS/minority), a bonafide/admission letter from your institute, Aadhaar, and a bank passbook copy in the applicant's name. Merit-based scholarships usually skip the income certificate."
  },
  {
    keywords: ["income certificate", "income proof"],
    reply: "Yes, if you're applying for a need-based or 'both' type scholarship, you'll need a current income certificate — get it from your tehsildar or the state e-district portal. Purely merit-based scholarships usually don't ask for it."
  },
  {
    keywords: ["ews"],
    reply: "EWS (Economically Weaker Section) covers General category students whose family income is below the government's EWS threshold and who don't fall under any reserved category. You'll need an EWS certificate, not a caste certificate, to apply under this quota."
  },
  {
    keywords: ["obc", "non-creamy", "ncl"],
    reply: "OBC-NCL means OBC Non-Creamy Layer — it confirms your family income is below the 'creamy layer' cutoff. It needs to be renewed periodically (usually every 1–3 years), unlike a permanent caste certificate."
  },
  {
    keywords: ["merit", "need based", "need-based", "difference"],
    reply: "Merit-based scholarships are awarded purely on marks or exam rank, regardless of family income. Need-based ones are awarded mainly on family income, usually with a minimum passing score as a basic bar. Some, marked 'both' here, combine the two."
  },
  {
    keywords: ["deadline", "missed", "late"],
    reply: "If you've missed a deadline, check whether the scheme has a second window — many state portals reopen briefly. Otherwise, note the date for next year and set a reminder 3 weeks before, since verification steps (school/college sign-off) often take longer than expected."
  },
  {
    keywords: ["qualify", "eligible", "eligibility"],
    reply: "The quickest way is to use the eligibility checker above — it compares your education level, category, marks, and income against every scholarship in this list instantly. If a few show as close-but-not-quite, ask me about that specific one and I'll explain what's blocking it."
  },
  {
    keywords: ["college not listed", "not listed", "private college"],
    reply: "Being eligible usually depends on your course and category, not whether your specific college is named — as long as it's a recognised (AICTE/UGC/state-affiliated) institution, most scholarships still apply. Double-check the specific scheme's official notification to be sure."
  },
  {
    keywords: ["hi", "hello", "namaste", "hey"],
    reply: "नमस्ते! Ask me about eligibility, required documents, deadlines, or the difference between scholarship types — I'll do my best to explain in plain terms."
  }
];

function saathiReply(userText){
  const lower = userText.toLowerCase();
  for (const rule of SAATHI_RULES){
    if (rule.keywords.some(k => lower.includes(k))) return rule.reply;
  }
  return "I don't have a specific answer for that in this demo yet — but generally: check the eligibility checker above for a personalised match, and every scholarship's 'View steps' panel lists the exact documents and process for that one.";
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
