import {
  createNowPlayingEmbed,
  createErrorEmbed,
  createSuccessEmbed,
  createPlaybackControlsButtons,
  createVolumeControlButtons
} from '../ui/embeds.js';
import playerManager from '../music/playerManager.js';

export default {
  name: 'interactionCreate',
  async execute(interaction, client) {
    console.log("Interaction received:", interaction.type, interaction.isChatInputCommand() ? interaction.commandName : interaction.customId);

    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      const command = client.slashCommands.get(interaction.commandName);

      if (!command) {
        console.log("Command not found:", interaction.commandName);
        return;
      }

      console.log("Slash command detected:", interaction.commandName);

      try {
        console.log("Executing slash command:", interaction.commandName);
        await command.execute(interaction, playerManager, client);
        console.log("Slash command completed:", interaction.commandName);
      } catch (error) {
        console.error("Slash command failed:", error);
        console.error(`❌ Error executing slash command ${interaction.commandName}:`, error);
        const errorEmbed = createErrorEmbed(error.message || 'An error occurred');
        
        if (interaction.replied || interaction.deferred) {
          await interaction.editReply({ embeds: [errorEmbed] });
        } else {
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
      }
    }

    // Handle buttons
    if (interaction.isButton()) {
      const player = playerManager.getPlayer(interaction.guildId, client);
      const customId = interaction.customId;

      console.log("Button interaction detected:", customId);

      try {
        console.log("Executing button action:", customId);
        await interaction.deferUpdate();

        switch (customId) {
          case 'pause':
            if (player.audioPlayer && player.isPlaying) {
              player.audioPlayer.pause();
              console.log('⏸️ Music paused');
            } else if (player.audioPlayer) {
              player.audioPlayer.unpause();
              console.log('▶️ Music resumed');
            }
            break;

          case 'resume':
            if (player.audioPlayer && !player.isPlaying) {
              player.audioPlayer.unpause();
              console.log('▶️ Music resumed');
            }
            break;

          case 'skip':
            if (player.queue.length > 0) {
              const nextTrack = player.queue.shift();
              await player.playTrack(nextTrack);
              console.log(`⏭️ Skipped to: ${nextTrack.title}`);
            } else {
              player.audioPlayer.stop();
              console.log('⏭️ No more songs in queue');
            }
            break;

          case 'stop':
            player.audioPlayer.stop();
            player.clearQueue();
            player.currentTrack = null;
            console.log('⏹️ Playback stopped');
            break;

          case 'shuffle':
            player.shuffleQueue();
            console.log('🔀 Queue shuffled');
            break;

          case 'loop':
            const modes = ['off', 'song', 'queue'];
            const currentIndex = modes.indexOf(player.loop);
            const nextMode = modes[(currentIndex + 1) % modes.length];
            player.setLoop(nextMode);
            console.log(`🔁 Loop mode: ${nextMode}`);
            break;

          case 'volume_up':
            player.setVolume(player.volume + 10);
            console.log(`🔊 Volume: ${player.volume}%`);
            break;

          case 'volume_down':
            player.setVolume(player.volume - 10);
            console.log(`🔉 Volume: ${player.volume}%`);
            break;

          case 'autoplay':
            player.autoplay = !player.autoplay;
            console.log(`♻️ Autoplay: ${player.autoplay ? 'enabled' : 'disabled'}`);
            break;

          case 'queue_view':
            // Queue viewing handled by slash command
            break;
        }
      } catch (error) {
        console.error("Button interaction failed:", error);
        console.error('❌ Button interaction error:', error);
      }
    }
  }
};
