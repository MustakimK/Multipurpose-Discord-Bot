//timesout a user
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    // Define the command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
        .setName('timeout') // Set the command name
        .setDescription('Timeout a member') // Set the description
        .addUserOption(option => 
            option.setName('target') // Define an option to select the user to timeout
                .setDescription('The member to timeout')
                .setRequired(true))
        .addStringOption(
            option => option.setName('duration') // Define an option for the duration of the timeout
                .setRequired(true)
                .setDescription('The duration of the timeout')
                .addChoices( // Predefined choices for duration
                    {name: '1 minute', value: '60'},
                    {name: '5 minute', value: '300'},
                    {name: '10 minute', value: '600'},
                    {name: '30 minute', value: '1800'},
                    {name: '1 hour', value: '3600'},
                    {name: '1 day', value: '86400'},
                    {name: '1 week', value: '604800'}
                ))
        .addStringOption(
            option => option.setName('reason') // Define an option for the reason of the timeout
                .setDescription('The reason for the timeout')
                .setRequired(false)),

    // The execute function that runs when the command is used
    async execute(interaction) {
        // Get the target user, duration, and reason from the command interaction
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getString('duration');

        // Check if the user executing the command has the permission to timeout members
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            await interaction.reply('You do not have permission to timeout members.');
            return;
        }

        // Additional checks to ensure the target member is in the server and can be timed out
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

        // Get reason to set a default one
        let reason = interaction.options.getString('reason') || 'No reason provided';

        // Convert duration string to an integer and calculate the timeout duration in milliseconds
        let durationint = parseInt(duration) * 1000;
        // Execute the timeout with the specified duration and reason
        await member.timeout(durationint, reason);
        // Confirm the timeout to the command issuer
        await interaction.reply({ content: `Timed out ${user.tag}`, ephemeral: true });
    }
};