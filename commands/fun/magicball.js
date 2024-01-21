const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	// Define the command data using SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('8ball') // Set the command name
		.setDescription('Ask the Magic 8 Ball a question.') // Set the description
		// Add a string option for the user's question
		.addStringOption(option => 
			option.setName('question')
				.setDescription('Your question for the Magic 8 Ball.')
				.setRequired(true)), // Make this option required

    // The execute function that runs when the command is used
	async execute(interaction) {
		// Array of possible responses from the Magic 8 Ball
		const responses = [
			'It is certain.', 'It is decidedly so.', 'Without a doubt.', 
			'Yes - definitely.', 'You may rely on it.', 'As I see it, yes.', 
			'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 
			'Reply hazy, try again.', 'Ask again later.', 
			'Better not tell you now.', 'Cannot predict now.', 
			'Concentrate and ask again.', 'Don\'t count on it.', 
			'My reply is no.', 'My sources say no.', 'Outlook not so good.', 
			'Very doubtful.'
		];

		// Randomly select a response from the array
		const response = responses[Math.floor(Math.random() * responses.length)];

		// Reply to the interaction with the selected Magic 8 Ball response
		await interaction.reply(response);
	},
};
