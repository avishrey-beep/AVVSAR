/* =========================================================
   AVSAR — DOCUMENTS HUB & VAULT ENGINE (documents.js)
   Comprehensive JavaScript engine for document guides,
   step-by-step resolution, DigiLocker-style browser vault,
   dynamic LOR generator, and authority resolvers.
   ========================================================= */

/* =========================================================
   1. DOCUMENT KNOWLEDGE BASE
   ========================================================= */
const DOCS = [
  /* ---- GOVERNMENT ---- */
  {
    id: "income-cert",
    name: "Income Certificate",
    nameHi: "आय प्रमाण पत्र",
    icon: "📄",
    iconType: "govt",
    cat: "govt",
    validity: "6 months – 1 year (varies by state)",
    fee: "₹10 – ₹50 (CSC / government fee)",
    time: "3 – 15 working days",
    online: true,
    portal: "State e-District portal (e.g. edistrict.up.gov.in, edistrict.delhi.gov.in)",
    office: "Tehsil Office / SDM Office / Block Development Office",
    officials: ["Tehsildar", "Sub-Divisional Magistrate (SDM)", "District Magistrate (DM)", "Lekhpal / Patwari (Field Verification)"],
    steps: [
      "Collect prerequisite papers: Aadhaar card, ration card, salary slip (if salaried) or an income affidavit on stamp paper (for farmers / self-employed).",
      "Visit your state's e-District portal or nearest Common Service Centre (CSC / Jan Seva Kendra).",
      "Fill the income certificate application with family member income details.",
      "Upload scanned copies of supporting identity, address, and income declarations.",
      "Pay the nominal processing fee online or at the CSC counter.",
      "The local Lekhpal / Patwari / Village Revenue Officer conducts a spot or neighbourhood inquiry to verify income.",
      "The Tehsildar or SDM reviews the enquiry report and digitally signs the certificate.",
      "Download the digitally signed certificate with QR code from the portal or collect the physical copy."
    ],
    docsRequired: [
      "Aadhaar Card of student and parent/guardian",
      "Ration Card or BPL Card",
      "Salary slips or Form 16 (for salaried parents)",
      "Self-declaration affidavit on stamp paper (farmers / daily wage / business)",
      "Passport-size photograph",
      "Electricity or water bill (address proof)"
    ],
    tip: "Most scholarship portals (like NSP) strictly require a current-year certificate. Income certificates issued by a Tehsildar or SDM are universally accepted; certificates from Municipal Councillors alone often get rejected. Time your application 4–6 weeks before scholarship deadlines."
  },
  {
    id: "caste-cert",
    name: "Caste Certificate (SC / ST / OBC-NCL)",
    nameHi: "जाति प्रमाण पत्र",
    icon: "📋",
    iconType: "govt",
    cat: "govt",
    validity: "Lifetime for SC / ST. OBC-NCL: must be renewed every 1–3 years.",
    fee: "₹10 – ₹50",
    time: "7 – 21 working days",
    online: true,
    portal: "State e-District portal (e.g. edistrict.delhi.gov.in, mahaonline.gov.in, edistrict.up.gov.in)",
    office: "Tehsil Office / SDM Office / District Magistrate Office",
    officials: ["Tehsildar", "Sub-Divisional Magistrate (SDM)", "District Magistrate (DM)"],
    steps: [
      "Visit your state e-District portal or collect the caste certificate form from the Tehsil / SDM counter.",
      "Fill in your personal and paternal lineage details accurately.",
      "Attach proof: parent's caste certificate, land records mentioning community, or school transfer certificate showing caste.",
      "Submit with proof of residence and identification.",
      "Revenue Inspector / Patwari carries out a local inquiry to substantiate caste lineage.",
      "The Tehsildar or SDM issues the official caste certificate.",
      "Download the digitally verified certificate from the portal."
    ],
    docsRequired: [
      "Father's or mother's caste certificate",
      "Aadhaar Card",
      "School Leaving / Transfer Certificate with caste mentioned",
      "Self-declaration affidavit on non-judicial stamp paper",
      "Ration Card",
      "Passport-size photograph"
    ],
    tip: "For OBC scholarships, you specifically need the OBC Non-Creamy Layer (NCL) certificate, which confirms your annual family income is below ₹8 lakh. Pure caste certificates without NCL declaration will be rejected for reserved quota financial aid."
  },
  {
    id: "domicile-cert",
    name: "Domicile / Residence Certificate",
    nameHi: "निवास / अधिवास प्रमाण पत्र",
    icon: "🏠",
    iconType: "govt",
    cat: "govt",
    validity: "Lifetime in most states; 3 years in some states.",
    fee: "₹10 – ₹50",
    time: "7 – 15 working days",
    online: true,
    portal: "State e-District portal (varies by state)",
    office: "Tehsil Office / SDM Office",
    officials: ["Tehsildar", "Sub-Divisional Magistrate (SDM)"],
    steps: [
      "Visit the e-District portal or Tehsil office to get the Domicile / Niwas Praman Patra form.",
      "Enter your residential address and state continuous years of stay (usually minimum 3–10 years required).",
      "Attach residence proofs (electricity bill, voter ID, parent's domicile, school records in the state).",
      "Pay the nominal fee online or at counter.",
      "Local Patwari conducts verification of residence.",
      "The Tehsildar or SDM digitally signs and delivers the domicile certificate.",
      "Download from portal or collect in person."
    ],
    docsRequired: [
      "Aadhaar Card",
      "Voter ID or Ration Card",
      "Electricity / water bill in the family's name",
      "Parent's domicile certificate (if available)",
      "School marksheet / TC showing years of education in the state",
      "Passport-size photograph"
    ],
    tip: "State-specific government scholarships strictly require this certificate to prove eligibility under state quota. Apply for domicile alongside your income certificate to avoid duplicate visits to the Tehsil office."
  },
  {
    id: "ews-cert",
    name: "EWS Certificate (Economically Weaker Section)",
    nameHi: "आर्थिक रूप से कमज़ोर वर्ग प्रमाण पत्र",
    icon: "📑",
    iconType: "govt",
    cat: "govt",
    validity: "1 financial year (expires every March 31). Must be renewed annually.",
    fee: "₹10 – ₹30",
    time: "5 – 15 working days",
    online: true,
    portal: "State e-District portal (EWS application)",
    office: "Tehsil Office / SDM Office",
    officials: ["Tehsildar", "Sub-Divisional Magistrate (SDM)"],
    steps: [
      "Confirm eligibility: General category, annual gross family income strictly below ₹8 lakh/year, and below asset ceilings (under 5 acres agricultural land, under 1000 sq.ft residential flat).",
      "Visit e-District portal or Tehsil office and fill the EWS Certificate application.",
      "Attach income proof, asset self-declaration, land records, and Aadhaar.",
      "Pay the application fee.",
      "Tehsildar / SDM verifies asset documents and income records.",
      "Download or collect your EWS certificate."
    ],
    docsRequired: [
      "Aadhaar Card of applicant and parents",
      "Current Income Certificate / Salary slips / Form 16",
      "Self-declaration affidavit of immovable assets and land holdings",
      "Ration Card or Domicile Certificate",
      "Passport-size photograph"
    ],
    tip: "EWS is NOT the same as an ordinary income certificate. It certifies General category status + economic weakness under constitutional criteria. Because it expires on March 31 every year, always apply for renewal in April/May so you are prepared before scholarship applications open."
  },
  {
    id: "postman-stmt",
    name: "Postman Statement / Address Verification",
    nameHi: "डाकिया बयान / पते का सत्यापन",
    icon: "📮",
    iconType: "govt",
    cat: "govt",
    validity: "3 – 6 months (purpose-specific)",
    fee: "Free in most post offices",
    time: "2 – 7 working days",
    online: false,
    portal: "Not available online — physical beat verification required.",
    office: "Local Post Office (Head Post Office / Sub Post Office)",
    officials: ["Beat Postman", "Postmaster", "Superintendent of Post Offices"],
    steps: [
      "Visit your local Sub Post Office or Head Post Office.",
      "Submit a written application to the Postmaster stating the purpose (passport address verification, scholarship domicile validation, or court verification).",
      "The Postmaster delegates your area's regular Beat Postman to verify your residential address.",
      "The Postman visits your residence, checks identity proof, and drafts a signed verification statement.",
      "The Postmaster affixes the official postal round stamp and countersigns the document on Department of Posts letterhead.",
      "Collect the signed Postman Statement directly from the Post Office."
    ],
    docsRequired: [
      "Written application addressed to the Postmaster",
      "Aadhaar Card or voter ID for identification",
      "Reference letter or scholarship / passport notice citing address proof requirement"
    ],
    tip: "If you live in a rented home or lack formal utility bills in your name, the Postman Statement is one of the oldest and most trusted official proofs of physical residence recognized by police and passport authorities."
  },

  /* ---- IDENTITY ---- */
  {
    id: "aadhaar",
    name: "Aadhaar Card & DBT Seeding",
    nameHi: "आधार कार्ड एवं डीबीटी सीडिंग",
    icon: "🆔",
    iconType: "id",
    cat: "id",
    validity: "Lifetime (update biometrics every 10 years recommended)",
    fee: "Free for first enrolment; ₹50 for demographic / biometric updates.",
    time: "New: 15–60 days. Demographic update: 3–7 days.",
    online: true,
    portal: "myaadhaar.uidai.gov.in (download e-Aadhaar, update mobile, check bank seeding)",
    office: "UIDAI Aadhaar Enrolment Centre (bank branches, post offices)",
    officials: ["UIDAI Certified Enrolment Operator"],
    steps: [
      "Locate nearest centre at appointments.uidai.gov.in and book an appointment.",
      "Carry original identity proof and address proof.",
      "At the centre, fingerprints, iris scan, and photograph are recorded.",
      "Collect the acknowledgement slip with 14-digit Enrolment ID (EID).",
      "Track status on myaadhaar.uidai.gov.in and download password-protected e-Aadhaar.",
      "Crucial: Ensure mobile number is linked for OTP and check NPCI Aadhaar bank seeding status."
    ],
    docsRequired: [
      "Proof of Identity (Voter ID, Passport, PAN, School/College ID)",
      "Proof of Address (Ration Card, Electricity bill, Bank passbook)",
      "Proof of Date of Birth (Birth Certificate, Class 10 marksheet)"
    ],
    tip: "Having an Aadhaar card is not enough for scholarships — your bank account must be 'Aadhaar Seeded' via NPCI mapper. Go to myaadhaar.uidai.gov.in → 'Bank Seeding Status' to verify that scholarship funds won't bounce."
  },
  {
    id: "passport",
    name: "Passport",
    nameHi: "पासपोर्ट",
    icon: "🛂",
    iconType: "id",
    cat: "id",
    validity: "10 years (adults); 5 years (minors under 18).",
    fee: "₹1,500 (36-page normal); ₹3,500 (Tatkal); ₹2,000 (60-page jumbo).",
    time: "Normal: 7–25 working days. Tatkal: 1–3 working days after police verification.",
    online: true,
    portal: "passportindia.gov.in (Passport Seva Portal)",
    office: "Passport Seva Kendra (PSK) or Post Office Passport Seva Kendra (POPSK)",
    officials: ["Regional Passport Officer (RPO)", "Police Verification Officer (Local Thana)"],
    steps: [
      "Register on passportindia.gov.in and log in.",
      "Fill the online application for Fresh Passport or Reissue.",
      "Pay application fees online via SBI portal, UPI, or cards.",
      "Schedule an appointment at the nearest PSK or POPSK.",
      "Visit on appointment date with originals + 2 sets of self-attested photocopies.",
      "Biometrics and documents are verified at Counters A, B, and C.",
      "Police verification takes place at your local police station / residential address.",
      "Passport is printed and dispatched via Speed Post with tracking."
    ],
    docsRequired: [
      "Aadhaar Card (identity + address proof)",
      "Class 10 Marksheet or Birth Certificate (date of birth and non-ECR proof)",
      "Parent's passport copies (for minors)",
      "College Bonafide Certificate (for student applicants living in hostels)",
      "Utility bill or bank passbook (supporting address proof)",
      "Postman statement (if local residence address has discrepancies)"
    ],
    tip: "Students planning to apply for international scholarships (like Chevening, Fulbright, DAAD, Commonwealth): get your passport made at least 6 months before scholarship cycles open. An ECR-exempt (non-ECR) status is automatic if you have passed Class 10."
  },

  /* ---- EDUCATION ---- */
  {
    id: "bonafide",
    name: "Bonafide Certificate",
    nameHi: "बोनाफाइड / छात्र प्रमाण पत्र",
    icon: "🎓",
    iconType: "edu",
    cat: "edu",
    validity: "Current academic session / year only.",
    fee: "Free (issued by your school or college)",
    time: "1 – 5 working days",
    online: false,
    portal: "Not on government portal — issued by institute academic administration.",
    office: "College Academic Office / Student Affairs / Principal's Office",
    officials: ["College Principal", "Registrar", "Head of Department (HOD)"],
    steps: [
      "Draft a formal request application addressed to the Principal or Registrar.",
      "Specify exact purpose: 'Bonafide certificate required for [Scholarship Name] application'.",
      "Attach student ID card copy and current semester fee receipt.",
      "Submit at the student administration counter.",
      "Administration cross-checks roll number, attendance, and fee clearance.",
      "Certificate is printed on official institute letterhead with college seal and authorized signature.",
      "Collect the original signed certificate."
    ],
    docsRequired: [
      "Student ID Card",
      "Application stating the scholarship scheme name",
      "Current semester fee receipt / fee card",
      "Admission letter / allotment letter (for freshers)"
    ],
    tip: "Request 2–3 original hard copies with fresh ink stamps if applying to multiple portals. Many state portals reject photocopies of bonafide certificates."
  },
  {
    id: "lor",
    name: "Letter of Recommendation (LOR)",
    nameHi: "अनुशंसा / सिफारिश पत्र",
    icon: "✉️",
    iconType: "edu",
    cat: "edu",
    validity: "6 months – 1 year from date of issue.",
    fee: "Free — drafted by your faculty / professors",
    time: "3 – 10 working days",
    online: false,
    portal: "Not applicable — personally issued by an educator on institutional letterhead.",
    office: "Your Department / Faculty Cabins / Principal's Office",
    officials: ["Class Teacher", "Subject Professor", "HOD", "Principal / Director"],
    steps: [
      "Identify 1–2 professors who have taught you and know your academic dedication.",
      "Approach them at least 2–3 weeks before the scholarship deadline.",
      "Provide them with your CV, academic transcript, scholarship goals, and a draft highlighting key projects and financial need.",
      "The professor finalizes and prints the letter on university / college letterhead.",
      "Professor signs and affixes official designation stamp and date.",
      "Collect the signed letter (some scholarships require sealed envelopes, others scanned PDFs)."
    ],
    docsRequired: [
      "Student CV or resume",
      "Scholarship scheme details and guidelines",
      "Semester marksheets / GPA transcripts",
      "Summary of academic achievements, projects, or community work"
    ],
    tip: "Use the built-in 'LOR Template Generator' on this page below to generate a tailored draft that you can hand to your professor to review and sign!"
  },
  {
    id: "marksheet",
    name: "Marksheet & Academic Transcripts",
    nameHi: "अंक पत्र / परीक्षा परिणाम",
    icon: "📝",
    iconType: "edu",
    cat: "edu",
    validity: "Lifetime. DigiLocker verified copies are live and universally valid.",
    fee: "Free (original); ₹100–₹500 for university duplicate transcripts.",
    time: "Immediate (DigiLocker). Duplicate takes 7–30 days.",
    online: true,
    portal: "digilocker.gov.in (Central / State board marksheets & degree certificates)",
    office: "State Education Board / University Examination Branch",
    officials: ["Controller of Examinations", "Board Secretary", "Principal"],
    steps: [
      "Sign in to DigiLocker with your Aadhaar and mobile number.",
      "Search for your educational board (CBSE, ICSE, State Board, or University).",
      "Enter your roll number and passing year to fetch the digitally verified marksheet.",
      "Download the PDF with DigiLocker digital signature stamp.",
      "For scholarship portals, DigiLocker certificates are legally recognized as equal to originals under IT Act 2000.",
      "If you only have physical marksheets, scan in colour at 300 DPI as a sharp PDF."
    ],
    docsRequired: [
      "Aadhaar Card linked to DigiLocker",
      "Board Roll Number and Admit Card details",
      "FIR copy + fee challan (only if applying for lost duplicate)"
    ],
    tip: "Never submit blurry mobile snapshots of your marksheet. Scholarship scrutiny officers often reject applications with unreadable roll numbers or grade tables."
  },

  /* ---- FINANCIAL ---- */
  {
    id: "pan-card",
    name: "PAN Card",
    nameHi: "पैन कार्ड",
    icon: "💳",
    iconType: "finance",
    cat: "finance",
    validity: "Lifetime (does not expire).",
    fee: "₹107 (Physical card). ₹0 Free for Instant e-PAN.",
    time: "Instant for e-PAN (via Aadhaar). 15–20 days for physical card.",
    online: true,
    portal: "incometax.gov.in (Instant e-PAN) or onlineservices.nsdl.com / protean",
    office: "TIN-NSDL / UTIITSL facilitation centres",
    officials: ["Income Tax Department (CBDT)"],
    steps: [
      "For Free Instant e-PAN: Visit incometax.gov.in → 'Instant e-PAN' → Enter Aadhaar → Validate OTP → Download e-PAN in 5 minutes.",
      "For Physical PAN: Visit onlineservices.nsdl.com → 'New PAN (Form 49A)'.",
      "Enter name, date of birth, mobile, and father's name exactly matching Aadhaar.",
      "Upload photo and signature scan.",
      "Pay ₹107 fee online via UPI, net banking, or debit card.",
      "Save the 15-digit acknowledgement number for tracking.",
      "Physical laminated PAN card arrives by post within 2–3 weeks."
    ],
    docsRequired: [
      "Aadhaar Card with linked active mobile number",
      "Proof of Identity (Aadhaar or Voter ID)",
      "Proof of Address (Aadhaar or utility bill)",
      "Proof of Date of Birth (Class 10 marksheet or birth certificate)",
      "Passport-size photo and signature scan"
    ],
    tip: "If you don't have a physical PAN card yet, generating an Instant e-PAN takes only 5 minutes on the Income Tax portal and is completely free and valid for scholarship bank account verification."
  },
  {
    id: "bank-passbook",
    name: "Bank Passbook & NPCI Aadhaar Mapping",
    nameHi: "बैंक पासबुक एवं एनपीसीआई आधार मैपिंग",
    icon: "🏦",
    iconType: "finance",
    cat: "finance",
    validity: "Active as long as the account has regular transactions.",
    fee: "Free for PM Jan Dhan or student BSBD savings accounts.",
    time: "Same day to 3 working days.",
    online: true,
    portal: "SBI YONO, PNB ONE, Canara ai1, Bank of Baroda World",
    office: "Any nationalized or scheduled commercial bank branch",
    officials: ["Bank Branch Manager", "KYC Desk Officer"],
    steps: [
      "Visit any public sector bank (SBI, PNB, BOB, Canara, etc.) with Aadhaar, PAN, and student ID.",
      "Open a student Basic Savings Bank Deposit (BSBD) account with zero minimum balance requirement.",
      "Complete in-person biometric KYC.",
      "Crucial Step: Request the officer to link your Aadhaar with NPCI Direct Benefit Transfer (DBT) mandate.",
      "Get the passbook printed with your full name, account number, branch address, and IFSC code.",
      "Scan the first page showing account details clearly for scholarship uploads.",
      "Keep at least one cancelled cheque ready if requested."
    ],
    docsRequired: [
      "Aadhaar Card",
      "PAN Card (recommended)",
      "2 passport-size photographs",
      "Student ID card or admission proof",
      "Signed DBT NPCI mandate form"
    ],
    tip: "The account MUST be in the student's own name — joint accounts or parent accounts are rejected by NSP and state portals. Verify NPCI mapping before submitting scholarship forms: ask the bank teller 'Is my account mapped to NPCI for Aadhaar payments?'"
  }
];

