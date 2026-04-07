import { EmbedBuilder } from 'discord.js';
import config from '../../config/config.js';

export default {
  name: 'invite',
  async execute(message, args, playerManager, client) {
    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${config.discord.clientId}&permissions=8&scope=bot%20applications.commands`;

    const embed = new EmbedBuilder()
      .setColor(config.colors.primary)
      .setTitle('🎶 Invite Music Bot')
      .setDescription(`[Click here to invite the bot](${inviteUrl})`)
      .setFooter({ text: 'Created by Cyber' });

    await message.reply({ embeds: [embed] });
  }
};
