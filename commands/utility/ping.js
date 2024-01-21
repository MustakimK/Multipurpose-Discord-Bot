const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    // Define the command data using SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('ping') // Set the name of the command
		.setDescription('Replies with Pong! and time taken to respond.'), // Set the description

    // The execute function is called when the command is invoked
	async execute(interaction) {
		// Reply to the interaction with 'Pong!' and the round-trip delay time
		await interaction.reply('Pong! ' + (Date.now() - interaction.createdTimestamp) + 'ms');
	},
};