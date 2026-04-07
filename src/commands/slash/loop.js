import { SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Toggle loop mode')
    .addStringOption(option =>
      option
        .setName('mode')
        .setDescription('Loop mode')
        .setRequired(false)
        .addChoices(
          { name: 'Off', value: 'off' },
          { name: 'Song', value: 'song' },
          { name: 'Queue', value: 'queue' }
        )
    ),
  async execute(interaction, playerManager, client) {
    const player = playerManager.getPlayer(interaction.guildId, client);
    const mode = interaction.options.getString('mode');

    if (mode) {
      player.setLoop(mode);
    } else {
      const modes = ['off', 'song', 'queue'];
      const currentIndex = modes.indexOf(player.loop);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      player.setLoop(nextMode);
    }

    const modeDisplay = {
      'off': '🔁 Off',
      'song': '🎵 Current Song',
      'queue': '📋 Entire Queue'
    };

    const successEmbed = createSuccessEmbed(
      'Loop Mode',
      `Set to: ${modeDisplay[player.loop]}`
    );
    await interaction.reply({ embeds: [successEmbed] });
  }
};
