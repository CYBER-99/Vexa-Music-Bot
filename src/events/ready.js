import { ActivityType } from 'discord.js';
import config from '../config/config.js';

const statuses = [
  { name: 'Created by Cyber', type: ActivityType.Playing },
  { name: 'Streaming music', type: ActivityType.Streaming },
  { name: 'Managing playlists', type: ActivityType.Listening },
  { name: '/play to start', type: ActivityType.Watching },
  { name: 'Music never stops', type: ActivityType.Playing }
];

let statusIndex = 0;

export default {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`\n✅ Bot logged in as ${client.user.tag}`);
    console.log(`🎵 Music Bot is ready!\n`);

    // Set initial status
    updateStatus(client);

    // Rotate status every 30 seconds
    setInterval(() => updateStatus(client), config.bot.statusRotationInterval);
  }
};

function updateStatus(client) {
  const status = statuses[statusIndex % statuses.length];
  client.user.setActivity(status.name, {
    type: status.type,
    status: 'dnd' // Do Not Disturb
  });
  statusIndex++;
}
