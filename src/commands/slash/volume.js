import { SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set the volume (0-200)')
    .addIntegerOption(option =>
      option
        .setName('level')
        .setDescription('Volume level (0-200)')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(200)
    ),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);
    const volume = interaction.options.getInteger('level');

    player.setVolume(volume);

    const successEmbed = createSuccessEmbed(
      'Volume Set',
      `🔊 Volume: ${player.volume}%`
    );
    await interaction.reply({ embeds: [successEmbed] });
  }
};
