import {
  createNowPlayingEmbed,
  createErrorEmbed,
  createPlaybackControlsButtons,
  createVolumeControlButtons
} from '../../ui/embeds.js';

export default {
  name: 'nowplaying',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);

    if (!player.currentTrack) {
      const errorEmbed = createErrorEmbed('No song is currently playing');
      return await message.reply({ embeds: [errorEmbed] });
    }

    const embed = createNowPlayingEmbed(player.currentTrack, player, player.currentTrack.requester);
    const buttons = [createPlaybackControlsButtons(), createVolumeControlButtons()];

    await message.reply({ embeds: [embed], components: buttons });
  }
};
