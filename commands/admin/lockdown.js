const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockdown') // Set the command name
        .setDescription('Lockdown a channel or all channels') // Set the description
        .addChannelOption(option => 
            option.setName('channel') // Define an option to select a specific channel to lockdown
                .setDescription('The channel to lockdown')
                .setRequired(false)), // Make this option optional

    // The execute function that runs when the command is used
    async execute(interaction) {
        // Check if the user executing the command has the permission to manage channels
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
            return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the target channel from the command interaction or default to the current channel
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        // If a specific channel is targeted, lockdown that channel
        if (channel === interaction.channel) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
            await interaction.reply(`Locked down ${channel}`);
        } else {
            // If no specific channel is targeted, lockdown all text channels in the guild
            const channels = interaction.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT');
            channels.forEach(ch => ch.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false }));
            await interaction.reply('Locked down all channels');
        }
    },
};