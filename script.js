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
  ,
  {
    id: "pm-yasasvi-scheme",
    name: "PM Young Achievers Scholarship Award Scheme (PM-YASASVI)",
    provider: "Ministry of Social Justice and Empowerment (MSJE)",
    type: "need",
    levels: ["class10", "class12"],
    categories: ["obc", "ebc", "nomadic"],
    minScore: 60,
    maxIncome: 250000,
    gender: "any",
    states: "all",
    amount: "₹75,000 – ₹1,25,000 / year",
    deadline: "15 Dec",
    documents: ["Previous year marksheet", "OBC/EBC caste certificate", "Family income certificate", "Aadhaar card", "Bank passbook"],
    steps: [
      "Register through the National Scholarship Portal (scholarships.gov.in)",
      "Select PM-YASASVI Top-Class / Pre-Matric school scheme",
      "Upload attested school bonafide and income proof",
      "Verification by Institute Nodal Officer and District Officer"
    ]
  }
  ,
  {
    id: "aicte-saksham-pwd",
    name: "AICTE Saksham Scholarship for Specially-Abled Students",
    provider: "All India Council for Technical Education (AICTE)",
    type: "need",
    levels: ["ug", "pg", "diploma"],
    categories: ["general", "obc", "sc", "st", "ews"],
    minScore: 0,
    maxIncome: 800000,
    gender: "any",
    states: "all",
    amount: "Rs. 50,000 / year",
    deadline: "30 Nov",
    documents: ["Disability certificate (40%+)", "AADHAR card", "Income certificate", "Previous year marksheet", "Institute bonafide certificate"],
    steps: [
      "Register on the AICTE Scholarship portal (aicte-india.org)",
      "Upload valid disability certificate from competent authority",
      "Complete AICTE Saksham application and submit",
      "Track verification status via AICTE Student Scholarship Dashboard"
    ]
  }
  ,
  {
    id: "nsp-minority-postmatric",
    name: "Post-Matric Scholarship for Minority Students",
    provider: "Ministry of Minority Affairs (National Scholarship Portal)",
    type: "need",
    levels: ["class12", "ug", "pg", "diploma"],
    categories: ["minority"],
    minScore: 50,
    maxIncome: 200000,
    gender: "any",
    states: "all",
    amount: "Maintenance allowance + course fees",
    deadline: "31 Oct",
    documents: ["Minority community certificate", "Income certificate", "Previous year marksheet", "Fee receipt from institution", "Aadhaar card"],
    steps: [
      "Register on National Scholarship Portal (scholarships.gov.in)",
      "Select Post-Matric Scholarship for Minority Scheme",
      "Upload minority community and income certificate",
      "Submit and track via NSP Student Dashboard"
    ]
  }
  ,
  {
    id: "begum-hazrat-mahal",
    name: "Begum Hazrat Mahal National Scholarship for Minority Girls",
    provider: "Maulana Azad Education Foundation (Ministry of Minority Affairs)",
    type: "need",
    levels: ["class10", "class12"],
    categories: ["minority"],
    minScore: 50,
    maxIncome: 200000,
    gender: "female",
    states: "all",
    amount: "Rs. 5,000 – Rs. 6,000 / year",
    deadline: "30 Sep",
    documents: ["Minority community certificate", "Income certificate", "Marksheet (Class 9/11)", "School bonafide", "Bank passbook"],
    steps: [
      "Apply via National Scholarship Portal (scholarships.gov.in)",
      "Select Begum Hazrat Mahal National Scholarship",
      "Upload minority certificate verified by district minority officer",
      "Track status on NSP student dashboard"
    ]
  }
  ,
  {
    id: "ishan-uday-ner",
    name: "Ishan Uday Special Scholarship Scheme for North-East Region",
    provider: "University Grants Commission (UGC)",
    type: "need",
    levels: ["ug"],
    categories: ["general", "obc", "sc", "st", "ews"],
    minScore: 60,
    maxIncome: 450000,
    gender: "any",
    states: ["AR", "AS", "MN", "ML", "MZ", "NL", "SK", "TR"],
    amount: "Rs. 54,000 / year (Day Scholar) or Rs. 1,00,000 / year (Hosteller)",
    deadline: "30 Sep",
    documents: ["State domicile certificate", "Income certificate", "Class 12 marksheet (60%+)", "Bank passbook", "Bonafide certificate from UGC-recognized institution"],
    steps: [
      "Apply at ugc.ac.in/ishan-uday during the annual cycle",
      "Upload Class 12 marksheet and state domicile proof",
      "Get verification from head of institution",
      "UGC disburses directly to bank account via DBT"
    ]
  }
  ,
  {
    id: "swami-vivekananda-wb",
    name: "Swami Vivekananda Merit-cum-Means Scholarship (West Bengal)",
    provider: "West Bengal Government (Higher Education Department)",
    type: "both",
    levels: ["ug", "pg"],
    categories: ["general", "obc", "sc", "st"],
    minScore: 75,
    maxIncome: 250000,
    gender: "any",
    states: ["WB"],
    amount: "Rs. 1,000 – Rs. 5,000 / month",
    deadline: "31 Oct",
    documents: ["WB domicile certificate", "Income certificate", "Previous marksheet (75%+)", "College bonafide", "Bank passbook (nationalized bank)"],
    steps: [
      "Apply at svmcm.wbhed.gov.in",
      "Fill merit-cum-means form with income and marksheet details",
      "Get institutional verification from college principal",
      "Track status and renewal on SVMCM portal"
    ]
  }
  ,
  {
    id: "mp-medhavi-scheme",
    name: "Mukhyamantri Medhavi Vidyarthi Yojana (Madhya Pradesh)",
    provider: "Madhya Pradesh Higher Education Department",
    type: "merit",
    levels: ["ug", "pg", "diploma"],
    categories: ["general", "obc", "sc", "st", "ews"],
    minScore: 70,
    maxIncome: 150000,
    gender: "any",
    states: ["MP"],
    amount: "Full tuition fee reimbursement",
    deadline: "30 Nov",
    documents: ["MP domicile certificate", "Class 12 marksheet (70%+ CBSE / 85%+ MP Board)", "Income certificate", "Bank passbook", "College fee receipt"],
    steps: [
      "Apply at scholarshipportal.mp.nic.in",
      "Select Medhavi Vidyarthi Yojana scheme",
      "Upload Class 12 marksheet and domicile proof",
      "College verifies and MP Govt reimburses tuition fee"
    ]
  }
  ,
  {
    id: "bihar-post-matric-bc-ebc",
    name: "Bihar Post-Matric Scholarship for BC & EBC Students",
    provider: "Bihar Backward Classes & Extremely Backward Classes Welfare Department",
    type: "need",
    levels: ["ug","pg","diploma"],
    categories: ["obc"],
    minScore: 0,
    maxIncome: 300000,
    gender: "any",
    states: ["BR"],
    amount: "Course fees reimbursement + monthly maintenance allowance",
    deadline: "30 Nov",
    documents: ["Bihar Residential Certificate","Caste Certificate (BC/EBC)","Income Certificate (revenue officer)","Fee structure receipt","College Bonafide Certificate"],
    steps: [
      "Register on Bihar Post Matric Scholarship Portal (pmsonline.bih.nic.in)",
      "Fill student profile with bank account details linked to Aadhaar",
      "Upload institutional bonafide and fee structure certificate",
      "District Welfare Officer verifies and releases DBT payment"
    ]
  }
  ,
  {
    id: "up-dashmottar-scholarship",
    name: "Uttar Pradesh Dashmottar Scholarship and Fee Reimbursement",
    provider: "Social Welfare Department, Government of Uttar Pradesh",
    type: "need",
    levels: ["ug","pg","diploma"],
    categories: ["general","obc","sc","st","minority"],
    minScore: 50,
    maxIncome: 250000,
    gender: "any",
    states: ["UP"],
    amount: "Full non-refundable tuition fee reimbursement + annual maintenance allowance",
    deadline: "10 Dec",
    documents: ["UP Domicile Certificate","Annual Income Certificate","Category/Caste Certificate","High school & Intermediate marksheets","Aadhaar authenticated bank passbook"],
    steps: [
      "Register on UP Scholarship Portal (scholarship.up.gov.in)",
      "Complete online registration and link DigiLocker certificate data",
      "Submit printout with self-attested documents to college scholarship desk",
      "Verify online status until District Social Welfare Officer sanction"
    ]
  }
  ,
  {
    id: "karnataka-vidyasiri-epass",
    name: "Karnataka Vidyasiri (ePASS) Food and Accommodation Scholarship",
    provider: "Backward Classes Welfare Department, Government of Karnataka",
    type: "need",
    levels: ["ug","pg","diploma"],
    categories: ["obc","sc","st"],
    minScore: 0,
    maxIncome: 250000,
    gender: "any",
    states: ["KA"],
    amount: "Rs. 1,500 / month hostel & food allowance (Rs. 15,000 / year)",
    deadline: "25 Dec",
    documents: ["Karnataka Domicile Proof","RD Number verified Income & Caste Certificate","Aadhaar Card","College Bonafide with student USN","Hostel distance verification declaration"],
    steps: [
      "Apply through State Scholarship Portal Karnataka (ssp.postmatric.karnataka.gov.in)",
      "Authenticate with student e-Attestation and Seva Sindhu certificates",
      "Institute Nodal Officer e-attests admission and attendance records",
      "Monthly stipend credited directly to bank account via DBT"
    ]
  }
  ,
  {
    id: "rajasthan-uttar-matric-scheme",
    name: "Rajasthan Uttar Matric Scholarship Scheme",
    provider: "Social Justice and Empowerment Department, Government of Rajasthan",
    type: "need",
    levels: ["class12","ug","pg","diploma"],
    categories: ["sc","st","obc","ews"],
    minScore: 50,
    maxIncome: 250000,
    gender: "any",
    states: ["RJ"],
    amount: "100% course tuition fees + monthly stipend",
    deadline: "31 Dec",
    documents: ["Jan Aadhaar Card","Rajasthan Mool Niwas Domicile Certificate","Valid Income Certificate","Previous educational marksheets","Fee receipt from university"],
    steps: [
      "Login using SSO ID on SSO Rajasthan Portal (sso.rajasthan.gov.in)",
      "Select SJMS Scholarship application module",
      "Fetch verified certificates automatically using Jan Aadhaar ID",
      "Institutional verification followed by Treasury sanction"
    ]
  }
  ,
  {
    id: "tn-uzhavar-pathukappu-scholarship",
    name: "Tamil Nadu Chief Minister Uzhavar Pathukappu Thittam Education Assistance",
    provider: "Revenue and Disaster Management Department, Government of Tamil Nadu",
    type: "need",
    levels: ["ug","pg","diploma"],
    categories: ["general","obc","sc","st"],
    minScore: 0,
    maxIncome: 120000,
    gender: "any",
    states: ["TN"],
    amount: "Rs. 2,000 – Rs. 6,000 / year based on course level",
    deadline: "15 Jan",
    documents: ["Farmers Social Security Scheme Member Card","Tamil Nadu Nativity Certificate","Bonafide Certificate from College","Aadhaar Card copy","Bank account passbook"],
    steps: [
      "Submit application at Taluk Special Tahsildar office or online e-Sevai portal",
      "Enclose Uzhavar Pathukappu Thittam registration passbook copy",
      "Attach Head of Institution bonafide certificate",
      "Direct bank credit by Social Security Scheme wing"
    ]
  }
  ,
  {
    id: "kerala-vidyakiranam-differently-abled",
    name: "Kerala Vidyakiranam Educational Assistance for Children of PWD Parents",
    provider: "Social Justice Department, Government of Kerala",
    type: "need",
    levels: ["class10","class12","ug","pg"],
    categories: ["general","obc","sc","st"],
    minScore: 0,
    maxIncome: 100000,
    gender: "any",
    states: ["KL"],
    amount: "Rs. 3,500 – Rs. 10,000 / year",
    deadline: "20 Jan",
    documents: ["Parent Disability Certificate (40%+)","BPL Ration Card or Revenue Income Certificate","Kerala Domicile Certificate","Study Certificate from school/college","Student Aadhaar linked bank passbook"],
    steps: [
      "Apply online through SUNEETHI portal (suneethi.sjd.kerala.gov.in)",
      "Upload parent Medical Board disability card and BPL certificate",
      "Submit printout with institution head sign to District Social Justice Officer",
      "Fund disbursement through e-Treasury DBT"
    ]
  }
  ,
  {
    id: "nmms-national-means-merit",
    name: "National Means-cum-Merit Scholarship (NMMSS)",
    provider: "Department of School Education and Literacy (Ministry of Education)",
    type: "both",
    levels: ["class10"],
    categories: ["general","obc","sc","st","ews"],
    minScore: 55,
    maxIncome: 350000,
    gender: "any",
    states: "all",
    amount: "₹12,000 / year (₹1,000 / month)",
    deadline: "15 Dec",
    documents: ["Class 8 marksheet (55%+ marks)","Income certificate from revenue authority","Government school study certificate","Aadhaar linked bank passbook"],
    steps: [
      "Qualify state-level NMMS selection exam in Class 8",
      "Register on National Scholarship Portal under NMMSS scheme",
      "Get school verification from principal and district nodal officer",
      "Direct Benefit Transfer of ₹12,000 annually through Class 9 to 12"
    ]
  }
  ,
  {
    id: "top-class-sc-education",
    name: "Top Class Education Scheme for SC Students",
    provider: "Ministry of Social Justice and Empowerment (MSJE)",
    type: "need",
    levels: ["ug","pg"],
    categories: ["sc"],
    minScore: 0,
    maxIncome: 800000,
    gender: "any",
    states: "all",
    amount: "Full tuition fee + ₹86,000 annual living expenses + ₹45,000 computer grant",
    deadline: "31 Dec",
    documents: ["SC Caste certificate","Family income certificate (<₹8 Lakh)","Admission letter to notified top-class institute (IIT/IIM/NIT/AIIMS)","Fee structure receipt"],
    steps: [
      "Secure admission in one of the 260+ notified premier institutes",
      "Apply through National Scholarship Portal (NSP)",
      "Institute Nodal Officer verifies admission and category credentials",
      "Full fee and maintenance allowance credited by Ministry"
    ]
  }
  ,
  {
    id: "top-class-st-education",
    name: "National Fellowship and Scholarship for Higher Education of ST Students",
    provider: "Ministry of Tribal Affairs (MoTA)",
    type: "need",
    levels: ["ug","pg","phd"],
    categories: ["st"],
    minScore: 0,
    maxIncome: 600000,
    gender: "any",
    states: "all",
    amount: "Full tuition fee reimbursement + ₹3,000/month living + ₹2,200 book grant",
    deadline: "31 Dec",
    documents: ["ST Tribe Certificate","Annual income certificate (<₹6 Lakh)","Admission offer from top-class institution","Student bank account passbook"],
    steps: [
      "Obtain admission into notified premier central/state universities",
      "Submit application on National Scholarship Portal",
      "Institute Nodal Officer completes electronic verification",
      "Disbursed directly into student account under MoTA Top Class scheme"
    ]
  }
  ,
  {
    id: "aicte-swanath-scheme",
    name: "AICTE Swanath Scholarship Scheme",
    provider: "All India Council for Technical Education (AICTE)",
    type: "need",
    levels: ["ug","diploma"],
    categories: ["general","obc","sc","st","ews"],
    minScore: 0,
    maxIncome: 800000,
    gender: "any",
    states: "all",
    amount: "₹50,000 / year for every year of study",
    deadline: "30 Nov",
    documents: ["Death certificate of parents (for orphans) or COVID death proof","Income certificate (<₹8 Lakh)","AICTE approved college bonafide","Marksheet of qualifying exam"],
    steps: [
      "Open for orphans, wards of parents who died of COVID-19, and wards of Armed Forces martyrs",
      "Apply on the National Scholarship Portal under AICTE Swanath scheme",
      "Submit valid documentary proof of orphan status or martyrdom certificate",
      "Annual grant of ₹50,000 credited via DBT"
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
  "dbt-jrf-biotech":          { date: "2027-02-28" },
  "pm-yasasvi-scheme":          { date: "2026-12-15" },
  "mp-medhavi-scheme": { date: "2026-11-30" },
  "aicte-saksham-pwd":         { date: "2026-11-30" },
  "nsp-minority-postmatric":   { date: "2026-10-31" },
  "begum-hazrat-mahal":        { date: "2026-09-30" },
  "ishan-uday-ner":            { date: "2026-09-30" },
  "swami-vivekananda-wb":      { date: "2026-10-31" },
  "bihar-post-matric-bc-ebc": { date: "2026-11-30" },
  "up-dashmottar-scholarship": { date: "2026-12-10" },
  "karnataka-vidyasiri-epass": { date: "2026-12-25" },
  "rajasthan-uttar-matric-scheme": { date: "2026-12-31" },
  "tn-uzhavar-pathukappu-scholarship": { date: "2027-01-15" },
  "kerala-vidyakiranam-differently-abled": { date: "2027-01-20" },
  "nmms-national-means-merit": { date: "2026-12-15" },
  "top-class-sc-education": { date: "2026-12-31" },
  "top-class-st-education": { date: "2026-12-31" },
  "aicte-swanath-scheme": { date: "2026-11-30" },
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
   VAULT (DIGILOCKER) INTEGRATION FOR SCHOLARSHIP APPLICATIONS
   Connects the scholarship finder directly to the user's
   local browser vault in IndexedDB.
   ========================================================= */
function getVaultFilesFromDB(){
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open("avsar_doc_vault", 1);
      req.onsuccess = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("files")){ resolve([]); return; }
        const tx = db.transaction("files", "readonly");
        const store = tx.objectStore("files");
        const allReq = store.getAll();
        allReq.onsuccess = () => resolve(allReq.result || []);
        allReq.onerror = () => resolve([]);
      };
      req.onerror = () => resolve([]);
    } catch (err) {
      resolve([]);
    }
  });
}

