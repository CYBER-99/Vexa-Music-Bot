# 🎵 Vexa Music Bot - Production Ready

A fully functional, production-grade Discord music bot with YouTube, Spotify support, interactive buttons, and professional UI.

## Features

### Music Playback
- ▶️ YouTube link and search support
- 🎵 Spotify track, playlist, and album support
- 🎚️ Volume control (0-200%)
- 🔁 Advanced loop system (off, song, queue)
- ♻️ Autoplay mode
- 📋 Queue management
- 🔀 Queue shuffle
- ⏸️ Pause/Resume/Skip

### Command Systems
- 🖥️ **Slash Commands** - Modern `/command` interface
- 📝 **Prefix Commands** - Classic `.command` system
- Both systems fully functional and synced

### Interactive Controls
- **Button System** - Control playback with buttons
- **Real-time Updates** - Live player status
- **Modern UI** - Beautiful embeds with icons
- **Progress Bars** - Track progress visualization

### Advanced Features
- 🎼 Playlist support (save/load)
- 🔇 Per-guild settings
- 🛡️ Error handling & recovery
- 📊 Stable multi-server support
- 🔄 Automatic reconnection
- 💾 Memory efficient

---

## Setup

### 1. Prerequisites

- Node.js 20+
- Discord Bot Token
- Spotify API credentials
- YouTube API key (optional, falls back to yt-dlp)

### 2. Installation

```bash
# Install dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy example to .env
cp .env.example .env

# Edit .env with your credentials
# See 'Obtaining Credentials' section below
```

### 4. Running the Bot

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

---

## Obtaining Credentials

### Discord Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Name it "Vexa Music Bot"
4. Go to "Bot" → Click "Add Bot"
5. Under TOKEN, click "Copy"
6. Paste in `.env` as `DISCORD_TOKEN`

### ClientID and GuildID

- **ClientID**: Found in "OAuth2" → "Client ID"
- **GuildID**: Enable Developer Mode in Discord → Right-click server → Copy Server ID

### YouTube API Key (Required)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create API key
5. Add to `.env` as `YOUTUBE_API_KEY`

### Spotify API (Optional)

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an application
3. Accept terms, create app
4. Get **Client ID** and **Client Secret**
5. Add to `.env`:
   ```
   SPOTIFY_CLIENT_ID=your_id
   SPOTIFY_CLIENT_SECRET=your_secret
   ```

If not provided, the bot uses `yt-dlp` for searching automatically.

---

## Commands

### Slash Commands (`/command`)

**Playback:**
- `/play` - Play a song
- `/pause` - Pause playback
- `/resume` - Resume playback
- `/skip` - Skip to next
- `/stop` - Stop and clear queue

**Queue:**
- `/queue` - View queue
- `/shuffle` - Shuffle queue
- `/remove` - Remove song
- `/clear` - Clear queue

**Controls:**
- `/volume` - Set volume
- `/loop` - Toggle loop
- `/autoplay` - Toggle autoplay

**Info:**
- `/nowplaying` - Show current song
- `/playlist` - Manage playlists
- `/help` - Show help
- `/ping` - Bot latency
- `/invite` - Bot invite link

### Prefix Commands (`.command`)

Same as slash commands but with prefix:
- `.play song`
- `.pause`
- `.resume`
- `.skip`
- `.stop`
- `.queue`
- `.shuffle`
- `.loop`
- `.volume 70`
- `.autoplay`
- `.nowplaying`
- `.remove 1`
- `.clear`
- `.playlist save myplaylist`
- `.playlist load myplaylist`
- `.help`
- `.ping`
- `.invite`

---

## Button Controls

When music is playing, buttons appear:

**Playback Row:**
- ⏸️ Pause
- ⏭️ Skip
- ⏹️ Stop
- 🔀 Shuffle
- 🔁 Loop

**Control Row:**
- 🔉 Volume Down
- 🔊 Volume Up
- ♻️ Autoplay
- 📋 Queue

---

## Project Structure

```
Vexa V2/
├── src/
│   ├── commands/
│   │   ├── slash/          # Slash commands
│   │   └── prefix/         # Prefix commands
│   ├── events/             # Event handlers
│   ├── handlers/           # Command loaders
│   ├── music/              # Player system
│   ├── utils/              # Audio resolvers, APIs
│   ├── ui/                 # Embeds & buttons
│   └── config/             # Configuration
├── index.js                # Entry point
├── package.json            # Dependencies
├── .env                    # Environment (create from .env.example)
└── .env.example            # Template
```

---

## Features Breakdown

### Audio System
- Uses `discord.js` voice module
- `play-dl` for streaming
- `yt-dlp` fallback search
- FFmpeg integration
- Opus encoding

### Player Management
- Per-guild player instances
- Queue system with shuffle
- Volume control per guild
- Loop modes (off, song, queue)
- Autoplay recommendations

### Error Handling
- Network error recovery
- Voice disconnection handling
- Missing permission handling
- Invalid input validation
- API failure fallbacks

### Production Ready
- ✅ No placeholder features
- ✅ All commands functional
- ✅ Proper error handling
- ✅ Multi-server support
- ✅ Stable memory management
- ✅ Automatic reconnection
- ✅ Comprehensive logging

---

## Hosting

The bot works on:
- ✅ Windows / Linux / MacOS
- ✅ Railway
- ✅ Render
- ✅ Replit
- ✅ VPS
- ✅ Local machine

Environment variables work the same everywhere.

---

## Troubleshooting

### Bot won't start
- Check `.env` file has all required variables
- Ensure Node.js 20+ installed
- Run `npm install` to install dependencies

### Commands not working
- Use `/` for slash commands
- Use `.` prefix for text commands (or configured prefix)
- Bot must have MESSAGE_CONTENT intent
- Ensure bot has permissions in channel

### No audio
- Check bot is in voice channel
- Verify FFmpeg is installed
- Check Opus encoder available
- Ensure YouTube/Spotify URLs valid

### API errors
- Verify Spotify credentials
- Check YouTube API key validity
- Fallback systems will auto-activate if APIs fail

---

## Configuration

Edit `.env` to configure:

```env
PREFIX=.                    # Command prefix
DEFAULT_VOLUME=70           # Default volume %
AUTO_DISCONNECT_TIME=300    # Disconnect timeout (seconds)
```

---

## Performance

- Lightweight & efficient
- Handles multiple servers
- Minimal memory footprint
- Non-blocking operations
- Connection pooling

---

## Security

- Environment variables for secrets
- No token/key logging
- Safe error messages
- No sensitive data stored

---

## Support

For issues or features:
1. Check logs in console
2. Verify all credentials
3. Ensure dependencies installed
4. Check bot permissions

---

## Created by Cyber

Music bot for the most demanding users.

---

**Version:** 1.0.0  
**Status:** Production Ready ✅  
**Last Updated:** 2024
