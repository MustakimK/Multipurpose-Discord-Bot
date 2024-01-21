const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick') // Set the command name
        .setDescription('Kick a member') // Set the description
        .addUserOption(option => 
            option.setName('target') // Define an option to select the user to kick
                .setDescription('The member to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason') // Define an option for the kick reason
                .setDescription('The reason for the kick')
                .setRequired(false)), // Make this option optional

    // The execute function that runs when the command is used
    async execute(interaction) {
        // Check if the user executing the command has the permission to kick members
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {
            return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the target user and reason from the command interaction
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        // Prevent self-kick and kicking the bot itself
        if(user.id === interaction.user.id) {
            return await interaction.reply({ content: 'You cannot kick yourself.', ephemeral: true });
        }
        if(user.id === interaction.client.user.id) {
            return await interaction.reply({ content: 'I cannot kick myself.', ephemeral: true });
        }

        // Check if the target user is in the server and if they can be kicked
        if (!member) {
            return await interaction.reply({ content: `The user ${user.tag} is not in this server.`, ephemeral: true });
        }
        if (!member.kickable || interaction.member.roles.highest.position <= member.roles.highest.position) {
            return await interaction.reply({ content: `I cannot kick ${user.tag}. They might have a higher role than me or you.`, ephemeral: true });
        }

        // Execute the kick
        await member.kick(reason);
        // Confirm the kick to the command issuer
        await interaction.reply({ content: `Kicked ${user.tag}`, ephemeral: false });
    },
};