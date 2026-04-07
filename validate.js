#!/usr/bin/env node

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function check(name, condition, errorMsg = '') {
  if (condition) {
    checks.passed.push(name);
    console.log(`✅ ${name}`);
  } else {
    checks.failed.push({ name, error: errorMsg });
    console.log(`❌ ${name}${errorMsg ? ': ' + errorMsg : ''}`);
  }
}

function warn(name, message) {
  checks.warnings.push({ name, message });
  console.log(`⚠️  ${name}: ${message}`);
}

console.log('\n╔════════════════════════════════════════╗');
console.log('║   🔍 VEXA BOT - SETUP VALIDATION    ║');
console.log('╚════════════════════════════════════════╝\n');

// Check environment variables
console.log('📋 Environment Variables:\n');
check('DISCORD_TOKEN', process.env.DISCORD_TOKEN, 'Missing - check .env file');
check('CLIENT_ID', process.env.CLIENT_ID, 'Missing - check .env file');
check('GUILD_ID', process.env.GUILD_ID, 'Missing - check .env file');
check('SPOTIFY_CLIENT_ID', process.env.SPOTIFY_CLIENT_ID, 'Missing - check .env file');
check('SPOTIFY_CLIENT_SECRET', process.env.SPOTIFY_CLIENT_SECRET, 'Missing - check .env file');

if (process.env.YOUTUBE_API_KEY) {
  check('YOUTUBE_API_KEY', true);
} else {
  warn('YOUTUBE_API_KEY', 'Using yt-dlp fallback (optional)');
}

// Check files
console.log('\n📁 Project Files:\n');
check('package.json', fs.existsSync(path.join(__dirname, 'package.json')));
check('.env', fs.existsSync(path.join(__dirname, '.env')));
check('index.js', fs.existsSync(path.join(__dirname, 'index.js')));
check('src/ directory', fs.existsSync(path.join(__dirname, 'src')));

const dirs = ['commands/slash', 'commands/prefix', 'events', 'music', 'utils', 'ui', 'config'];
for (const dir of dirs) {
  const fullPath = path.join(__dirname, 'src', dir);
  check(`src/${dir}/`, fs.existsSync(fullPath));
}

// Check commands
console.log('\n🎯 Commands:\n');
const slashCmdsPath = path.join(__dirname, 'src', 'commands', 'slash');
const prefixCmdsPath = path.join(__dirname, 'src', 'commands', 'prefix');

if (fs.existsSync(slashCmdsPath)) {
  const slashFiles = fs.readdirSync(slashCmdsPath).filter(f => f.endsWith('.js'));
  check(`Slash commands (${slashFiles.length})`, slashFiles.length > 0);
}

if (fs.existsSync(prefixCmdsPath)) {
  const prefixFiles = fs.readdirSync(prefixCmdsPath).filter(f => f.endsWith('.js'));
  check(`Prefix commands (${prefixFiles.length})`, prefixFiles.length > 0);
}

// Check Node.js version
console.log('\n💻 System Requirements:\n');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].slice(1));
check(`Node.js >= 20 (${nodeVersion})`, majorVersion >= 20, `Upgrade Node.js to v20+`);

// Summary
console.log('\n╔════════════════════════════════════════╗');
console.log('║   📊 VALIDATION SUMMARY              ║');
console.log('╚════════════════════════════════════════╝\n');

console.log(`✅ Passed: ${checks.passed.length}`);
console.log(`❌ Failed: ${checks.failed.length}`);
console.log(`⚠️  Warnings: ${checks.warnings.length}`);

if (checks.failed.length > 0) {
  console.log('\n🔴 FAILED CHECKS:\n');
  checks.failed.forEach(check => {
    console.log(`  • ${check.name}`);
    if (check.error) console.log(`    ${check.error}`);
  });
}

if (checks.warnings.length > 0) {
  console.log('\n🟡 WARNINGS:\n');
  checks.warnings.forEach(warn => {
    console.log(`  • ${warn.name}: ${warn.message}`);
  });
}

// Final status
console.log('\n');
if (checks.failed.length === 0) {
  console.log('✅ Bot is ready to start! Run: npm start');
  process.exit(0);
} else {
  console.log('❌ Fix the failed checks above before starting the bot');
  process.exit(1);
}
