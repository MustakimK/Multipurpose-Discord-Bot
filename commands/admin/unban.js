const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban') // Set the command name
        .setDescription('Unban a member') // Set the description
        .addStringOption(option => 
            option.setName('userid') // Define an option to specify the user ID to unban
                .setDescription('The ID of the member to unban')
                .setRequired(true)), // Make this option required

    // The execute function that runs when the command is used
    async execute(interaction) {
        // Get the user ID from the command interaction
        const userId = interaction.options.getString('userid');

        try {
            // Defer the reply while processing the command
            await interaction.deferReply({ ephemeral: true });

            // Check if the user executing the command has the permission to unban members
            if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
                return await interaction.editReply('You do not have permission to use this command.');
            }

            // Fetch the list of banned users from the server
            const bannedUsers = await interaction.guild.bans.fetch();
            // Check if the specified user ID is in the list of banned users
            if (!bannedUsers.some(user => user.user.id === userId)) {
                return await interaction.editReply(`The user with ID ${userId} is not banned from this server.`);
            }

            // Unban the user with the specified user ID
            await interaction.guild.members.unban(userId);
            // Confirm the unban to the command issuer
            await interaction.editReply(`Unbanned user with ID ${userId}`);
        } catch (error) {
            console.error(error);
            // Handle any errors during the command execution
            await interaction.editReply('There was an error while executing this command!');
        }
    },
};
