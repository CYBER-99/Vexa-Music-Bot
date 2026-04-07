import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import config from '../config/config.js';

export function createNowPlayingEmbed(track, player, requester) {
  const embed = new EmbedBuilder()
    .setColor(config.colors.primary)
    .setTitle(`${config.emojis.play} Now Playing`)
    .setDescription(`**${track.title}**`)
    .addFields(
      {
        name: `${config.emojis.spotify} Artist`,
        value: track.artist || 'Unknown',
        inline: true
      },
      {
        name: '⏱️ Duration',
        value: formatTime(track.duration || 0),
        inline: true
      },
      {
        name: '🎤 Requested by',
        value: requester.toString(),
        inline: true
      },
      {
        name: `${config.emojis.queue} Queue Length`,
        value: `${player.queue.length} songs`,
        inline: true
      },
      {
        name: `${config.emojis.volumeUp} Volume`,
        value: `${player.volume}%`,
        inline: true
      },
      {
        name: `${config.emojis.loop} Loop Mode`,
        value: player.loop === 'off' ? 'Off' : player.loop === 'song' ? '🎵 Song' : '📋 Queue',
        inline: true
      }
    );

  if (track.thumbnail) {
    embed.setThumbnail(track.thumbnail);
  }

  embed.setFooter({ text: 'Created by Cyber' });

  return embed;
}

export function createQueueEmbed(tracks, page = 1) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tracks.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = tracks.slice(start, end);

  const embed = new EmbedBuilder()
    .setColor(config.colors.primary)
    .setTitle(`${config.emojis.queue} Queue (${tracks.length} songs)`);

  if (pageItems.length === 0) {
    embed.setDescription('Queue is empty');
  } else {
    const description = pageItems
      .map((track, i) => `**${start + i + 1}.** ${track.title} - ${track.artist}`)
      .join('\n');
    embed.setDescription(description);
  }

  embed.setFooter({
    text: `Page ${page}/${totalPages} • Created by Cyber`
  });

  return embed;
}

export function createPlaybackControlsButtons() {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('pause')
        .setEmoji(config.emojis.pause)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('skip')
        .setEmoji(config.emojis.skip)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('stop')
        .setEmoji(config.emojis.stop)
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('shuffle')
        .setEmoji(config.emojis.shuffle)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('loop')
        .setEmoji(config.emojis.loop)
        .setStyle(ButtonStyle.Secondary)
    );
  return row;
}

export function createVolumeControlButtons() {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('volume_down')
        .setEmoji(config.emojis.volumeDown)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('volume_up')
        .setEmoji(config.emojis.volumeUp)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('autoplay')
        .setEmoji(config.emojis.autoplay)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('queue_view')
        .setEmoji(config.emojis.queue)
        .setStyle(ButtonStyle.Secondary)
    );
  return row;
}

export function createHelpEmbed() {
  const embed = new EmbedBuilder()
    .setColor(config.colors.primary)
    .setTitle('📚 Music Bot Help')
    .setDescription('Complete guide to using the music bot')
    .addFields(
      {
        name: `${config.emojis.play} Playback Commands`,
        value: `\`${config.bot.prefix}play <song>\` - Play a song\n` +
               `\`${config.bot.prefix}pause\` - Pause playback\n` +
               `\`${config.bot.prefix}resume\` - Resume playback\n` +
               `\`${config.bot.prefix}skip\` - Skip to next song\n` +
               `\`${config.bot.prefix}stop\` - Stop playback`,
        inline: false
      },
      {
        name: `${config.emojis.queue} Queue Commands`,
        value: `\`${config.bot.prefix}queue\` - View queue\n` +
               `\`${config.bot.prefix}remove <number>\` - Remove song from queue\n` +
               `\`${config.bot.prefix}clear\` - Clear entire queue\n` +
               `\`${config.bot.prefix}shuffle\` - Shuffle queue`,
        inline: false
      },
      {
        name: `${config.emojis.volumeUp} Control Commands`,
        value: `\`${config.bot.prefix}volume <0-200>\` - Set volume\n` +
               `\`${config.bot.prefix}loop\` - Toggle loop mode\n` +
               `\`${config.bot.prefix}autoplay\` - Toggle autoplay`,
        inline: false
      },
      {
        name: `${config.emojis.spotify} Supported Formats`,
        value: `• YouTube links and searches\n` +
               `• Spotify track links\n` +
               `• Spotify playlist links\n` +
               `• Direct song search`,
        inline: false
      }
    )
    .setFooter({ text: 'Created by Cyber' });

  return embed;
}

export function createErrorEmbed(error) {
  return new EmbedBuilder()
    .setColor(config.colors.error)
    .setTitle('❌ Error')
    .setDescription(error)
    .setFooter({ text: 'Created by Cyber' });
}

export function createSuccessEmbed(title, description) {
  return new EmbedBuilder()
    .setColor(config.colors.success)
    .setTitle(`✅ ${title}`)
    .setDescription(description)
    .setFooter({ text: 'Created by Cyber' });
}

export function createLoadingEmbed() {
  return new EmbedBuilder()
    .setColor(config.colors.warning)
    .setTitle(`${config.emojis.loading} Loading...`)
    .setDescription('Please wait while we process your request')
    .setFooter({ text: 'Created by Cyber' });
}

function formatTime(seconds) {
  if (!seconds || seconds === 0) return 'Unknown';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

export { formatTime };
