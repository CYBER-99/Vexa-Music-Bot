import { SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('autoplay')
    .setDescription('Toggle autoplay (automatically queue related songs)'),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);
    player.autoplay = !player.autoplay;

    const successEmbed = createSuccessEmbed(
      'Autoplay',
      `♻️ Autoplay ${player.autoplay ? 'enabled' : 'disabled'}`
    );
    await interaction.reply({ embeds: [successEmbed] });
  }
};
