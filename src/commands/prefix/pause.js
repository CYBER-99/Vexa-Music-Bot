import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  name: 'pause',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);

    if (!player.isPlaying) {
      const errorEmbed = createErrorEmbed('No song is currently playing');
      return await message.reply({ embeds: [errorEmbed] });
    }

    player.audioPlayer.pause();
    const successEmbed = createSuccessEmbed('Paused', `⏸️ Paused "${player.currentTrack.title}"`);
    await message.reply({ embeds: [successEmbed] });
  }
};
