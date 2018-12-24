const { Command } = require('discord.js-commando');


module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ["echo"],
            group: 'group1',
            memberName: 'say',
            description: 'Replies with a Message.',
            examples: ['say'],
            throttling: {
            	usages: 2,
            	duration: 490
            },
            guildOnly: true,
            clientPermissions: ["MANAGE_MESSAGES"],
            args: [
		        {
		            key: 'text',
		            prompt: 'What text would you like the bot to say?',
		            type: 'string',
		            validate: text => {
		            	if (text.length < 10) return true;
		            	return "Message Content is over 10 characters";
		            }
		        }
   			]
        });
    }

    run(msg, { text }) {
    	msg.delete();
    	return msg.say(text);
    }
};