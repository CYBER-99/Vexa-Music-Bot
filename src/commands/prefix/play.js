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
  name: 'play',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);
    const query = args.join(' ');

    if (!query) {
      const errorEmbed = createErrorEmbed('Please provide a song name or URL');
      return await message.reply({ embeds: [errorEmbed] });
    }

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
      const voice = message.member.voice.channel;
      if (!voice) {
        const errorEmbed = createErrorEmbed('You must be in a voice channel to play music');
        return await message.reply({ embeds: [errorEmbed] });
      }

      const joined = await player.joinVoiceChannel(voice);
      if (!joined) {
        const errorEmbed = createErrorEmbed('Failed to join voice channel');
        return await message.reply({ embeds: [errorEmbed] });
      }
    }

    try {
      const loadingEmbed = createSuccessEmbed('Loading', `Searching for "${query}"...`);
      const reply = await message.reply({ embeds: [loadingEmbed] });

      let track = null;

      // Handle Spotify track
      if (isSpotifyUrl(query) && query.includes('/track/')) {
        if (!config.spotify.enabled) {
          const errorEmbed = createErrorEmbed('Spotify support is currently disabled. Use a YouTube link or search instead.');
          return await reply.edit({ embeds: [errorEmbed] });
        }
        await spotifyApi.clientCredentialsFlow().then(data => {
          spotifyApi.setAccessToken(data.body.access_token);
        });
        track = await resolveSpotifyTrack(query, spotifyApi);
      }
      // Handle Spotify playlist
      else if (isSpotifyUrl(query) && query.includes('/playlist/')) {
        if (!config.spotify.enabled) {
          const errorEmbed = createErrorEmbed('Spotify support is currently disabled. Use a YouTube link or search instead.');
          return await reply.edit({ embeds: [errorEmbed] });
        }
        await spotifyApi.clientCredentialsFlow().then(data => {
          spotifyApi.setAccessToken(data.body.access_token);
        });
        const tracks = await resolveSpotifyPlaylist(query, spotifyApi);
        if (tracks.length === 0) {
          const errorEmbed = createErrorEmbed('No tracks found in playlist');
          return await reply.edit({ embeds: [errorEmbed] });
        }

        track = tracks[0];
        for (let i = 1; i < tracks.length; i++) {
          tracks[i].requester = message.author;
          player.addToQueue(tracks[i]);
        }

        const successEmbed = createSuccessEmbed(
          'Playlist loaded',
          `Added ${tracks.length} songs to queue`
        );
        await reply.edit({ embeds: [successEmbed] });
      }
      // Handle YouTube URL
      else if (isYoutubeUrl(query)) {
        track = {
          title: 'Loading...',
          artist: 'YouTube',
          url: query,
          requester: message.author
        };
      }
      // Search for song
      else {
        const results = await searchYoutube(query);
        if (results.length === 0) {
          const errorEmbed = createErrorEmbed(`No results found for "${query}"`);
          return await reply.edit({ embeds: [errorEmbed] });
        }
        track = results[0];
      }

      if (!track) {
        const errorEmbed = createErrorEmbed('Failed to resolve track');
        return await reply.edit({ embeds: [errorEmbed] });
      }

      track.requester = message.author;

      // Play immediately if nothing is playing
      if (!player.isPlaying && !player.currentTrack) {
        await player.playTrack(track);
      } else {
        player.addToQueue(track);
      }

      const embed = createNowPlayingEmbed(track, player, message.author);
      const buttons = [createPlaybackControlsButtons(), createVolumeControlButtons()];

      await reply.edit({
        embeds: [embed],
        components: buttons
      });
    } catch (error) {
      console.error('❌ Play command error:', error);
      const errorEmbed = createErrorEmbed(error.message || 'Failed to play song');
      await message.reply({ embeds: [errorEmbed] });
    }
  }
};
