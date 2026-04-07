import { SlashCommandBuilder } from 'discord.js';
import { createErrorEmbed, createSuccessEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear the entire queue'),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);

    if (player.queue.length === 0) {
      const errorEmbed = createErrorEmbed('Queue is already empty');
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const count = player.queue.length;
    player.clearQueue();

    const successEmbed = createSuccessEmbed(
      'Queue Cleared',
      `Removed ${count} songs from queue`
    );
    await interaction.reply({ embeds: [successEmbed] });
  }
};
