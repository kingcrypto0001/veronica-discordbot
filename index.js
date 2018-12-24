const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const path = require("path");
const sqlite = require("sqlite");
const cleverbotmodule = require("cleverbot.io");

const Config = require("./config.json");
const cleverbot = new cleverbotmodule("aGL6G3zqGMsyA3Wk", "6xwKVdrekVooNxbeNzmbnOwb3dX2RlRO", "discordbot");
const cleverbot_sessionname = "veronica-bot";


cleverbot.setNick(cleverbot_sessionname)

const client = new CommandoClient({
	commandPrefix: Config.prefix,
	owner: Config.owners, 
	disableEveryone: true,
	unknownCommandResponse: false
});

cleverbot.create(function (err, session) {});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1', 'Our First Command Grcoup']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready", async () => {
	console.log("Bot ready!")
});

client.on("message", async (message) => {
	if (message.author.id == client.user.id) return;
	if (!message.content.startsWith(Config.prefix)){
		if (message.mentions.users.first() && message.mentions.users.first().id == client.user.id){
			console.log(message.mentions.users.first())
			message.channel.startTyping()
			cleverbot.create(function (err, cleverbot_sessionname) {
				cleverbot.ask(message.content, function (err, res) {
					message.channel.send(res);
				});
			});	
			message.channel.stopTyping()
		};
	} else return;
});

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
});


client.login(process.env.BOT_TOKEN);