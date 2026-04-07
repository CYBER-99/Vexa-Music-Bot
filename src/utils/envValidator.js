import dotenv from 'dotenv';

dotenv.config();

const requiredVars = [
  'DISCORD_TOKEN',
  'CLIENT_ID',
  'GUILD_ID',
  'YOUTUBE_API_KEY'
];

const missingVars = requiredVars.filter((key) => !process.env[key] || process.env[key].trim() === '');

if (missingVars.length > 0) {
  console.error('Missing required environment variables:');
  missingVars.forEach((key) => console.error(key));
  console.error('\nApplication exiting.');
  process.exit(1);
}

console.log('Environment loaded');
console.log('Discord token detected');
console.log('YouTube API ready');

// Check for optional Spotify
const spotifyEnabled = process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET;
if (spotifyEnabled) {
  console.log('Spotify enabled');
} else {
  console.log('Spotify disabled');
}

const config = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID
  },
  spotify: {
    enabled: spotifyEnabled,
    clientId: process.env.SPOTIFY_CLIENT_ID || null,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || null
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY
  },
  bot: {
    prefix: process.env.PREFIX || '.',
    defaultVolume: parseInt(process.env.DEFAULT_VOLUME, 10) || 70,
    autoDisconnectTime: parseInt(process.env.AUTO_DISCONNECT_TIME, 10) || 300,
    statusRotationInterval: 30000
  }
};

export default config;