/* =========================================================
   2. DOM UTILITIES & HELPERS
   ========================================================= */
function esc(str) {
  return String(str || "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function fmtSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function getFileIcon(type) {
  if (type === "application/pdf") return { emoji: "📕", cls: "pdf" };
  if (type.startsWith("image/")) return { emoji: "🖼️", cls: "img" };
  return { emoji: "📄", cls: "pdf" };
}

/* =========================================================
   3. CARD RENDERING ENGINE
   ========================================================= */
function renderCards() {
  const grids = {
    govt: document.getElementById("grid-govt"),
    id: document.getElementById("grid-id"),
    edu: document.getElementById("grid-edu"),
    finance: document.getElementById("grid-finance")
  };

  Object.values(grids).forEach(g => { if (g) g.innerHTML = ""; });

  DOCS.forEach(doc => {
    const grid = grids[doc.cat];
    if (!grid) return;

    const card = document.createElement("div");
    card.className = "doc-card";
    card.dataset.id = doc.id;
    card.dataset.cat = doc.cat;
    card.dataset.search = (doc.name + " " + doc.nameHi + " " + doc.officials.join(" ") + " " + doc.tip).toLowerCase();
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <div class="dc-top">
        <div class="dc-icon ${doc.iconType}">${doc.icon}</div>
        <div class="dc-title">
          <h3>${esc(doc.name)}</h3>
          <span class="dc-hi">${esc(doc.nameHi)}</span>
        </div>
      </div>
      <div class="dc-pills">
        <span class="dc-pill">⏱ ${esc(doc.time)}</span>
        <span class="dc-pill">${esc(doc.fee)}</span>
        <span class="dc-pill ${doc.online ? "online" : "offline"}">${doc.online ? "🌐 Online Available" : "🏢 Offline Only"}</span>
      </div>
      <div class="dc-foot">
        <span>Validity: ${esc(doc.validity.split("(")[0])}</span>
        <span class="dc-cta">View full guide →</span>
      </div>
    `;

    card.addEventListener("click", () => openPanel(doc.id));
    card.addEventListener("keydown", e => { if (e.key === "Enter") openPanel(doc.id); });
    grid.appendChild(card);
  });
}

/* =========================================================
   4. SLIDE-OUT DETAIL PANEL DRAWER
   ========================================================= */
const overlay = document.getElementById("slideOverlay");
const spEmoji = document.getElementById("spEmoji");
const spTitle = document.getElementById("spTitle");
const spSub   = document.getElementById("spSub");
const spBody  = document.getElementById("spBody");

function openPanel(id) {
  const doc = DOCS.find(d => d.id === id);
  if (!doc) return;

  spEmoji.className = `sp-emoji ${doc.iconType}`;
  spEmoji.textContent = doc.icon;
  spTitle.textContent = doc.name;
  spSub.textContent = `${doc.nameHi} · ${doc.cat.toUpperCase()} CATEGORY`;

  spBody.innerHTML = `
    <div class="sp-meta">
      <div class="sp-meta-box">
        <strong>Validity Period</strong>
        <span>${esc(doc.validity)}</span>
      </div>
      <div class="sp-meta-box">
        <strong>Standard Fee</strong>
        <span>${esc(doc.fee)}</span>
      </div>
      <div class="sp-meta-box">
        <strong>Processing Time</strong>
        <span>${esc(doc.time)}</span>
      </div>
      <div class="sp-meta-box ${doc.online ? "is-online" : "is-offline"}">
        <strong>Online Process</strong>
        <span>${doc.online ? "✅ Yes — Apply Online" : "❌ Offline Office Visit"}</span>
      </div>
    </div>

    ${doc.online ? `
    <div class="sp-sec">
      <h4>🌐 Online Application Portal</h4>
      <div class="sp-portal">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>${esc(doc.portal)}</span>
      </div>
    </div>` : ""}

    <div class="sp-sec">
      <h4>🏢 Issuing Office & Counter</h4>
      <ul><li>${esc(doc.office)}</li></ul>
    </div>

    <div class="sp-sec">
      <h4>👤 Officials Involved (Designations)</h4>
      <div class="sp-chips">
        ${doc.officials.map(o => `<span class="sp-chip">${esc(o)}</span>`).join("")}
      </div>
    </div>

    <div class="sp-sec">
      <h4>📋 Step-by-Step Procedure</h4>
      <ol>
        ${doc.steps.map(s => `<li>${esc(s)}</li>`).join("")}
      </ol>
    </div>

    <div class="sp-sec">
      <h4>📎 Prerequisite Documents to Carry</h4>
      <ul>
        ${doc.docsRequired.map(d => `<li>${esc(d)}</li>`).join("")}
      </ul>
    </div>

    <div class="sp-tip">
      <strong>💡 Scholarship Pro Tip</strong>
      ${esc(doc.tip)}
    </div>

    <div style="margin-top:12px; padding-top:16px; border-top:1px solid var(--surface-border); display:flex; gap:10px; flex-wrap:wrap;">
      <button class="v-btn" onclick="openLORGenerator('${doc.id}')" style="background:var(--crimson); color:#fff; border-color:var(--crimson); font-weight:600; padding:10px 18px;">
        ${doc.id === 'lor' ? '✍️ Generate LOR Draft Template' : '✍️ Quick Reference / Template'}
      </button>
      <button class="v-btn" onclick="document.getElementById('vault').scrollIntoView({behavior:'smooth'}); closePanel();" style="padding:10px 18px;">
        📁 Upload this to Vault
      </button>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("slidePanel").scrollTop = 0;
}

function closePanel() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

const closeBtn = document.getElementById("spClose");
if (closeBtn) closeBtn.addEventListener("click", closePanel);
if (overlay) {
  overlay.addEventListener("click", e => { if (e.target === overlay) closePanel(); });
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && overlay && overlay.classList.contains("open")) closePanel();
});

/* =========================================================
   5. SEARCH & CATEGORY FILTER ENGINE
   ========================================================= */
function initSearchAndTabs() {
  const tabs = document.querySelectorAll(".cat-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.dataset.cat;

      document.querySelectorAll(".doc-card").forEach(card => {
        card.classList.toggle("hidden", cat !== "all" && card.dataset.cat !== cat);
      });

      ["govt", "id", "edu", "finance"].forEach(c => {
        const sec = document.getElementById("sec-" + c);
        if (sec) sec.style.display = (cat === "all" || cat === c) ? "" : "none";
      });
    });
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const q = this.value.trim().toLowerCase();
      document.querySelectorAll(".doc-card").forEach(card => {
        card.classList.toggle("hidden", q !== "" && !card.dataset.search.includes(q));
      });

      if (q) {
        tabs.forEach(t => t.classList.remove("active"));
        const allTab = document.querySelector('[data-cat="all"]');
        if (allTab) allTab.classList.add("active");
        ["govt", "id", "edu", "finance"].forEach(c => {
          const s = document.getElementById("sec-" + c);
          if (s) s.style.display = "";
        });
      }
    });
  }
}

