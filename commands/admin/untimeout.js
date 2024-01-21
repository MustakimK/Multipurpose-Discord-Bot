//timesout a user
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('Unimeout a member')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The member to timeout')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getString('duration');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            await interaction.reply('You do not have permission to untimeout members.');
            return;
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply('You do not have permission to untimeout members.');
            return;
        }

        if (!member){
            await interaction.reply('This user is not in the server.');
            return;
        }

        if (member.id === interaction.member.id){
            await interaction.reply('You cannot untimeout yourself.');
            return;
        }
        
        if (!member.kickable) {
            await interaction.reply({ content: 'I am not timed out.', ephemeral: true });
            return;
        }
        
        await member.timeout(null);
        await interaction.reply({ content: `Removed timeout for ${user.tag}`, ephemeral: true });
    }
};