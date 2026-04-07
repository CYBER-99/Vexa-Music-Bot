import { createErrorEmbed, createSuccessEmbed } from '../../ui/embeds.js';

export default {
  name: 'remove',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);
    const position = parseInt(args[0]) - 1;

    if (isNaN(position)) {
      const errorEmbed = createErrorEmbed('Please provide a valid position');
      return await message.reply({ embeds: [errorEmbed] });
    }

    if (position < 0 || position >= player.queue.length) {
      const errorEmbed = createErrorEmbed('Invalid position');
      return await message.reply({ embeds: [errorEmbed] });
    }

    const removed = player.queue.splice(position, 1)[0];
    const successEmbed = createSuccessEmbed(
      'Removed',
      `Removed "${removed.title}" from queue`
    );
    await message.reply({ embeds: [successEmbed] });
  }
};
