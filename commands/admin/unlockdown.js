const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlockdown')
        .setDescription('Unlock a channel or all channels')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to Unlock')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
            return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel') || interaction.channel;

        if (channel === interaction.channel) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
            await interaction.reply(`Unlocked ${channel}`);
        } else {
            const channels = interaction.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT');
            channels.forEach(ch => ch.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true }));
            await interaction.reply('Unlocked all channels');
        }
    },
};
