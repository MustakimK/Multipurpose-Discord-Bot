const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a member')
        .addStringOption(option => 
            option.setName('userid')
                .setDescription('The ID of the member to unban')
                .setRequired(true)),
    async execute(interaction) {
        const userId = interaction.options.getString('userid');

        try {
            // Defer the reply
            await interaction.deferReply({ ephemeral: true });

            if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
                return await interaction.editReply('You do not have permission to use this command.');
            }

            const bannedUsers = await interaction.guild.bans.fetch();
            if (!bannedUsers.some(user => user.user.id === userId)) {
                return await interaction.editReply(`The user with ID ${userId} is not banned from this server.`);
            }

            await interaction.guild.members.unban(userId);
            await interaction.editReply(`Unbanned user with ID ${userId}`);
        } catch (error) {
            console.error(error);
            // Edit the deferred reply to show an error message
            await interaction.editReply('There was an error while executing this command!');
        }
    },
};
