import { createSuccessEmbed } from '../../ui/embeds.js';

export default {
  name: 'loop',
  async execute(message, args, playerManager, client) {
    const player = playerManager.getPlayer(message.guildId, client);
    const mode = args[0]?.toLowerCase();

    if (mode && ['off', 'song', 'queue'].includes(mode)) {
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
    await message.reply({ embeds: [successEmbed] });
  }
};
