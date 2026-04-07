import { SlashCommandBuilder } from 'discord.js';
import {
  createNowPlayingEmbed,
  createErrorEmbed,
  createPlaybackControlsButtons,
  createVolumeControlButtons
} from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Show the currently playing song'),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);

    if (!player.currentTrack) {
      const errorEmbed = createErrorEmbed('No song is currently playing');
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const embed = createNowPlayingEmbed(player.currentTrack, player, player.currentTrack.requester);
    const buttons = [createPlaybackControlsButtons(), createVolumeControlButtons()];

    await interaction.reply({ embeds: [embed], components: buttons });
  }
};
