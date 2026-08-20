const XLSX = require("xlsx");

const file = "SCHOLARSHIP MASTER LIST - INTERNATIONAL STUDENTS (2026–27 Cycle) by Divaa Uthkarsha (1).xlsx";

const workbook = XLSX.readFile(file);
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: ""
});

rows.forEach((row, index) => {
    const hasData = row.some(cell => String(cell).trim() !== "");

    if (hasData) {
        console.log(`\nROW ${index + 1}:`);
        console.log(row);
    }
});