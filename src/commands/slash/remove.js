import { SlashCommandBuilder } from 'discord.js';
import { createErrorEmbed, createSuccessEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a song from the queue')
    .addIntegerOption(option =>
      option
        .setName('position')
        .setDescription('Position in queue (1-based)')
        .setRequired(true)
        .setMinValue(1)
    ),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);
    const position = interaction.options.getInteger('position') - 1;

    if (position < 0 || position >= player.queue.length) {
      const errorEmbed = createErrorEmbed('Invalid position');
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const removed = player.queue.splice(position, 1)[0];
    const successEmbed = createSuccessEmbed(
      'Removed',
      `Removed "${removed.title}" from queue`
    );
    await interaction.reply({ embeds: [successEmbed] });
  }
};
