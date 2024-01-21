//timesout a user
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a member')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The member to timeout')
                .setRequired(true))
        .addStringOption(
            option => option.setName('duration')
                .setRequired(true)
                .setDescription('The duration of the timeout')
                .addChoices(
                    {name: '1 minute', value: '60'},
                    {name: '5 minute', value: '300'},
                    {name: '10 minute', value: '600'},
                    {name: '30 minute', value: '1800'},
                    {name: '1 hour', value: '3600'},
                    {name: '1 day', value: '86400'},
                    {name: '1 week', value: '604800'}
                ))
        .addStringOption(
            option => option.setName('reason')
                .setDescription('The reason for the timeout')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getString('duration');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            await interaction.reply('You do not have permission to timeout members.');
            return;
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply('You do not have permission to timeout members.');
            return;
        }

        if (!member){
            await interaction.reply('This user is not in the server.');
            return;
        }

        if (member.id === interaction.member.id){
            await interaction.reply('You cannot timeout yourself.');
            return;
        }
        
        if (!member.kickable) {
            await interaction.reply({ content: 'I cannot timeout this user.', ephemeral: true });
            return;
        }
        
        let reason = interaction.options.getString('reason') || 'No reason provided';
        let durationint = parseInt(duration) * 1000
        await member.timeout(durationint, reason);
        await interaction.reply({ content: `Timed out ${user.tag}`, ephemeral: true });
    }
};