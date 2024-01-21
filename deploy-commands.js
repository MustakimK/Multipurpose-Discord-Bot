const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Load environment variables from .env file
require('dotenv').config();

const commands = []; // Array to hold command data
const foldersPath = path.join(__dirname, 'commands'); // Path to commands
const commandFolders = fs.readdirSync(foldersPath); // Read all folders within the commands directory

// Iterate over each folder in the commands directory and import the commands
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Create a new REST client instance and set the bot token
const rest = new REST().setToken(process.env.TOKEN);

// Asynchronous function to register the commands
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Make a PUT request to the Discord API to set the commands globally
		const data = await rest.put(
            Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();