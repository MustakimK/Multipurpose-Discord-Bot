const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin.'),
	async execute(interaction) {
		const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
		await interaction.reply(`You flipped a coin. It's ${result}!`);
	},
};
