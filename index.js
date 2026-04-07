import { Client, GatewayIntentBits, Collection } from 'discord.js';
import SpotifyWebApi from 'spotify-web-api-node';
import config from './src/config/config.js';
import { validateAPIs } from './src/utils/apiValidator.js';
import { loadSlashCommands, loadPrefixCommands, loadEvents, registerSlashCommands } from './src/handlers/commandLoader.js';
import { PlayerManager } from './src/music/player.js';

// Global player manager
export const playerManager = new PlayerManager();

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Initialize Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret
});

// Initialize command collections
client.slashCommands = new Collection();
client.prefixCommands = new Collection();

// Startup sequence
async function startup() {
  console.log('\n');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   🎵 VEXA MUSIC BOT - STARTING UP    ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');

  // Validate environment
  console.log('📋 Environment Validation:');
  console.log(`   ✅ DISCORD_TOKEN loaded`);
  console.log(`   ✅ CLIENT_ID: ${config.discord.clientId}`);
  console.log(`   ✅ Prefix: "${config.bot.prefix}"`);
  console.log(`   ✅ Default Volume: ${config.bot.defaultVolume}%`);
  console.log(`   ✅ Auto-disconnect: ${config.bot.autoDisconnectTime}s`);

  // Validate APIs
  console.log('\n🔗 API Validation:');
  await validateAPIs(config.youtube.apiKey, spotifyApi);

  // Load commands
  console.log('\n📦 Loading Commands:');
  const slashCommands = await loadSlashCommands(client);
  const prefixCommands = await loadPrefixCommands(client);

  client.slashCommands = slashCommands;
  client.prefixCommands = prefixCommands;

  console.log(`   ✅ Loaded ${slashCommands.size} slash commands`);
  console.log(`   ✅ Loaded ${prefixCommands.size} prefix commands`);

  // Load events
  console.log('\n🎯 Loading Event Handlers:');
  await loadEvents(client);
  console.log('   ✅ Event handlers loaded');

  // Register slash commands with Discord
  console.log('\n🔐 Registering with Discord:');
  client.once('ready', async () => {
    await registerSlashCommands(client, slashCommands.values());
  });

  // Login to Discord
  console.log('\n🔑 Connecting to Discord...');
  await client.login(config.discord.token);
}

// Handle unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Start the bot
startup().catch(error => {
  console.error('❌ Fatal Startup Error:', error);
  process.exit(1);
});
