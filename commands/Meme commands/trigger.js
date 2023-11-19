const canvacord = require('canvacord');
const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
    name: "trigger",
    description: "Trigger someone",
    aliases: [],
    cooldown: 0,
    permissions: [],
    usage: "trigger <@person>",

    async execute(message,args, cmd, client, Discord, profileData) {

        let target = message.mentions.users.first() || message.author;

            let targetavatar = target.displayAvatarURL({dynamic: false, format: "png"});

            let image1 = await canvacord.Canvas.trigger(targetavatar);

            let triggered1 = await new Discord.AttachmentBuilder(image1, "triggered.gif")

            message.channel.send({files: [triggered1]});
    }
}