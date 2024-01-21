const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	// Define the command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
        .setName('dice') // Set the command name
        .setDescription('Roll a dice.') // Set the description
        // Add an integer option for the number of dice to roll
        .addIntegerOption(option => 
            option.setName('dice')
                .setDescription('How many dice would you like to roll?')
                .setRequired(true)), // Make this option required

    // The execute function that runs when the command is used
    async execute(interaction) {
        // Retrieve the number of dice to roll from the command interaction
        const numDice = interaction.options.getInteger('dice');
        
        // Initialize an array to store the results of each dice roll
        var results = [];
        for (var i = 0; i < numDice; i++) {
            // Generate a random number between 1 and 6 for each dice roll
            var roll = Math.floor(Math.random() * 6) + 1;
            results.push(roll);
        }
        
        // Create a response string showing individual roll results and the total
        var response = `You rolled ${results.join(', ')} for a total of ${results.reduce((a, b) => a + b, 0)}!`;
        
        // Reply to the interaction with the dice roll results
        await interaction.reply(response);
    },
};