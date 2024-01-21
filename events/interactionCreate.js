const { Events } = require('discord.js');

// interactionCreate event handler
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Only proceed if the interaction is a chat input (slash) command
        if (!interaction.isChatInputCommand()) return;

        // Retrieve and execute the corresponding command, if it exists
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            // Attempt to execute the command and handle errors
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            // Reply to the interaction indicating an error, using follow-up if a reply was already made
            const replyOptions = { content: 'There was an error while executing this command!', ephemeral: true };
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(replyOptions);
            } else {
                await interaction.reply(replyOptions);
            }
        }
    },
};