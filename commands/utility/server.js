const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),

    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run
        // Get the owner ID
        const ownerId = interaction.guild.ownerId;

        // Fetch the owner information
        const owner = await interaction.guild.members.fetch(ownerId);
        //List server owner, members, roles, category channels, text channels, voice channels and list of roles
        await interaction.reply(`Server Owner: ${owner.user.username}\n
        Server Members: ${interaction.guild.memberCount}\n
        Server Roles: ${interaction.guild.roles.cache.map(role => role.name).join(", ")}\n
        Server Categories: ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').map(channel => channel.name).join(", ")}\n
        Server Text Channels: ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').map(channel => channel.name).join(", ")}\n
        Server Voice Channels: ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').map(channel => channel.name).join(", ")}\n
        Server Roles: ${interaction.guild.roles.cache.map(role => role.name).join(", ")}`
        );
    },
    };