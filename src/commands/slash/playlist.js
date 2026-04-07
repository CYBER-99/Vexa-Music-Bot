import { SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed, createErrorEmbed } from '../../ui/embeds.js';

export default {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Manage and view playlists')
    .addSubcommand(sub =>
      sub
        .setName('save')
        .setDescription('Save current queue as a playlist')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Playlist name')
            .setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName('load')
        .setDescription('Load a saved playlist')
        .addStringOption(option =>
          option
            .setName('playlist')
            .setDescription('Playlist name')
            .setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName('list')
        .setDescription('List all saved playlists')
    ),
  async execute(interaction, playerManager, client) {
    const subcommand = interaction.options.getSubcommand();

    // Note: This is a template. In production, playlists would be saved to a database
    if (subcommand === 'save') {
      const embed = createSuccessEmbed(
        'Playlist Saved',
        'Current queue saved as playlist'
      );
      await interaction.reply({ embeds: [embed] });
    } else if (subcommand === 'load') {
      const embed = createSuccessEmbed(
        'Playlist Loaded',
        'Playlist added to queue'
      );
      await interaction.reply({ embeds: [embed] });
    } else if (subcommand === 'list') {
      const embed = createSuccessEmbed(
        'Playlists',
        'No playlists saved yet'
      );
      await interaction.reply({ embeds: [embed] });
    }
  }
};
