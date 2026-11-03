const fs = require("fs");
const bcrypt = require("bcryptjs");

async function fixAdmin() {
  const file = ".env";
  const password = "AagaAdmin@2026";
  const email = "admin@aagawellness.com";

  let lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

  // Remove all duplicate admin credential entries
  lines = lines.filter(line =>
    !/^ADMIN_EMAIL\s*=/.test(line) &&
    !/^ADMIN_PASSWORD_HASH\s*=/.test(line)
  );

  const hash = await bcrypt.hash(password, 12);

  // Escape dollar signs for dotenv-expand
  const safeHash = hash.replace(/\$/g, "\\$");

  lines.push(`ADMIN_EMAIL=${email}`);
  lines.push(`ADMIN_PASSWORD_HASH=${safeHash}`);

  fs.writeFileSync(file, lines.join("\n").trim() + "\n");

  console.log("New hash generated:", hash.length === 60);
  console.log("Fresh password check:", await bcrypt.compare(password, hash));
}

fixAdmin().catch(console.error);