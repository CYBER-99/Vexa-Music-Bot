import dotenv from 'dotenv';

dotenv.config();

const requiredVars = [
  'DISCORD_TOKEN',
  'CLIENT_ID',
  'GUILD_ID',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
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
console.log('All required variables detected');

const config = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
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
