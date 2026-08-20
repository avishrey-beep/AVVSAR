// migrate.js
const db = require("./database.js");

const newColumns = [
  ["country", "TEXT"],
  ["sourceRegion", "TEXT"],       // 'india' | 'international'
  ["currency", "TEXT"],
  ["amountMin", "REAL"],
  ["amountMax", "REAL"],
  ["fundingType", "TEXT"],         // full_ride | partial | tuition_only | stipend
  ["tuitionCoverage", "INTEGER"],  // 0/1
  ["livingExpenses", "INTEGER"],
  ["accommodation", "INTEGER"],
  ["travelAllowance", "INTEGER"],
  ["deadlineMonthStart", "INTEGER"], // 1-12, best-effort parsed
  ["deadlineMonthEnd", "INTEGER"],
  ["deadlineDate", "TEXT"],          // exact ISO date, when known
  ["deadlineConfirmed", "INTEGER"],  // 0/1
  ["fieldSubject", "TEXT"],
  ["nationalityEligibility", "TEXT"],
  ["minIncome", "REAL"],
  ["otherEligibility", "TEXT"],
  ["sourceKey", "TEXT"],             // dedup key: normalized name+provider
  ["createdAt", "TEXT"],
  ["updatedAt", "TEXT"],
];

const existing = db.prepare("PRAGMA table_info(scholarships)").all().map(c => c.name);

for (const [col, type] of newColumns) {
  if (!existing.includes(col)) {
    db.exec(`ALTER TABLE scholarships ADD COLUMN ${col} ${type}`);
    console.log(`Added column: ${col}`);
  }
}

db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_source_key ON scholarships(sourceKey)`);

console.log("Migration complete.");