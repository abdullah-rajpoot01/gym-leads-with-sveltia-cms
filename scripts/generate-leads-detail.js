const fs = require("fs");
const path = require("path");

const LEADS_DIR = path.join(process.cwd(), "content", "gym-leads");
const OUTPUT_FILE = path.join(LEADS_DIR, "detail.json");

function getLeadFiles() {
  return fs
    .readdirSync(LEADS_DIR)
    .filter((file) => file.endsWith(".json") && file !== "detail.json");
}

function generate() {
  if (!fs.existsSync(LEADS_DIR)) {
    console.log("❌ leads folder not found");
    return;
  }

  const files = getLeadFiles();

  const data = {
    total: files.length,
    files, // only names as requested
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));

  console.log(`✅ Generated detail.json with ${files.length} files`);
}

generate();