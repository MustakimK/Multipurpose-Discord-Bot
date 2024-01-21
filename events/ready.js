const { Events } = require('discord.js');

// Ready event handler
module.exports = {
	// The name property is set to the ClientReady event which is triggered when the client becomes ready to start working
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};