const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! and time taken to respond.'),
	async execute(interaction) {
		await interaction.reply('Pong! ' + (Date.now() - interaction.createdTimestamp) + 'ms');
	},
};