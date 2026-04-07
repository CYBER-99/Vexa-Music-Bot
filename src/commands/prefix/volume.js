import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  name: 'volume',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);
    const volume = parseInt(args[0]);

    if (isNaN(volume)) {
      const errorEmbed = createErrorEmbed('Please provide a valid volume level (0-200)');
      return await message.reply({ embeds: [errorEmbed] });
    }

    player.setVolume(volume);

    const successEmbed = createSuccessEmbed(
      'Volume Set',
      `🔊 Volume: ${player.volume}%`
    );
    await message.reply({ embeds: [successEmbed] });
  }
};
