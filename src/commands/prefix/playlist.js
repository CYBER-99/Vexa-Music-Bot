import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  name: 'playlist',
  async execute(message, args, playerManager, client) {
    const subcommand = args[0]?.toLowerCase();

    // Note: This is a template. In production, playlists would be saved to a database
    if (subcommand === 'save') {
      const embed = createSuccessEmbed(
        'Playlist Saved',
        'Current queue saved as playlist'
      );
      await message.reply({ embeds: [embed] });
    } else if (subcommand === 'load') {
      const embed = createSuccessEmbed(
        'Playlist Loaded',
        'Playlist added to queue'
      );
      await message.reply({ embeds: [embed] });
    } else if (subcommand === 'list') {
      const embed = createSuccessEmbed(
        'Playlists',
        'No playlists saved yet'
      );
      await message.reply({ embeds: [embed] });
    } else {
      const errorEmbed = createErrorEmbed('Usage: .playlist [save|load|list]');
      await message.reply({ embeds: [errorEmbed] });
    }
  }
};
