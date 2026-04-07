import { Client, GatewayIntentBits, Collection } from 'discord.js';
import SpotifyWebApi from 'spotify-web-api-node';
import config from './config/config.js';
import { validateAPIs } from './utils/apiValidator.js';
import { loadSlashCommands, loadPrefixCommands, loadEvents, registerSlashCommands } from './handlers/commandLoader.js';
import playerManager from './music/playerManager.js';

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

// Initialize Spotify API if enabled
let spotifyApi = null;
if (config.spotify.enabled) {
  spotifyApi = new SpotifyWebApi({
    clientId: config.spotify.clientId,
    clientSecret: config.spotify.clientSecret
  });
}

// Initialize command collections
client.slashCommands = new Collection();
client.prefixCommands = new Collection();

async function startup() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   🎵 VEXA MUSIC BOT - STARTING UP    ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');

  console.log('Connecting to Discord');
  console.log('🔗 API Validation:');
  await validateAPIs(config.youtube.apiKey, spotifyApi);

  console.log('Audio system ready');
  console.log('Bot starting');

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

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

startup().catch((error) => {
  console.error('❌ Fatal Startup Error:', error);
  process.exit(1);
});
