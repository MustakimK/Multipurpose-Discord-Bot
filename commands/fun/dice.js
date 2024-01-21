const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Roll a dice.')
        .addIntegerOption(option => 
            option.setName('dice')
                .setDescription('How many dice would you like to roll?')
                .setRequired(true)),
        async execute(interaction) {
            const numDice = interaction.options.getInteger('dice');
            
            var results = [];
            for(var i = 0; i < numDice; i++) {
                var roll = Math.floor(Math.random() * 6) + 1;
                results.push(roll);
            }
            
            var response = `You rolled ${results.join(', ')} for a total of ${results.reduce((a, b) => a + b, 0)}!`;
            
            await interaction.reply(response);
        },
};
