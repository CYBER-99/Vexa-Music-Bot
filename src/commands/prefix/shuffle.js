import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  name: 'shuffle',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);

    if (player.queue.length === 0) {
      const errorEmbed = createErrorEmbed('Queue is empty');
      return await message.reply({ embeds: [errorEmbed] });
    }

    player.shuffleQueue();
    const successEmbed = createSuccessEmbed('Shuffled', `🔀 Shuffled ${player.queue.length} songs`);
    await message.reply({ embeds: [successEmbed] });
  }
};
