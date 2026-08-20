const XLSX = require("xlsx");
const db = require("./database");
const fs = require("fs");

const files = [
  "Untitled spreadsheet.xlsx",
  "SCHOLARSHIP MASTER LIST - INTERNATIONAL STUDENTS (2026–27 Cycle) by Divaa Uthkarsha (1).xlsx"
];

// Remove old demo data
db.prepare(`
  DELETE FROM scholarships
  WHERE provider = 'Avsar Demo'
`).run();

const insert = db.prepare(`
  INSERT INTO scholarships (
    name,
    provider,
    country,
    university,
    amount,
    currency,
    deadline,
    level,
    category,
    type,
    eligibilityText,
    officialLink,
    applicationProcess,
    sourceFile,
    sourceRow
  )
  VALUES (
    @name,
    @provider,
    @country,
    @university,
    @amount,
    @currency,
    @deadline,
    @level,
    @category,
    @type,
    @eligibilityText,
    @officialLink,
    @applicationProcess,
    @sourceFile,
    @sourceRow
  )
`);

let imported = 0;
let skipped = 0;

function clean(value) {
  return String(value ?? "")
    .replace(/\uFEFF/g, "")
    .replace(/[⁠�]/g, "")
    .trim();
}

function detectCountry(text) {
  const value = text.toLowerCase();

  if (value.includes("india")) return "India";
  if (value.includes("usa") || value.includes("united states")) {
    return "United States";
  }
  if (value.includes("canada")) return "Canada";
  if (value.includes("ireland")) return "Ireland";
  if (value.includes("uk") || value.includes("united kingdom")) {
    return "United Kingdom";
  }
  if (value.includes("australia")) return "Australia";

  return "";
}

function detectType(category) {
  const value = category.toLowerCase();

  if (value.includes("merit")) return "merit";
  if (value.includes("need")) return "need-based";

  return "other";
}

for (const file of files) {

  if (!fs.existsSync(file)) {
    console.log(`⚠️ File not found: ${file}`);
    continue;
  }

  console.log(`\n📄 Reading: ${file}`);

  const workbook = XLSX.readFile(file);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: ""
  });

  /*
   * INDIA / GENERAL SHEET
   * Columns:
   * scholarship name
   * country
   * level
   * eligibility
   * deadline
   * amount
   * link
   * category
   */

  if (file === "Untitled spreadsheet.xlsx") {

    for (let i = 1; i < rows.length; i++) {

      const row = rows[i];

      const name = clean(row[0]);

      if (!name) {
        skipped++;
        continue;
      }

      // Skip obvious section/header rows
      if (
        name.toLowerCase().includes("scholarship names") ||
        name.toLowerCase().includes("section") ||
        name.length < 3
      ) {
        skipped++;
        continue;
      }

      const country = clean(row[1]);
      const level = clean(row[2]);
      const eligibility = clean(row[3]);
      const deadline = clean(row[4]);
      const amount = clean(row[5]);
      const link = clean(row[6]);
      const category = clean(row[7]);

      insert.run({
        name,
        provider: "",
        country,
        university: "",
        amount,
        currency: country.toLowerCase() === "india" ? "INR" : "",
        deadline,
        level,
        category,
        type: detectType(category),
        eligibilityText: eligibility,
        officialLink: link,
        applicationProcess: "",
        sourceFile: file,
        sourceRow: i + 1
      });

      imported++;
    }
  }

  /*
   * INTERNATIONAL SHEET
   */

  if (file.includes("INTERNATIONAL STUDENTS")) {

    for (let i = 0; i < rows.length; i++) {

      const row = rows[i];

      // Actual scholarship table rows have a number in column A.
      if (typeof row[0] !== "number") {
        continue;
      }

      const name = clean(row[1]);

      if (!name) {
        skipped++;
        continue;
      }

      const amount = clean(row[2]);
      const university = clean(row[3]);
      const eligibility = clean(row[4]);
      const link = clean(row[5]);
      const applicationProcess = clean(row[6]);
      const deadline = clean(row[7]);

      const combinedText =
        `${university} ${eligibility} ${applicationProcess}`;

      const country = detectCountry(combinedText);

      insert.run({
        name,
        provider: university,
        country,
        university,
        amount,
        currency: "",
        deadline,
        level: "undergraduate",
        category: "international",
        type: "merit",
        eligibilityText: eligibility,
        officialLink: link,
        applicationProcess,
        sourceFile: file,
        sourceRow: i + 1
      });

      imported++;
    }
  }
}

console.log("\n================================");
console.log("🎉 IMPORT COMPLETE");
console.log("================================");
console.log(`Imported: ${imported}`);
console.log(`Skipped: ${skipped}`);

const total = db
  .prepare("SELECT COUNT(*) AS count FROM scholarships")
  .get();

console.log(`Total scholarships in database: ${total.count}`);