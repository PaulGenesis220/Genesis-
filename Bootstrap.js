// bootstrap.js
const fs = require('fs');

try {
  const seed = JSON.parse(fs.readFileSync('genesis.seed.json', 'utf8'));
  console.log('🌱 Genesis seed located.');
  console.log(`🔹 Version: ${seed.identity.version}`);
  console.log(`🔹 Mode: ${seed.core_directives.mode}`);
  console.log(`🔹 Modules: ${Object.keys(seed.modules || {}).join(', ') || 'none loaded'}`);
  console.log('✅ Passive mode confirmed. No activation performed.');
} catch (e) {
  console.log('⚠️ Seed file missing or unreadable.');
}
