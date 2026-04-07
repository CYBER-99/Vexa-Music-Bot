import { createErrorEmbed, createSuccessEmbed } from '../../ui/embeds.js';

export default {
  name: 'clear',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);

    if (player.queue.length === 0) {
      const errorEmbed = createErrorEmbed('Queue is already empty');
      return await message.reply({ embeds: [errorEmbed] });
    }

    const count = player.queue.length;
    player.clearQueue();

    const successEmbed = createSuccessEmbed(
      'Queue Cleared',
      `Removed ${count} songs from queue`
    );
    await message.reply({ embeds: [successEmbed] });
  }
};
