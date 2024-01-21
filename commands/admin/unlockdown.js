const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlockdown') // Set the command name
        .setDescription('Unlock a channel or all channels') // Set the description
        .addChannelOption(option => 
            option.setName('channel') // Define an option to select a specific channel to unlock
                .setDescription('The channel to Unlock')
                .setRequired(false)), // Make this option optional

    // The execute function that runs when the command is used
    async execute(interaction) {
        // Check if the user executing the command has the permission to manage channels
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
            return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the target channel from the command interaction or default to the current channel
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        // If a specific channel is targeted, unlock that channel
        if (channel === interaction.channel) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
            await interaction.reply(`Unlocked ${channel}`);
        } else {
            // If no specific channel is targeted, unlock all text channels in the guild
            const channels = interaction.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT');
            channels.forEach(ch => ch.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true }));
            await interaction.reply('Unlocked all channels');
        }
    },
};
