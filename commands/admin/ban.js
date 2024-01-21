const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban') // Set the command name
        .setDescription('Ban a member') // Set the description
        .addUserOption(option => 
            option.setName('target') // Define an option to select the user to ban
                .setDescription('The member to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason') // Define an option for the ban reason
                .setDescription('The reason for the ban')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('delete_messages') // Define an option to delete user messages
                .setDescription('Delete messages sent by the user')
                .setRequired(false)),

    // The execute function that runs when the command is used
    async execute(interaction) {
        try {
            // Defer the reply while processing the command
            await interaction.deferReply({ ephemeral: true });

            // Check if the user executing the command has the permission to ban members
            if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
                return await interaction.editReply('You do not have permission to use this command.');
            }

            // Get the target user, reason for the ban, and the delete messages option from the command interaction
            const user = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') || 'No reason provided';
            const deleteMessages = interaction.options.getBoolean('delete_messages');
            const member = interaction.guild.members.cache.get(user.id);

            // Additional checks to prevent self-ban and banning the bot itself
            if(user.id === interaction.user.id) {
                return await interaction.editReply('You cannot ban yourself.');
            }
            if(user.id === interaction.client.user.id) {
                return await interaction.editReply('I cannot ban myself.');
            }

            // Check if the target user is in the server and if they can be banned
            if (!member) {
                return await interaction.editReply(`The user ${user.tag} is not in this server.`);
            }
            if (!member.bannable || interaction.member.roles.highest.position <= member.roles.highest.position) {
                return await interaction.editReply(`I cannot ban ${user.tag}. They might have a higher role than me or you.`);
            }

            // Prepare the ban options (including deleting messages)
            const banOptions = {};
            if (deleteMessages) {
                banOptions.days = 7; // Delete messages from the past 7 days
            }
            banOptions.reason = reason;

            // Ban the user
            await member.ban(banOptions);
            // Confirm the ban to the command issuer
            await interaction.editReply(`Banned ${user.tag} for the following reason: ${reason}`);
        } catch (error) {
            console.error(error);
            // Handle any errors during the command execution
            await interaction.editReply('There was an error while executing this command!');
        }
    },
};