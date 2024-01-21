const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	// Define the command data using SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('user') // Set the name of the command
		.setDescription('Provides information about the user.'), // Set the description

    // The execute function is called when the command is invoked
    async execute(interaction) {
        // Prepare a response containing information about the user who ran the command
        await interaction.reply(`Username: ${interaction.user.username}\n
        Server Join Date: ${interaction.member.joinedAt}\n
        Account Creation Date: ${interaction.user.createdAt}\n
        Roles: ${interaction.member.roles.cache.map(role => role.name).join(", ")}`
        );
	},
};