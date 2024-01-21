const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	// Define the command data using SlashCommandBuilder
	data: new SlashCommandBuilder()
        .setName('coinflip') // Set the command name
        .setDescription('Flip a coin.'), // Set the description

    // The execute function that runs when the command is used
	async execute(interaction) {
		// Determine the result of the coin flip with a 50% chance for each side
		const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

		// Reply to the interaction with the result of the coin flip
		await interaction.reply(`You flipped a coin. It's ${result}!`);
	},
};
