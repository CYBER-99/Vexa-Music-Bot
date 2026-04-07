import { SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip to the next song in queue'),
  async execute(interaction, playerManager, client) {
    await interaction.deferReply();
    const player = playerManager.getPlayer(interaction.guildId, client);

    if (!player.currentTrack) {
      const errorEmbed = createErrorEmbed('No song is currently playing');
      return await interaction.editReply({ embeds: [errorEmbed] });
    }

    if (player.queue.length === 0) {
      const errorEmbed = createErrorEmbed('No songs in queue to skip to');
      player.audioPlayer.stop();
      return await interaction.editReply({ embeds: [errorEmbed] });
    }

    const skipped = player.currentTrack;
    const nextTrack = player.queue.shift();
    await player.playTrack(nextTrack, false);

    const successEmbed = createSuccessEmbed(
      'Skipped',
      `⏭️ Skipped "${skipped.title}"\nNow playing: "${nextTrack.title}"`
    );
    await interaction.editReply({ embeds: [successEmbed] });
  }
};
