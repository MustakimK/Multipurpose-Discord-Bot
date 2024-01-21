const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Create a poll.')
		.addStringOption(option => 
			option.setName('question')
				.setDescription('The question for the poll.')
				.setRequired(true))
		.addStringOption(option => 
			option.setName('options')
				.setDescription('The options for the poll, separated by commas.')
				.setRequired(true)),

	async execute(interaction) {
		const question = interaction.options.getString('question');
		const options = interaction.options.getString('options').split(',');

		// Create the poll
		interaction.reply(`${question}\n\n${options.map((option, index) => `${index + 1}. ${option}`).join('\n')}`, { fetchReply: true });

		const pollMessage = await interaction.fetchReply();

		// Add reactions for each option
		for (let i = 0; i < options.length; i++) {
			pollMessage.react(`${i + 1}\u20E3`);
		}
	},
};
