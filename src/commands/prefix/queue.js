import { createQueueEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  name: 'queue',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);
    const page = parseInt(args[0]) || 1;

    if (player.queue.length === 0) {
      const errorEmbed = createErrorEmbed('Queue is empty');
      return await message.reply({ embeds: [errorEmbed] });
    }

    const embed = createQueueEmbed(player.queue, page);
    await message.reply({ embeds: [embed] });
  }
};
