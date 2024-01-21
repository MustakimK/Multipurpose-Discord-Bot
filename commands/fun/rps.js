const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	// Define the command using SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('rps') // Set the command name
		.setDescription('Play a game of Rock, Paper, Scissors.') // Set the description
		// Add a string option for the user's choice with predefined choices
		.addStringOption(option => 
			option.setName('choice')
				.setDescription('Your choice: rock, paper, or scissors.')
				.setRequired(true)
				.addChoices(
					{ name: 'Rock', value: 'rock'},
					{ name: 'Paper', value: 'paper'},
					{ name: 'Scissors', value: 'scissors'}
				)),

    // The execute function that runs when the command is used
	async execute(interaction) {
		// Retrieve the user's choice from the command interaction
		const userChoice = interaction.options.getString('choice');

		// Possible choices for the bot
		const choices = ['rock', 'paper', 'scissors'];
		// Randomly select the bot's choice
		const botChoice = choices[Math.floor(Math.random() * choices.length)];

		// Determine the result of the game
		let result;
		if (userChoice === botChoice) {
			result = 'It\'s a draw!';
		} else if (
			(userChoice === 'rock' && botChoice === 'scissors') ||
			(userChoice === 'paper' && botChoice === 'rock') ||
			(userChoice === 'scissors' && botChoice === 'paper')
		) {
			result = 'You win!';
		} else {
			result = 'You lose!';
		}

		// Reply to the interaction with the outcome of the game
		await interaction.reply(`You chose ${userChoice}, I chose ${botChoice}. ${result}`);
	},
};