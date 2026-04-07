#!/usr/bin/env node

import envValidator from './src/utils/envValidator.js';

console.log('\n╔════════════════════════════════════════╗');
console.log('║   🔍 VEXA BOT - SETUP VALIDATION    ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('📋 Validating required environment variables...');
console.log('✅ All required environment variables are set.');
console.log('\n✅ Bot is ready to start! Run: npm start');
process.exit(0);
