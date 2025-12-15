// Simple test to verify the setup locally
import fs from 'fs';
import path from 'path';

console.log('Testing SkillBridge Backend Setup Locally...\n');

// Check if required files exist
const requiredFiles = [
  'vercel.json',
  'index.html',
  'api/handler.js',
  'api/health.js',
  'backend/server/app.js'
];

console.log('Checking required files...');
let allFilesExist = true;
for (const file of requiredFiles) {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} missing`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing.');
  process.exit(1);
}

console.log('\n✓ All required files are present\n');

// Check if vercel.json is valid JSON
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  console.log('✓ vercel.json is valid JSON');
  
  // Check builds and routes
  if (vercelConfig.builds && Array.isArray(vercelConfig.builds)) {
    console.log(`✓ Found ${vercelConfig.builds.length} build configurations`);
  } else {
    console.log('✗ Invalid builds configuration in vercel.json');
  }
  
  if (vercelConfig.routes && Array.isArray(vercelConfig.routes)) {
    console.log(`✓ Found ${vercelConfig.routes.length} route configurations`);
  } else {
    console.log('✗ Invalid routes configuration in vercel.json');
  }
} catch (error) {
  console.log('✗ vercel.json is not valid JSON:', error.message);
}

console.log('\n✅ Local setup verification complete!');
console.log('\nTo deploy:');
console.log('1. Commit and push your changes:');
console.log('   git add .');
console.log('   git commit -m "Fix backend deployment configuration"');
console.log('   git push');
console.log('2. Check Vercel dashboard for deployment status');