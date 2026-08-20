const db = require("./database");

const newColumns = [
  ["country", "TEXT"],
  ["university", "TEXT"],
  ["currency", "TEXT"],
  ["eligibilityText", "TEXT"],
  ["nationality", "TEXT"],
  ["applicationProcess", "TEXT"],
  ["sourceFile", "TEXT"],
  ["sourceRow", "INTEGER"],
  ["createdAt", "TEXT"]
];

for (const [column, type] of newColumns) {
  try {
    db.exec(`ALTER TABLE scholarships ADD COLUMN ${column} ${type}`);
    console.log(`✅ Added column: ${column}`);
  } catch (error) {
    if (error.message.includes("duplicate column name")) {
      console.log(`ℹ️ Already exists: ${column}`);
    } else {
      throw error;
    }
  }
}

console.log("\n🎉 Database upgrade complete!");