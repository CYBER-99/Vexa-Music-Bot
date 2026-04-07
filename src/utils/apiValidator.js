export async function validateAPIs(youtubeApiKey, spotifyClient) {
  console.log('🔍 Validating API connections...');

  if (!youtubeApiKey) {
    throw new Error('YOUTUBE_API_KEY is required for YouTube API access');
  }
  console.log('✅ YouTube API key provided');

  if (spotifyClient) {
    try {
      const data = await spotifyClient.clientCredentialsFlow();
      spotifyClient.setAccessToken(data.body.access_token);
      console.log('✅ Spotify API connection successful');
    } catch (error) {
      console.error('❌ Spotify API connection failed:', error?.message || error);
      throw new Error('Spotify API initialization failed');
    }
  } else {
    console.log('ℹ️ Spotify API not configured - Spotify features disabled');
  }
}
