let youtubeApiReady = false;
let spotifyApiReady = false;

export async function validateAPIs(youtubeApiKey, spotifyClient) {
  console.log('🔍 Validating API connections...');

  // Note: YouTube API testing skipped - will be tested on first use
  if (youtubeApiKey) {
    console.log('✅ YouTube API key provided - will test on first use');
  } else {
    console.log('⚠️ YouTube API key not provided - using yt-dlp search');
  }

  // Test Spotify API
  if (spotifyClient) {
    try {
      // Authenticate with Spotify
      const data = await spotifyClient.clientCredentialsFlow();
      spotifyClient.setAccessToken(data.body.access_token);
      
      // Test connection
      await spotifyClient.getMe();
      spotifyApiReady = true;
      console.log('✅ Spotify API connection successful');
    } catch (error) {
      console.warn('⚠️ Spotify API connection failed - Spotify features disabled');
    }
  }
}

export function isYoutubeApiReady() {
  return youtubeApiReady;
}

export function isSpotifyApiReady() {
  return spotifyApiReady;
}
