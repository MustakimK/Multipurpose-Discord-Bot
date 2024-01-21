const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Username: ${interaction.user.username}\n
        Server Join Date: ${interaction.member.joinedAt}\n
        Account Creation Date: ${interaction.user.createdAt}\n
        Roles: ${interaction.member.roles.cache.map(role => role.name).join(", ")}`
        );
	},
};