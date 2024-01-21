const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The member to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {
            return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        if(user.id === interaction.user.id) {
            return await interaction.reply({ content: 'You cannot kick yourself.', ephemeral: true });
        }

        //if trying to kick the bot
        if(user.id === interaction.client.user.id) {
            return await interaction.reply({ content: 'I cannot kick myself.', ephemeral: true });
        }

        if (!member) {
            return await interaction.reply({ content: `The user ${user.tag} is not in this server.`, ephemeral: true });
        }

        if (!member.kickable || interaction.member.roles.highest.position <= member.roles.highest.position) {
            return await interaction.reply({ content: `I cannot kick ${user.tag}. They might have a higher role than me or you.`, ephemeral: true });
        }

        await member.kick(reason);
        await interaction.reply({ content: `Kicked ${user.tag}`, ephemeral: false });
    },
};
