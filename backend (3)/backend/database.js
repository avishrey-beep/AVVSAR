const Database = require("better-sqlite3");

const db = new Database("avsar.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS scholarships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    provider TEXT,
    country TEXT,
    university TEXT,

    amount TEXT,
    currency TEXT,
    deadline TEXT,

    level TEXT,
    category TEXT,
    type TEXT,

    eligibilityText TEXT,

    minScore REAL,
    maxIncome REAL,
    gender TEXT,
    state TEXT,
    nationality TEXT,

    documents TEXT,
    applicationProcess TEXT,
    steps TEXT,

    officialLink TEXT,

    sourceFile TEXT,
    sourceRow INTEGER,

    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("Avsar database connected!");

module.exports = db;