import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  name: 'resume',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);

    if (!player.currentTrack) {
      const errorEmbed = createErrorEmbed('No song to resume');
      return await message.reply({ embeds: [errorEmbed] });
    }

    player.audioPlayer.unpause();
    const successEmbed = createSuccessEmbed('Resumed', `▶️ Resumed "${player.currentTrack.title}"`);
    await message.reply({ embeds: [successEmbed] });
  }
};
