import { createErrorEmbed } from '../ui/embeds.js';
import config from '../config/config.js';
import playerManager from '../music/playerManager.js';

export default {
  name: 'messageCreate',
  async execute(message, client) {
    // Ignore bot messages
    if (message.author.bot) return;

    // Check if message starts with prefix
    if (!message.content.startsWith(config.bot.prefix)) return;

    // Extract command and arguments
    const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    try {
      await command.execute(message, args, playerManager, client);
    } catch (error) {
      console.error(`❌ Error executing prefix command ${commandName}:`, error);
      const errorEmbed = createErrorEmbed(error.message || 'An error occurred');
      await message.reply({ embeds: [errorEmbed] });
    }
  }
};
