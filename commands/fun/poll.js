const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	// Define the command using SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('poll') // Set the command name
		.setDescription('Create a poll.') // Set the description
		// Add a string option for the poll question
		.addStringOption(option => 
			option.setName('question')
				.setDescription('The question for the poll.')
				.setRequired(true))
		// Add a string option for the poll options, expecting a comma-separated list
		.addStringOption(option => 
			option.setName('options')
				.setDescription('The options for the poll, separated by commas.')
				.setRequired(true)),

    // The execute function that runs when the command is used
	async execute(interaction) {
		// Retrieve the poll question and options from the command interaction
		const question = interaction.options.getString('question');
		const options = interaction.options.getString('options').split(',');

		// Send the poll question and options as a message
		interaction.reply(`${question}\n\n${options.map((option, index) => `${index + 1}. ${option}`).join('\n')}`, { fetchReply: true });

		// Fetch the reply message sent by the bot
		const pollMessage = await interaction.fetchReply();

		// React to the poll message with number emojis for each option
		for (let i = 0; i < options.length; i++) {
			pollMessage.react(`${i + 1}\u20E3`);
		}
	},
};