function matchDocRequirement(docName, vaultFiles){
  const clean = docName.toLowerCase();
  for (const f of vaultFiles){
    const fn = f.name.toLowerCase();
    if (clean.includes("income") && fn.includes("income")) return f;
    if (clean.includes("aadhaar") && fn.includes("aadhaar")) return f;
    if (clean.includes("caste") && (fn.includes("caste") || fn.includes("category"))) return f;
    if (clean.includes("tribe") && (fn.includes("st") || fn.includes("tribe"))) return f;
    if (clean.includes("marksheet") && (fn.includes("mark") || fn.includes("score") || fn.includes("10") || fn.includes("12") || fn.includes("degree") || fn.includes("result"))) return f;
    if (clean.includes("passbook") && (fn.includes("passbook") || fn.includes("bank") || fn.includes("account"))) return f;
    if (clean.includes("bonafide") && fn.includes("bonafide")) return f;
    if (clean.includes("ews") && fn.includes("ews")) return f;
    if (clean.includes("domicile") && (fn.includes("domicile") || fn.includes("niwas") || fn.includes("residence"))) return f;
    if (clean.includes("recommendation") && (fn.includes("lor") || fn.includes("recommendation"))) return f;
    if (clean.includes("admission") && (fn.includes("admission") || fn.includes("allotment") || fn.includes("fee"))) return f;
  }
  return null;
}

