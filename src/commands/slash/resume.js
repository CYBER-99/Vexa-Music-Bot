import { SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the paused song'),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);

    if (!player.currentTrack) {
      const errorEmbed = createErrorEmbed('No song to resume');
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    player.audioPlayer.unpause();
    const successEmbed = createSuccessEmbed('Resumed', `▶️ Resumed "${player.currentTrack.title}"`);
    await interaction.reply({ embeds: [successEmbed] });
  }
};
