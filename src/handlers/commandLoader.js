import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadSlashCommands(client) {
  const commandsDir = path.join(__dirname, '../commands/slash');
  const commands = new Collection();

  const commandFolders = readdirSync(commandsDir).filter(item =>
    item.endsWith('.js')
  );

  for (const file of commandFolders) {
    const filePath = path.join(commandsDir, file);
    const command = (await import(`file://${filePath}`)).default;

    if (command.data && command.execute) {
      commands.set(command.data.name, command);
    }
  }

  return commands;
}

export async function loadPrefixCommands(client) {
  const commandsDir = path.join(__dirname, '../commands/prefix');
  const commands = new Collection();

  const commandFolders = readdirSync(commandsDir).filter(item =>
    item.endsWith('.js')
  );

  for (const file of commandFolders) {
    const filePath = path.join(commandsDir, file);
    const command = (await import(`file://${filePath}`)).default;

    if (command.name && command.execute) {
      commands.set(command.name, command);
    }
  }

  return commands;
}

export async function loadEvents(client) {
  const eventsDir = path.join(__dirname, '../events');
  const eventFiles = readdirSync(eventsDir).filter(item => item.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsDir, file);
    const event = (await import(`file://${filePath}`)).default;

    if (event.name && event.execute) {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }
}

export async function registerSlashCommands(client, commands) {
  const commandData = commands.map(cmd => cmd.data.toJSON());

  try {
    await client.application.commands.set(commandData);
    console.log(`✅ Registered ${commandData.length} slash commands`);
  } catch (error) {
    console.error('❌ Failed to register slash commands:', error);
  }
}