/* =========================================================
   6. DIGILOCKER-STYLE DOCUMENT VAULT (IndexedDB)
   ========================================================= */
const DB_NAME = "avsar_doc_vault";
const DB_VER  = 1;
const STORE   = "files";
let vaultDB   = null;

function openVaultDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
      }
    };
    req.onsuccess = e => { vaultDB = e.target.result; resolve(vaultDB); };
    req.onerror = () => reject(req.error);
  });
}

function dbTx(mode = "readonly") {
  return vaultDB.transaction(STORE, mode).objectStore(STORE);
}

function dbAddFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const record = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: reader.result,
        at: new Date().toISOString()
      };
      const req = dbTx("readwrite").add(record);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function dbGetAllFiles() {
  return new Promise((resolve, reject) => {
    const req = dbTx().getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbGetFile(id) {
  return new Promise((resolve, reject) => {
    const req = dbTx().get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbDeleteFile(id) {
  return new Promise((resolve, reject) => {
    const req = dbTx("readwrite").delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function renderVault() {
  const list = document.getElementById("vaultList");
  if (!list) return;

  try {
    const files = await dbGetAllFiles();
    if (!files.length) {
      list.innerHTML = `
        <div class="vault-empty">
          Your vault is empty. Upload your marksheets, income certificate, Aadhaar, and bonafide letters above.<br>
          <span style="font-size:0.75rem; color:var(--ink-muted);">All documents remain strictly private in your local browser cache (DigiLocker style).</span>
        </div>`;
      return;
    }

    list.innerHTML = files.map(f => {
      const ic = getFileIcon(f.type);
      const d = new Date(f.at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      return `
        <div class="vault-item" data-id="${f.id}">
          <div class="v-icon ${ic.cls}">${ic.emoji}</div>
          <div class="v-info">
            <div class="v-name" title="${esc(f.name)}">${esc(f.name)}</div>
            <div class="v-meta">${fmtSize(f.size)} · Uploaded ${d}</div>
          </div>
          <div class="v-actions">
            <button class="v-btn pv" data-id="${f.id}">👁 Preview</button>
            <button class="v-btn dl" data-id="${f.id}">⬇ Download</button>
            <button class="v-btn del" data-id="${f.id}">✕ Remove</button>
          </div>
        </div>`;
    }).join("");

    /* Attach event listeners */
    list.querySelectorAll(".pv").forEach(b => b.addEventListener("click", async () => {
      const f = await dbGetFile(Number(b.dataset.id));
      if (!f) return;
      const w = window.open("", "_blank");
      if (f.type.startsWith("image/")) {
        w.document.write(`<html><head><title>${esc(f.name)}</title></head><body style="margin:0;background:#151515;display:flex;align-items:center;justify-content:center;min-height:100vh;"><img src="${f.data}" style="max-width:96%;max-height:96vh;object-fit:contain;border-radius:4px;box-shadow:0 8px 30px rgba(0,0,0,0.5);"></body></html>`);
      } else {
        w.document.write(`<html><head><title>${esc(f.name)}</title></head><body style="margin:0;"><iframe src="${f.data}" style="width:100%;height:100vh;border:none;"></iframe></body></html>`);
      }
    }));

    list.querySelectorAll(".dl").forEach(b => b.addEventListener("click", async () => {
      const f = await dbGetFile(Number(b.dataset.id));
      if (!f) return;
      const a = document.createElement("a");
      a.href = f.data;
      a.download = f.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }));

    list.querySelectorAll(".del").forEach(b => b.addEventListener("click", async () => {
      const name = b.closest(".vault-item").querySelector(".v-name").textContent;
      if (!confirm(`Delete "${name}" from your vault?`)) return;
      await dbDeleteFile(Number(b.dataset.id));
      renderVault();
    }));

  } catch (e) {
    list.innerHTML = `<div class="vault-empty">Could not access browser IndexedDB.</div>`;
  }
}

async function handleVaultFiles(files) {
  const MAX = 5 * 1024 * 1024;
  const ALLOWED = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

  for (const f of files) {
    if (!ALLOWED.includes(f.type)) {
      alert(`"${f.name}" is not supported. Only PDF, JPG, and PNG files are accepted.`);
      continue;
    }
    if (f.size > MAX) {
      alert(`"${f.name}" exceeds the 5 MB limit (${fmtSize(f.size)}).`);
      continue;
    }
    await dbAddFile(f);
  }
  renderVault();
}

function initVault() {
  openVaultDB().then(renderVault).catch(() => {
    const list = document.getElementById("vaultList");
    if (list) list.innerHTML = `<div class="vault-empty">IndexedDB storage is not enabled in this browser.</div>`;
  });

  const area = document.getElementById("vaultUpload");
  const input = document.getElementById("vaultInput");
  if (area) {
    area.addEventListener("dragover", e => { e.preventDefault(); area.classList.add("drag-over"); });
    area.addEventListener("dragleave", () => area.classList.remove("drag-over"));
    area.addEventListener("drop", e => {
      e.preventDefault();
      area.classList.remove("drag-over");
      if (e.dataTransfer.files.length) handleVaultFiles(e.dataTransfer.files);
    });
  }
  if (input) {
    input.addEventListener("change", () => {
      if (input.files.length) handleVaultFiles(input.files);
      input.value = "";
    });
  }
}

/* =========================================================
   7. JAVASCRIPT FEATURE: DYNAMIC LOR DRAFT GENERATOR
   Generates customized Letter of Recommendation letters
   for teachers/professors to sign.
   ========================================================= */
function openLORGenerator(docId) {
  let modal = document.getElementById("lorModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "lorModal";
    modal.className = "slide-overlay";
    modal.innerHTML = `
      <div class="slide-panel" style="width:min(640px,96vw); z-index:250;">
        <div class="sp-head">
          <div class="sp-emoji edu">✍️</div>
          <div class="sp-head-txt">
            <h3 style="margin:0;">Letter of Recommendation (LOR) Generator</h3>
            <span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--ink-muted);">Customized Academic Recommendation Letter Template</span>
          </div>
          <button class="sp-close" id="lorModalClose">✕</button>
        </div>
        <div class="sp-body">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; color:var(--ink-muted);">Student Name</label>
              <input type="text" id="lorStudentName" placeholder="e.g. Ananya Sharma" style="width:100%; padding:10px; border:1px solid var(--surface-border); border-radius:6px; font-size:0.9rem;">
            </div>
            <div>
              <label style="font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; color:var(--ink-muted);">Recommender Designation</label>
              <select id="lorRecommenderRole" style="width:100%; padding:10px; border:1px solid var(--surface-border); border-radius:6px; font-size:0.9rem;">
                <option value="Professor & Head of Department">Professor & HOD</option>
                <option value="Senior Subject Faculty / Lecturer">Subject Faculty / Lecturer</option>
                <option value="School Principal / Headmaster">School Principal</option>
                <option value="Academic Mentor / Class Teacher">Class Teacher</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; color:var(--ink-muted);">Institution Name</label>
              <input type="text" id="lorInstName" placeholder="e.g. Delhi University / Kendriya Vidyalaya" style="width:100%; padding:10px; border:1px solid var(--surface-border); border-radius:6px; font-size:0.9rem;">
            </div>
            <div>
              <label style="font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; color:var(--ink-muted);">Scholarship Scheme Name</label>
              <input type="text" id="lorSchemeName" placeholder="e.g. National Scholarship / Pragati" style="width:100%; padding:10px; border:1px solid var(--surface-border); border-radius:6px; font-size:0.9rem;">
            </div>
          </div>

          <div>
            <label style="font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; color:var(--ink-muted);">Key Strengths & Merits to Highlight</label>
            <input type="text" id="lorStrengths" placeholder="e.g. Top 5% academic rank, exceptional dedication, strong leadership" style="width:100%; padding:10px; border:1px solid var(--surface-border); border-radius:6px; font-size:0.9rem;">
          </div>

          <button id="lorGenerateBtn" class="v-btn" style="background:var(--crimson); color:#fff; border-color:var(--crimson); font-weight:600; padding:12px; width:100%; font-size:0.85rem;">
            ✨ Generate Formatted LOR Letter
          </button>

          <div id="lorResultContainer" style="display:none; margin-top:14px;">
            <label style="font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; color:var(--ink-muted); display:flex; justify-content:space-between;">
              <span>Generated Recommendation Draft</span>
              <button id="lorCopyBtn" style="background:none; border:none; color:var(--crimson); cursor:pointer; font-weight:600; font-family:var(--font-mono);">📋 Copy to Clipboard</button>
            </label>
            <textarea id="lorOutputText" rows="12" readonly style="width:100%; margin-top:6px; padding:12px; font-family:var(--font-mono); font-size:0.82rem; line-height:1.5; border:1px solid var(--surface-border); border-radius:6px; background:var(--bg-alt);"></textarea>
            <button id="lorDownloadBtn" class="v-btn" style="margin-top:10px; width:100%; border-color:var(--mint); color:var(--mint-deep); font-weight:600;">
              ⬇ Download as Official Draft (.txt)
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("lorModalClose").addEventListener("click", () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    });

    document.getElementById("lorGenerateBtn").addEventListener("click", () => {
      const sName = document.getElementById("lorStudentName").value.trim() || "[Student Name]";
      const role  = document.getElementById("lorRecommenderRole").value;
      const inst  = document.getElementById("lorInstName").value.trim() || "[Institution Name]";
      const scheme = document.getElementById("lorSchemeName").value.trim() || "[Scholarship Scheme]";
      const merits = document.getElementById("lorStrengths").value.trim() || "consistent academic excellence, moral integrity, and high dedication";
      const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

      const template = 
`TO WHOMSOEVER IT MAY CONCERN

Date: ${dateStr}
Letter of Recommendation for ${sName}

Subject: Recommendation for the ${scheme}

It is my pleasure to provide this Letter of Recommendation for ${sName}, who has been a bona fide student at ${inst}. As their ${role}, I have observed their academic trajectory, conduct, and dedication closely.

During their tenure under my supervision, ${sName} has consistently distinguished themselves through ${merits}. They exhibit an intellectual curiosity and a relentless commitment to achieving their potential despite competitive challenges.

Beyond academic metrics, ${sName} demonstrates exemplary character, humility, and positive teamwork among peers. I have no doubt that they represent the highest caliber of candidate that the ${scheme} seeks to empower.

I recommend ${sName} wholeheartedly without any reservations for this scholarship. Providing them with this financial and merit-based endorsement will undoubtedly catalyze their long-term academic and social contribution.

Sincerely,

_________________________
[Signature & Seal]
Name: [Recommender Name]
Designation: ${role}
Institution: ${inst}
Official Contact / Email: [recommender@institution.edu]`;

      document.getElementById("lorOutputText").value = template;
      document.getElementById("lorResultContainer").style.display = "block";
    });

    document.getElementById("lorCopyBtn").addEventListener("click", () => {
      const txt = document.getElementById("lorOutputText").value;
      navigator.clipboard.writeText(txt).then(() => {
        alert("LOR draft copied to clipboard! You can paste it into Word or share with your teacher.");
      });
    });

    document.getElementById("lorDownloadBtn").addEventListener("click", () => {
      const txt = document.getElementById("lorOutputText").value;
      const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `Letter_of_Recommendation_${document.getElementById("lorStudentName").value.trim() || "Student"}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* =========================================================
   8. BACK TO TOP
   ========================================================= */
const backTop = document.getElementById("backTop");
if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("visible", window.scrollY > 350);
  }, { passive: true });
}

/* =========================================================
   9. INITIALIZATION
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  initSearchAndTabs();
  initVault();
});
