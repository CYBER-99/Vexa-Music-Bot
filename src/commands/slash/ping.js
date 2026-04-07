import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import config from '../../config/config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot latency'),
  async execute(interaction, playerManager, client) {
    const embed = new EmbedBuilder()
      .setColor(config.colors.success)
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Bot Latency', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
        { name: 'API Latency', value: `${client.ws.ping}ms`, inline: true }
      )
      .setFooter({ text: 'Created by Cyber' });

    await interaction.reply({ embeds: [embed] });
  }
};
