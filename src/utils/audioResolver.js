import { stream } from 'play-dl';
import config from '../config/config.js';

export async function getPlaydlStream(track) {
  try {
    if (track.url) {
      const s = await stream(track.url);
      return s.stream;
    } else if (track.youtubeId) {
      const s = await stream(`https://www.youtube.com/watch?v=${track.youtubeId}`);
      return s.stream;
    }
    throw new Error('No playable URL found for track');
  } catch (error) {
    console.error('❌ Error getting stream:', error);
    throw error;
  }
}

export async function searchYoutube(query, apiKey = config.youtube.apiKey) {
  if (!apiKey) {
    return searchYoutubeFallback(query);
  }

  try {
    // For now, always use fallback since YouTube API requires complex setup
    return searchYoutubeFallback(query);
  } catch (error) {
    console.warn('⚠️ YouTube search failed, using fallback');
    return searchYoutubeFallback(query);
  }
}

export async function searchYoutubeFallback(query) {
  try {
    const results = await stream.search(query, { limit: 5 });
    return results.map(item => ({
      title: item.name || item.title,
      artist: item.author?.name || 'Unknown Artist',
      url: item.url,
      youtubeId: extractYoutubeId(item.url),
      thumbnail: item.thumbnail || '',
      duration: item.durationInSec || 0
    }));
  } catch (error) {
    console.error('❌ Fallback search failed:', error);
    return [];
  }
}

export async function resolveSpotifyTrack(spotifyUrl, spotifyClient) {
  try {
    const trackId = extractSpotifyId(spotifyUrl);
    const track = await spotifyClient.getTrack(trackId);
    
    const searchQuery = `${track.name} ${track.artists[0].name}`;
    const results = await searchYoutube(searchQuery);
    
    if (results.length > 0) {
      return {
        ...results[0],
        spotifyUrl: spotifyUrl,
        originalTitle: track.name,
        artist: track.artists[0].name,
        duration: track.duration_ms / 1000
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Failed to resolve Spotify track:', error);
    return null;
  }
}

export async function resolveSpotifyPlaylist(spotifyUrl, spotifyClient) {
  try {
    const playlistId = extractSpotifyId(spotifyUrl);
    const playlist = await spotifyClient.getPlaylistTracks(playlistId, { limit: 50 });
    
    const tracks = [];
    for (const item of playlist.body.items) {
      if (item.track) {
        const searchQuery = `${item.track.name} ${item.track.artists[0].name}`;
        const results = await searchYoutube(searchQuery);
        
        if (results.length > 0) {
          tracks.push({
            ...results[0],
            spotifyUrl: item.track.external_urls.spotify,
            originalTitle: item.track.name,
            artist: item.track.artists[0].name
          });
        }
      }
    }
    return tracks;
  } catch (error) {
    console.error('❌ Failed to resolve Spotify playlist:', error);
    return [];
  }
}

function extractYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function extractSpotifyId(url) {
  if (!url) return null;
  const match = url.match(/spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/);
  return match ? match[2] : null;
}

export function isYoutubeUrl(url) {
  return /(?:youtube\.com|youtu\.be)/.test(url);
}

export function isSpotifyUrl(url) {
  return /spotify\.com\/(track|playlist|album)/.test(url);
}
