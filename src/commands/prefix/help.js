import { createHelpEmbed } from '../../ui/embeds.js';

export default {
  name: 'help',
  async execute(message, args, playerManager, client) {
    const helpEmbed = createHelpEmbed();
    await message.reply({ embeds: [helpEmbed] });
  }
};
