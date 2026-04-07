import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  name: 'skip',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);

    if (!player.currentTrack) {
      const errorEmbed = createErrorEmbed('No song is currently playing');
      return await message.reply({ embeds: [errorEmbed] });
    }

    if (player.queue.length === 0) {
      const errorEmbed = createErrorEmbed('No songs in queue to skip to');
      player.audioPlayer.stop();
      return await message.reply({ embeds: [errorEmbed] });
    }

    const skipped = player.currentTrack;
    const nextTrack = player.queue.shift();
    await player.playTrack(nextTrack, false);

    const successEmbed = createSuccessEmbed(
      'Skipped',
      `⏭️ Skipped "${skipped.title}"\nNow playing: "${nextTrack.title}"`
    );
    await message.reply({ embeds: [successEmbed] });
  }
};
