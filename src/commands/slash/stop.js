import { SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop playback and clear the queue'),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);

    if (!player.currentTrack) {
      const errorEmbed = createErrorEmbed('No song is currently playing');
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    player.audioPlayer.stop();
    player.clearQueue();
    player.currentTrack = null;

    const successEmbed = createSuccessEmbed('Stopped', '⏹️ Playback stopped and queue cleared');
    await interaction.reply({ embeds: [successEmbed] });
  }
};
