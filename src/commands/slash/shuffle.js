import { SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle the current queue'),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);

    if (player.queue.length === 0) {
      const errorEmbed = createErrorEmbed('Queue is empty');
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    player.shuffleQueue();
    const successEmbed = createSuccessEmbed('Shuffled', `🔀 Shuffled ${player.queue.length} songs`);
    await interaction.reply({ embeds: [successEmbed] });
  }
};
