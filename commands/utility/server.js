const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
  .setName('server') // Set the name of the command
  .setDescription('Provides information about the server.'), // Set the description

  // The execute function is called when the command is invoked
  async execute(interaction) {
      // Fetch and store the server's owner ID
      const ownerId = interaction.guild.ownerId;
      const owner = await interaction.guild.members.fetch(ownerId);

      // Construct and send a response containing various server information
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