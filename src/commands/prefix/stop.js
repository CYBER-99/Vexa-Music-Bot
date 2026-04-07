import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  name: 'stop',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);

    if (!player.currentTrack) {
      const errorEmbed = createErrorEmbed('No song is currently playing');
      return await message.reply({ embeds: [errorEmbed] });
    }

    player.audioPlayer.stop();
    player.clearQueue();
    player.currentTrack = null;

    const successEmbed = createSuccessEmbed('Stopped', '⏹️ Playback stopped and queue cleared');
    await message.reply({ embeds: [successEmbed] });
  }
};
