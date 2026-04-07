import { SlashCommandBuilder, ChannelType } from 'discord.js';
import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the current song'),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);

    if (!player.isPlaying) {
      const errorEmbed = createErrorEmbed('No song is currently playing');
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    player.audioPlayer.pause();
    const successEmbed = createSuccessEmbed('Paused', `⏸️ Paused "${player.currentTrack.title}"`);
    await interaction.reply({ embeds: [successEmbed] });
  }
};
