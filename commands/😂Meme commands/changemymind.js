const canvacord = require('canvacord');
const Discord = require('discord.js');
const { changemymind } = require('canvacord');

module.exports = {
    name: "changemymind",
    description: "Change my mind meme",
    aliases: ["chmm", "cmm"],
    cooldown: 0,
    permissions: [],
    usage: "cmm <text>",

    async execute(message,args, cmd, client, Discord, profileData) {

        let text = args.join(" ");

        if(!args[0]) return message.channel.send('Provide a valid HEX code (#FF0000)');

        let image = await canvacord.Canvas.changemymind(text);

        let changeMyMind = new Discord.MessageAttachment(image, "cmm.png")

        message.channel.send({ files: [changeMyMind]});
    }
}
