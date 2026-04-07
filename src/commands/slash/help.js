import { SlashCommandBuilder } from 'discord.js';
import { createHelpEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show help and command information'),
  async execute(interaction, playerManager, client) {
    const helpEmbed = createHelpEmbed();
    await interaction.reply({ embeds: [helpEmbed] });
  }
};
