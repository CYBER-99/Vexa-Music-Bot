import { EmbedBuilder } from 'discord.js';
import config from '../../config/config.js';

export default {
  name: 'ping',
  async execute(message, args, playerManager, client) {
    const embed = new EmbedBuilder()
      .setColor(config.colors.success)
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Bot Latency', value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
        { name: 'API Latency', value: `${client.ws.ping}ms`, inline: true }
      )
      .setFooter({ text: 'Created by Cyber' });

    await message.reply({ embeds: [embed] });
  }
};
