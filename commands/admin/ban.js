const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the ban')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('delete_messages')
                .setDescription('Delete messages sent by the user')
                .setRequired(false)),
    async execute(interaction) {
        try {
            // Defer the reply
            await interaction.deferReply({ ephemeral: true });

            if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
                return await interaction.editReply('You do not have permission to use this command.');
            }

            const user = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') || 'No reason provided';
            const deleteMessages = interaction.options.getBoolean('delete_messages');
            const member = interaction.guild.members.cache.get(user.id);

            if(user.id === interaction.user.id) {
                return await interaction.editReply('You cannot ban yourself.');
            }

            //if trying to ban the bot
            if(user.id === interaction.client.user.id) {
                return await interaction.editReply('I cannot ban myself.');
            }

            if (!member) {
                return await interaction.editReply(`The user ${user.tag} is not in this server.`);
            }

            if (!member.bannable || interaction.member.roles.highest.position <= member.roles.highest.position) {
                return await interaction.editReply(`I cannot ban ${user.tag}. They might have a higher role than me or you.`);
            }

            const banOptions = {};
            if (deleteMessages) {
                banOptions.days = 7; // Delete messages from the past 7 days
            }

            banOptions.reason = reason;

            await member.ban(banOptions);
            await interaction.editReply(`Banned ${user.tag} for the following reason: ${reason}`);
        } catch (error) {
            console.error(error);
            // Edit the deferred reply to show an error message
            await interaction.editReply('There was an error while executing this command!');
        }
    },
};
