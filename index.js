const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Loads TOKEN from the .env file into process.env
require('dotenv').config();

// Create a new Discord client instance with specific intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a new collection to store bot commands
client.commands = new Collection();

// Construct the path to the commands directory
const foldersPath = path.join(__dirname, 'commands');

// Read all folders within the commands directory
const commandFolders = fs.readdirSync(foldersPath);

// Iterate over each folder in the commands directory
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct the path to the events directory
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Iterate over each event file and register them with the client
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with the token from the environment variables
client.login(process.env.TOKEN);