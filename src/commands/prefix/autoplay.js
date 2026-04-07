import { createSuccessEmbed } from '../../ui/embeds.js';

export default {
  name: 'autoplay',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);
    player.autoplay = !player.autoplay;

    const successEmbed = createSuccessEmbed(
      'Autoplay',
      `♻️ Autoplay ${player.autoplay ? 'enabled' : 'disabled'}`
    );
    await message.reply({ embeds: [successEmbed] });
  }
};
