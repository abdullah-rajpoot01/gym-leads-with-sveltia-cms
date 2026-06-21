const fs = require("fs");
const path = require("path");

const LEADS_DIR = path.join(process.cwd(), "content", "leads");
const OUTPUT_FILE = path.join(LEADS_DIR, "all.json");

function getLeadFiles() {
  return fs
    .readdirSync(LEADS_DIR)
    .filter((file) => file.endsWith(".json") && file !== "all.json");
}

function generate() {
  if (!fs.existsSync(LEADS_DIR)) {
    console.log("❌ leads folder not found");
    return;
  }

  const files = getLeadFiles();

  const leads = files.map((file) => {
    const filePath = path.join(LEADS_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");

    try {
      return JSON.parse(raw);
    } catch (err) {
      console.log(`❌ Invalid JSON in file: ${file}`);
      return null;
    }
  }).filter(Boolean);

  const data = {
    total: leads.length,
    leads,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));

  console.log(`✅ Generated leads.json with ${leads.length} leads`);
}

generate();