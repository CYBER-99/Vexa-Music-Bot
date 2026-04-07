import dotenv from 'dotenv';
dotenv.config();

// Validate required environment variables
const requiredVars = [
  'DISCORD_TOKEN',
  'CLIENT_ID',
  'GUILD_ID',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET'
];

const missing = requiredVars.filter(v => !process.env[v]);
if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  console.error('Please check your .env file');
  process.exit(1);
}

export default {
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
    apiKey: process.env.YOUTUBE_API_KEY || null
  },
  bot: {
    prefix: process.env.PREFIX || '.',
    defaultVolume: parseInt(process.env.DEFAULT_VOLUME) || 70,
    autoDisconnectTime: parseInt(process.env.AUTO_DISCONNECT_TIME) || 300,
    statusRotationInterval: 30000
  },
  colors: {
    primary: 0x5865F2,
    success: 0x57F287,
    error: 0xED4245,
    warning: 0xFAA61A
  },
  emojis: {
    play: '▶️',
    pause: '⏸️',
    stop: '⏹️',
    skip: '⏭️',
    prev: '⏮️',
    shuffle: '🔀',
    loop: '🔁',
    volumeUp: '🔊',
    volumeDown: '🔉',
    volumeMute: '🔇',
    queue: '📋',
    spotify: '🎵',
    youtube: '📺',
    autoplay: '♻️',
    loading: '⏳'
  }
};
