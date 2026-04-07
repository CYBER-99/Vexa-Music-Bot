import {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
  joinVoiceChannel
} from '@discordjs/voice';
import { getPlaydlStream, searchYoutube } from '../utils/audioResolver.js';

export class GuildPlayer {
  constructor(guildId, client) {
    this.guildId = guildId;
    this.client = client;
    this.audioPlayer = createAudioPlayer();
    console.log("Creating audio player for guild:", guildId);
    this.voiceConnection = null;
    this.queue = [];
    this.currentTrack = null;
    this.isPlaying = false;
    this.volume = 70;
    this.loop = 'off'; // 'off', 'song', 'queue'
    this.autoplay = false;
    this.lastMessageId = null;
    this.lastChannelId = null;

    this.setupAudioPlayerListeners();
  }

  setupAudioPlayerListeners() {
    this.audioPlayer.on(AudioPlayerStatus.Playing, () => {
      this.isPlaying = true;
    });

    this.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
      this.isPlaying = false;

      if (this.loop === 'song' && this.currentTrack) {
        // Loop current song
        await this.playTrack(this.currentTrack, false);
      } else if (this.queue.length > 0) {
        // Play next song in queue
        const nextTrack = this.queue.shift();
        await this.playTrack(nextTrack, false);
      } else if (this.autoplay) {
        // Queue a related song
        await this.queueAutoplay();
      } else {
        // Queue empty, disconnect after timeout
        this.scheduleDisconnect();
      }
    });

    this.audioPlayer.on('error', (error) => {
      console.error(`❌ Audio player error in guild ${this.guildId}:`, error);
      this.isPlaying = false;
      if (this.queue.length > 0) {
        const nextTrack = this.queue.shift();
        this.playTrack(nextTrack, false).catch(console.error);
      }
    });
  }

  async joinVoiceChannel(channel) {
    try {
      console.log("Joining voice channel:", channel.name);
      this.voiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      this.voiceConnection.subscribe(this.audioPlayer);
      await entersState(this.voiceConnection, VoiceConnectionStatus.Ready, 30_000);
      return true;
    } catch (error) {
      console.error(`❌ Failed to join voice channel:`, error);
      return false;
    }
  }

  async playTrack(track, sendMessage = true) {
    try {
      console.log("Starting playback for track:", track.title);
      const stream = await getPlaydlStream(track);
      const resource = createAudioResource(stream, { inlineVolume: true });
      resource.volume?.setVolume(this.volume / 100);
      
      this.currentTrack = track;
      this.audioPlayer.play(resource);
      
      if (sendMessage) {
        console.log(`▶️ Now playing: ${track.title}`);
      }
      return true;
    } catch (error) {
      console.error(`❌ Error playing track:`, error);
      // Try to play next track in queue
      if (this.queue.length > 0) {
        const nextTrack = this.queue.shift();
        setTimeout(() => this.playTrack(nextTrack, sendMessage), 1000);
      }
      return false;
    }
  }

  addToQueue(track) {
    this.queue.push(track);
  }

  removeFromQueue(index) {
    if (index >= 0 && index < this.queue.length) {
      return this.queue.splice(index, 1)[0];
    }
    return null;
  }

  clearQueue() {
    this.queue = [];
  }

  shuffleQueue() {
    for (let i = this.queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
    }
  }

  async queueAutoplay() {
    if (!this.currentTrack) return;
    
    try {
      const results = await searchYoutube(`${this.currentTrack.title} ${this.currentTrack.artist}`);
      if (results.length > 0) {
        const nextTrack = {
          ...results[0],
          autoplay: true
        };
        this.queue.push(nextTrack);
        const nextQueued = this.queue.shift();
        await this.playTrack(nextQueued, false);
      }
    } catch (error) {
      console.error('❌ Autoplay failed:', error);
    }
  }

  scheduleDisconnect() {
    if (this.disconnectTimeout) clearTimeout(this.disconnectTimeout);
    this.disconnectTimeout = setTimeout(() => {
      if (this.queue.length === 0 && !this.isPlaying) {
        this.disconnect();
      }
    }, 300000); // 5 minutes
  }

  disconnect() {
    if (this.voiceConnection) {
      this.voiceConnection.destroy();
      this.voiceConnection = null;
    }
    if (this.disconnectTimeout) clearTimeout(this.disconnectTimeout);
    this.audioPlayer.stop();
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(200, volume));
    if (this.audioPlayer.state.resource?.volume) {
      this.audioPlayer.state.resource.volume.setVolume(this.volume / 100);
    }
  }

  setLoop(mode) {
    const modes = ['off', 'song', 'queue'];
    if (modes.includes(mode)) {
      this.loop = mode;
      return true;
    }
    return false;
  }
}

export class PlayerManager {
  constructor() {
    this.guildPlayers = new Map();
  }

  getPlayer(guildId, client) {
    if (!this.guildPlayers.has(guildId)) {
      this.guildPlayers.set(guildId, new GuildPlayer(guildId, client));
    }
    return this.guildPlayers.get(guildId);
  }

  removePlayer(guildId) {
    const player = this.guildPlayers.get(guildId);
    if (player) {
      player.disconnect();
      this.guildPlayers.delete(guildId);
    }
  }

  getAllPlayers() {
    return Array.from(this.guildPlayers.values());
  }
}
