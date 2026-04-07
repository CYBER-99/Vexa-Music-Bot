import { SlashCommandBuilder } from 'discord.js';
import {
  createNowPlayingEmbed,
  createErrorEmbed,
  createSuccessEmbed,
  createPlaybackControlsButtons,
  createVolumeControlButtons
} from '../../ui/embeds.js';
import {
  searchYoutube,
  isYoutubeUrl,
  isSpotifyUrl,
  resolveSpotifyTrack,
  resolveSpotifyPlaylist
} from '../../utils/audioResolver.js';
import SpotifyWebApi from 'spotify-web-api-node';
import config from '../../config/config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube or Spotify')
    .addStringOption(option =>
      option
        .setName('song')
        .setDescription('Song title, URL, or Spotify link')
        .setRequired(true)
    ),
  async execute(interaction, playerManager, client) {
    await interaction.deferReply();
    const player = playerManager.getPlayer(interaction.guildId, client);
    const query = interaction.options.getString('song');

    // Initialize Spotify client if enabled
    let spotifyApi = null;
    if (config.spotify.enabled) {
      spotifyApi = new SpotifyWebApi({
        clientId: config.spotify.clientId,
        clientSecret: config.spotify.clientSecret
      });
    }

    // Join voice channel
    if (!player.voiceConnection) {
      const voice = interaction.member.voice.channel;
      if (!voice) {
        const errorEmbed = createErrorEmbed('You must be in a voice channel to play music');
        return await interaction.editReply({ embeds: [errorEmbed] });
      }

      const joined = await player.joinVoiceChannel(voice);
      if (!joined) {
        const errorEmbed = createErrorEmbed('Failed to join voice channel');
        return await interaction.editReply({ embeds: [errorEmbed] });
      }
    }

    try {
      let track = null;

      // Handle Spotify track
      if (isSpotifyUrl(query) && query.includes('/track/')) {
        if (!config.spotify.enabled) {
          const errorEmbed = createErrorEmbed('Spotify support is currently disabled. Use a YouTube link or search instead.');
          return await interaction.editReply({ embeds: [errorEmbed] });
        }
        try {
          const data = await spotifyApi.clientCredentialsFlow();
          spotifyApi.setAccessToken(data.body.access_token);
          track = await resolveSpotifyTrack(query, spotifyApi);
        } catch (error) {
          console.error('❌ Spotify track resolution failed:', error);
          console.warn('⚠️ Spotify track resolution failed');
        }
      }
      // Handle Spotify playlist
      else if (isSpotifyUrl(query) && query.includes('/playlist/')) {
        if (!config.spotify.enabled) {
          const errorEmbed = createErrorEmbed('Spotify support is currently disabled. Use a YouTube link or search instead.');
          return await interaction.editReply({ embeds: [errorEmbed] });
        }
        try {
          const data = await spotifyApi.clientCredentialsFlow();
          spotifyApi.setAccessToken(data.body.access_token);
          const tracks = await resolveSpotifyPlaylist(query, spotifyApi);
          if (tracks.length === 0) {
            const errorEmbed = createErrorEmbed('No tracks found in playlist');
            return await interaction.editReply({ embeds: [errorEmbed] });
          }

          // Add first track to play
          track = tracks[0];
          // Add rest to queue
          for (let i = 1; i < tracks.length; i++) {
            tracks[i].requester = interaction.user;
            player.addToQueue(tracks[i]);
          }

          const successEmbed = createSuccessEmbed(
            'Playlist loaded',
            `Added ${tracks.length} songs to queue`
          );
          await interaction.editReply({ embeds: [successEmbed] });
        } catch (error) {
          console.error('❌ Spotify playlist resolution failed:', error);
          console.warn('⚠️ Spotify playlist resolution failed');
        }
      }
      // Handle YouTube URL
      else if (isYoutubeUrl(query)) {
        track = {
          title: 'Loading...',
          artist: 'YouTube',
          url: query,
          requester: interaction.user
        };
      }
      // Search for song
      else {
        const results = await searchYoutube(query);
        if (results.length === 0) {
          const errorEmbed = createErrorEmbed(`No results found for "${query}"`);
          return await interaction.editReply({ embeds: [errorEmbed] });
        }
        track = results[0];
      }

      if (!track) {
        const errorEmbed = createErrorEmbed('Failed to resolve track');
        return await interaction.editReply({ embeds: [errorEmbed] });
      }

      track.requester = interaction.user;

      // Play immediately if nothing is playing
      if (!player.isPlaying && !player.currentTrack) {
        await player.playTrack(track);
      } else {
        player.addToQueue(track);
      }

      const embed = createNowPlayingEmbed(track, player, interaction.user);
      const buttons = [createPlaybackControlsButtons(), createVolumeControlButtons()];

      await interaction.editReply({
        embeds: [embed],
        components: buttons
      });
    } catch (error) {
      console.error('❌ Play command error:', error);
      const errorEmbed = createErrorEmbed(error.message || 'Failed to play song');
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  }
};
