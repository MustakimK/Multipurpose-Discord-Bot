const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockdown')
        .setDescription('Lockdown a channel or all channels')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to lockdown')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
            return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel') || interaction.channel;

        if (channel === interaction.channel) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
            await interaction.reply(`Locked down ${channel}`);
        } else {
            const channels = interaction.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT');
            channels.forEach(ch => ch.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false }));
            await interaction.reply('Locked down all channels');
        }
    },
};
