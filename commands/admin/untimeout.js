//timesout a user
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout') // Set the command name
        .setDescription('Unimeout a member') // Set the description
        .addUserOption(option => 
            option.setName('target') // Define an option to select the user to untimeout
                .setDescription('The member to untimeout')
                .setRequired(true)), // Make this option required

    // The execute function that runs when the command is used
    async execute(interaction) {
        // Get the target user from the command interaction
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);

        // Check if the user executing the command has the permission to untimeout members
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            await interaction.reply('You do not have permission to untimeout members.');
            return;
        }

        // Additional checks to ensure the target member is in the server and can be untimed out
        if (!member){
            await interaction.reply('This user is not in the server.');
            return;
        }
        if (member.id === interaction.member.id){
            await interaction.reply('You cannot untimeout yourself.');
            return;
        }
        
        // Check if the bot has permissions to untimeout the member
        if (!member.kickable) {
            await interaction.reply({ content: 'I am not timed out.', ephemeral: true });
            return;
        }
        
        // Execute the untimeout (removal of timeout)
        await member.timeout(null); // Passing null removes the timeout
        // Confirm the removal of the timeout to the command issuer
        await interaction.reply({ content: `Removed timeout for ${user.tag}`, ephemeral: true });
    }
};