function downloadApplicationDossier(scholarship, matchedList){
  const currentUser = lastUser || {};
  let loginData = {};
  try { loginData = JSON.parse(localStorage.getItem(LOGIN_KEY) || "{}"); } catch(e){}

  const dossier = {
    dossierTitle: "Avsar Scholarship Application Dossier (DigiLocker Integration)",
    generatedAt: new Date().toISOString(),
    applicant: {
      fullName: loginData.name || "Student Applicant",
      email: loginData.email || "student@example.com",
      educationStage: levelLabel[currentUser.level] || currentUser.level || "Not specified",
      category: (currentUser.category || "General").toUpperCase(),
      lastExamScore: (currentUser.score || 0) + "%",
      annualFamilyIncome: "₹" + (currentUser.income || 0).toLocaleString("en-IN"),
      gender: currentUser.gender || "Not specified",
      domicileState: currentUser.state || "All-India"
    },
    scholarshipScheme: {
      id: scholarship.id,
      name: scholarship.name,
      provider: scholarship.provider,
      awardAmount: scholarship.amount,
      deadline: scholarship.deadline,
      applicationType: typeLabel[scholarship.type]
    },
    documentChecklistManifest: scholarship.documents.map(d => {
      const match = matchedList.find(m => m.requirement === d);
      return {
        requiredDocument: d,
        statusInVault: match && match.file ? "VERIFIED_IN_VAULT" : "PENDING_UPLOAD",
        attachedVaultFileName: match && match.file ? match.file.name : null,
        fileSize: match && match.file ? match.file.size + " bytes" : null
      };
    }),
    submissionSteps: scholarship.steps,
    verificationNotice: "Documents attached via Avsar Client-Side Vault. Verify final compatibility on official provider portal."
  };

  const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: "application/json;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Avsar_Dossier_${scholarship.id}_${(loginData.name || "Applicant").replace(/\s+/g, "_")}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* =========================================================
   MODAL WITH DIGILOCKER VAULT AUTO-MATCHING
   ========================================================= */
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");

async function openModal(id){
  const s = SCHOLARSHIPS.find(x => x.id === id);
  if (!s) return;

  // Query Vault documents from IndexedDB
  const vaultFiles = await getVaultFilesFromDB();
  const matchedDocs = s.documents.map(d => ({
    requirement: d,
    file: matchDocRequirement(d, vaultFiles)
  }));

  const attachedCount = matchedDocs.filter(m => m.file !== null).length;
  const totalCount = s.documents.length;

  modalBody.innerHTML = `
    <h3 id="modalTitle">${s.name}</h3>
    <div class="modal-provider">${s.provider}</div>
    <div class="modal-meta-row">
      <div class="modal-meta-item"><strong>Amount</strong>${s.amount}</div>
      <div class="modal-meta-item"><strong>Deadline</strong>${s.deadline}</div>
      <div class="modal-meta-item"><strong>Type</strong>${typeLabel[s.type]}</div>
    </div>

    <!-- DigiLocker Vault Status Banner -->
    <div style="background:var(--paper-dim); border:1px solid var(--line-paper); border-radius:8px; padding:16px 20px; margin-bottom:22px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          <strong style="font-family:var(--font-mono); font-size:0.75rem; text-transform:uppercase; color:var(--paper-text); letter-spacing:0.04em;">📁 Vault (DigiLocker) Auto-Link Status</strong>
          <p style="margin:4px 0 0; font-size:0.86rem; color:var(--paper-muted);">
            ${attachedCount === totalCount
              ? `<span style="color:var(--marigold-deep); font-weight:600;">✨ All ${totalCount} documents matched & auto-linked from your vault!</span>`
              : `<strong>${attachedCount} of ${totalCount}</strong> documents ready in your vault.`}
          </p>
        </div>
        <a href="documents.html#vault" target="_blank" style="font-family:var(--font-mono); font-size:0.72rem; color:var(--marigold-deep); text-decoration:underline; font-weight:600;">
          Open Vault / Upload ↗
        </a>
      </div>

      <div style="margin-top:14px; display:flex; flex-direction:column; gap:8px;">
        ${matchedDocs.map(m => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--paper); border:1px solid var(--line-paper); border-radius:6px; padding:8px 12px; font-size:0.84rem; color:var(--paper-text);">
            <span><strong>${escapeHtml(m.requirement)}</strong></span>
            ${m.file 
              ? `<span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--marigold-deep); background:rgba(63,191,182,0.18); padding:3px 8px; border-radius:12px;">✓ Auto-Linked: ${escapeHtml(m.file.name)}</span>`
              : `<span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--rose); background:rgba(228,103,91,0.15); padding:3px 8px; border-radius:12px;">⚠️ Not in Vault</span>`}
          </div>
        `).join("")}
      </div>

      <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="exportDossierBtn" class="ledger-view-btn" style="background:var(--ink); color:var(--off-white); font-size:0.78rem; padding:10px 18px; border-radius:4px;">
          📦 Export Application Dossier (.json)
        </button>
        <a href="documents.html" target="_blank" class="ledger-view-btn" style="background:transparent; border:1px solid var(--line-paper); color:var(--paper-text); font-size:0.78rem; padding:9px 16px; text-decoration:none; display:inline-block;">
          📖 View Document Steps Guide ↗
        </a>
      </div>
    </div>

    <div class="modal-section">
      <h4>Steps to apply</h4>
      <ol>${s.steps.map(st => `<li>${st}</li>`).join("")}</ol>
    </div>
  `;

  const expBtn = document.getElementById("exportDossierBtn");
  if (expBtn){
    expBtn.addEventListener("click", () => downloadApplicationDossier(s, matchedDocs));
  }

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
    keywords: ["income certificate", "income proof", "tehsildar", "magistrate", "income tax certificate", "itr"],
    reply: "Income Certificate vs ITR: Scholarships require an official 'Income Certificate' issued by revenue authorities (Tehsildar, Sub-Divisional Magistrate [SDM], or Revenue Officer), NOT merely an Income Tax Return (ITR). For salaried families, Form 16 / ITR acts as supporting evidence, but for agricultural/informal income, the Patwari or Lekhpal conducts a field inquiry. Timeline: 7–15 working days. Fee: ₹20–₹50 (e-District / CSC centers). Validity: 1 financial year. Visit our Documents page (documents.html) for full official authority workflows."
  },
  {
    keywords: ["recommendation", "lor", "letter of recommendation", "reference letter"],
    reply: "Letter of Recommendation (LOR): Needed for merit, doctoral, study-abroad, and research fellowships. Obtain it from your department Head, Dean, or Professor who taught you relevant subjects. We have an interactive 'Interactive LOR Generator' on our Documents page (documents.html) where you can fill in student & faculty details, preview the draft, copy to clipboard, or export as a .txt letter immediately!"
  },
  {
    keywords: ["postman", "postman statement", "postal address", "postmaster"],
    reply: "Postman Statement / Address Verification: Issued by your local Sub-Postmaster or Beat Postman with official postal rubber stamp. It certifies that the student/family has resided at the specified rural or unnumbered residential address for at least 1–3 years. Often requested when formal house tax or utility bills are unavailable. Usually completed in 1–3 days with zero official fee."
  },
  {
    keywords: ["passport", "passport document", "passport seva"],
    reply: "Passport Requirements: Keep ready: 1) Proof of Date of Birth (Aadhaar, Birth Certificate, or 10th marksheet), 2) Proof of Present Address (Aadhaar, Voter ID, Bank Passbook with photo, or Electricity bill), and 3) Non-ECR proof (Class 10+ passing certificate). Book appointments at passportindia.gov.in. Normal fee: ₹1,500 (15–30 days); Tatkaal: ₹3,500 (3–7 days). Check our Documents page for full checklist."
  },
  {
    keywords: ["vault", "digilocker", "dossier", "auto feed", "save documents", "library"],
    reply: "Avsar DigiLocker Vault: You can upload your documents (Marksheet, Income, Caste, Aadhaar, Bank Passbook, LOR) ONCE into your browser's private vault on documents.html. When you check scholarships on this page, Avsar auto-matches your saved files and lets you download a ready-to-submit 'Application Dossier (.json)' directly—eliminating the hassle of clicking photos and converting PDFs every time!"
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
    keywords: ["bonafide", "bonafide certificate", "college certificate"],
    reply: "A Bonafide Certificate is issued by your school or college registrar certifying that you are a currently enrolled student in a specific course and academic year. Most scholarship portals (including NSP and State portals) require a recent Bonafide certificate stamped and signed by the Head of Institution."
  },
  {
    keywords: ["biometric", "biometric authentication", "nsp biometric", "face auth"],
    reply: "NSP introduced mandatory biometric authentication (Aadhaar Face RD / fingerprint scan) for applicants and Institute Nodal Officers (INOs). Ensure your mobile number is linked to your Aadhaar card so you can complete e-KYC and biometric verification at your college camp or designated CSC centre."
  },
  {
    keywords: ["gap year", "education gap", "gap affidavit", "study gap"],
    reply: "If you have a gap of 1 or more years between your previous degree/class and current course, most government scholarship schemes require a 'Gap Year Affidavit' on stamp paper notarized by a notary public, declaring you were not enrolled elsewhere and did not receive concurrent scholarship funding."
  },
  {
    keywords: ["issuing authority", "who issues income certificate", "tehsildar", "sdm"],
    reply: "For national scholarships (NSP), income and caste certificates must be issued by a competent executive magistrate or revenue authority (such as Tehsildar, Sub-Divisional Magistrate SDM, or Revenue Officer). Certificates issued by private bodies, employers, or local corporators are usually rejected during institute scrutiny."
  },
  {
    keywords: ["disability", "specially abled", "pwd", "differently abled", "saksham"],
    reply: "Students with 40% or more benchmark disability can apply for the AICTE Saksham Scholarship (Rs. 50,000/year) for technical education courses. You will need a Disability Certificate issued by a Government Medical Board, your Aadhaar card, and income certificate. Apply via aicte-india.org before the November deadline."
  },
  {
    keywords: ["minority", "muslim", "christian", "sikh", "jain", "parsi", "buddhist"],
    reply: "Students from minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Zoroastrian/Parsi) can apply for the Post-Matric Scholarship for Minorities through the National Scholarship Portal. Family income must be under Rs. 2 lakh/year. You need a Minority Community certificate from the appropriate religious body or SDM."
  },
  {
    keywords: ["disability certificate", "udid", "unique disability id"],
    reply: "Get your Disability Certificate from the nearest District Hospital's Medical Board or government hospital. For a permanent digital certificate, apply for UDID (Unique Disability ID) at swavlambancard.gov.in — this is now accepted by most scholarship portals and is easier to verify online."
  },
  {
    keywords: ["who are you", "what can you do", "what is saathi"],
    reply: "I'm Saathi, a built-in guide for this scholarship list — ask me about eligibility rules, required documents, deadlines, match strength, or any specific scheme by name and I'll answer from what's on this page."
  }
  ,
  {
    keywords: ["creamy layer","obc ncl","non creamy layer","obc validity"],
    reply: "For OBC category scholarships, you must provide an 'OBC Non-Creamy Layer (NCL)' certificate issued in the current financial year. Central portals like NSP strictly do not accept State-level backward certificates if they are not in Central OBC format or are older than 1 year."
  }
  ,
  {
    keywords: ["pfms","payment pending","pfms status","under processing with agency"],
    reply: "If your NSP status reads 'Payment Pending at PFMS' or 'Under Processing with Agency', your scholarship is sanctioned and at the treasury queue! The Public Financial Management System (PFMS) handles DBT bank transfers. You can track exact transfer UTR at pfms.nic.in using your NSP Application ID or Account Number."
  }
  ,
  {
    keywords: ["single mother","single parent","fatherless","orphan"],
    reply: "Several government and private scholarships offer dedicated income relaxation or reservation for children of single mothers, widows, or orphaned students. For these applications, attach an affidavit or death certificate of the deceased parent to qualify for 100% tuition waivers under priority quota."
  }
  ,
  {
    keywords: ["fee receipt","tuition breakdown","fee waiver","non refundable fee"],
    reply: "When scholarship guidelines ask for a 'Fee Receipt', submit an official breakdown receipt signed by your college finance officer showing separate heads: Tuition Fee, Exam Fee, Library Fee, and Caution Deposit. Schemes usually reimburse non-refundable tuition fees only."
  }
  ,
  {
    keywords: ["hostel certificate","day scholar vs hosteller","hostel allowance"],
    reply: "Hosteller grants (like in Ishan Uday or Vidyasiri) are typically 2x higher than day scholar rates. To claim the hosteller amount, you must upload an official Hostel Certificate from your university or government-recognized hostel warden confirming room occupancy."
  }
  ,
  {
    keywords: ["studying outside state","interstate admission","other state college"],
    reply: "If you are studying in another state (e.g., student from Bihar studying in Karnataka), you can still claim your home state post-matric scholarship! Select 'Institute outside State' during NSP or state portal application and get the form countersigned by your college Nodal Officer."
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

/* =========================================================
   MOBILE HAMBURGER MENU
   ========================================================= */
(function(){
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function(){
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')){
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });

  // Auto-close if screen resized to desktop viewport
  window.addEventListener('resize', function(){
    if (window.innerWidth > 780 && mobileMenu.classList.contains('open')){
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* =========================================================
   MOBILE QUICK-PILL SCROLL SPY
   ========================================================= */
(function(){
  const pills = document.querySelectorAll('.nav-mobile-pills .nav-pill');
  if (!pills.length) return;
  const sections = ['checker', 'how', 'saathi'];
  window.addEventListener('scroll', function(){
    let current = '';
    sections.forEach(function(id){
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) {
        current = id;
      }
    });
    pills.forEach(function(pill){
      const href = pill.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.replace('#', '');
        pill.classList.toggle('nav-pill-active', targetId === current);
      }
    });
  }, { passive: true });
})();
