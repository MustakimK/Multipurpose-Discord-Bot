const { SlashCommandBuilder } = require('@discordjs/builders');
const weather = require('weather-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the current weather for a specific location')
        .addStringOption(option => 
            option.setName('location')
                .setDescription('The location to get the weather for')
                .setRequired(true)),
    async execute(interaction) {
        const location = interaction.options.getString('location');

        weather.find({search: location, degreeType: 'C'}, function(err, result) {
            if(err) {
                console.log(err);
                interaction.reply('There was an error while executing this command!');
            } else {
                const currentWeather = result[0].current;
                interaction.reply(`The current temperature in ${location} is ${currentWeather.temperature}°C and the sky is ${currentWeather.skytext}`);
            }
        });
    },
};
