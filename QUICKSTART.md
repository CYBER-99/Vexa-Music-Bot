# 🚀 Quick Start Guide

Get your music bot running in **5 minutes**.

---

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages.

---

## Step 2: Get Your Discord Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Name it "Vexa Music Bot"
4. Go to the **"Bot"** tab
5. Click **"Add Bot"**
6. Under **TOKEN**, click **"Copy"**
7. Save it somewhere (you'll need it in Step 4)

---

## Step 3: Get Your Credentials

### Client ID & Guild ID
- **Client ID**: In your application, go to **OAuth2** and copy your **Client ID**
- **Guild ID**: In Discord, enable **Developer Mode** → right-click your server → **Copy Server ID**

### Spotify API (Optional)
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Accept terms, create app
4. Copy:
   - **Client ID**
   - **Client Secret**

### YouTube API (Required)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable **"YouTube Data API v3"**
4. Create an **API Key**

---

## Step 4: Configure `.env`

Copy the example file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DISCORD_TOKEN=your_token_from_step2
CLIENT_ID=your_client_id
GUILD_ID=your_guild_id

SPOTIFY_CLIENT_ID=your_spotify_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret

YOUTUBE_API_KEY=your_youtube_key_optional

PREFIX=.
DEFAULT_VOLUME=70
AUTO_DISCONNECT_TIME=300
```

---

## Step 5: Run the Bot

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   🎵 VEXA MUSIC BOT - STARTING UP    ║
╚════════════════════════════════════════╝

📋 Environment Validation:
   ✅ DISCORD_TOKEN loaded
   ✅ CLIENT_ID: ...
   ...

✅ Bot logged in as YourBotName#0000
🎵 Music Bot is ready!
```

---

## Step 6: Invite Bot to Your Server

1. In your browser, visit:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```
(Replace `YOUR_CLIENT_ID` with your actual client ID)

2. Select your server
3. Click **"Authorize"**

---

## Step 7: Test It Out

In your Discord server:

### Try a Slash Command
- `/play Never Gonna Give You Up`
- `/help`
- `/ping`

### Try a Prefix Command
- `.play Never Gonna Give You Up`
- `.help`
- `.ping`

---

## That's It! 🎉

Your bot is now running and ready to play music!

---

## Commands Reference

### Slash Commands
- `/play` - Play a song
- `/pause` - Pause
- `/resume` - Resume
- `/skip` - Skip
- `/stop` - Stop
- `/queue` - View queue
- `/shuffle` - Shuffle
- `/loop` - Toggle loop
- `/volume` - Set volume
- `/autoplay` - Toggle autoplay
- `/help` - Help menu
- `/ping` - Latency check

### Prefix Commands
- `.play song` - Same as `/play`
- `.pause` - Same as `/pause`
- `.resume` - Same as `/resume`
- `.skip` - Same as `/skip`
- `.stop` - Same as `/stop`
- `.queue` - Same as `/queue`
- `.shuffle` - Same as `/shuffle`
- `.loop` - Same as `/loop`
- `.volume 70` - Same as `/volume`
- `.autoplay` - Same as `/autoplay`
- `.help` - Same as `/help`
- `.ping` - Same as `/ping`

---

## Troubleshooting

### "Token is invalid"
- Make sure you copied your token correctly
- Check `.env` has `DISCORD_TOKEN=` (not `DISCORD_=`)

### "Commands not showing up"
- Bot must be in voice channel to join
- Make sure bot has message permissions
- Reload Discord (Ctrl+R)

### "No audio playing"
- Install FFmpeg: https://ffmpeg.org/download.html
- Verify YouTube/Spotify URLs are correct
- Check bot has CONNECT and SPEAK permissions

### "Spotify not working"
- Verify credentials are correct
- Spotify API fallback is automatic
- Can still use YouTube while Spotify loads

---

## Need More Help?

See [README.md](README.md) for complete documentation.

---

**You're all set! Enjoy the music! 🎵**
