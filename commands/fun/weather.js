const { SlashCommandBuilder } = require('@discordjs/builders');
const weather = require('weather-js'); // For fetching weather data

module.exports = {
    // Define the command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
        .setName('weather') // Set the name of the command
        .setDescription('Get the current weather for a specific location') // Set the description
        .addStringOption(option => 
            option.setName('location') // Define a string option for the location
                .setDescription('The location to get the weather for')
                .setRequired(true)), // Make this option required

    // The execute function is called when the command is invoked
    async execute(interaction) {
        // Get the location string from the command options
        const location = interaction.options.getString('location');

        // Use the weather-js module to find weather data for the specified location
        weather.find({search: location, degreeType: 'C'}, function(err, result) {
            // Handle any errors that occur during the fetch
            if(err) {
                console.log(err);
                interaction.reply('There was an error while executing this command!');
            } else {
                // Extract current weather data from the result
                const currentWeather = result[0].current;
                // Send a reply with the current temperature and sky conditions
                interaction.reply(`The current temperature in ${location} is ${currentWeather.temperature}°C and the sky is ${currentWeather.skytext}`);
            }
        });
    },
};
