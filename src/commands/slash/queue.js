import { SlashCommandBuilder } from 'discord.js';
import { createQueueEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('View the current queue')
    .addIntegerOption(option =>
      option
        .setName('page')
        .setDescription('Page number')
        .setRequired(false)
    ),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);
    const page = interaction.options.getInteger('page') || 1;

    if (player.queue.length === 0) {
      const errorEmbed = createErrorEmbed('Queue is empty');
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const embed = createQueueEmbed(player.queue, page);
    await interaction.reply({ embeds: [embed] });
  }
};
