const hastebin = require('hastebin-gen');
const Discord = require("discord.js");

module.exports = {
    permissions: [],
    name: 'pastebin',
    aliases: [],
    cooldown: 0,
    description: "Upload text to a pastebin site",
    usage: 'pastebin <text>',
    execute(message,args, cmd, client, discord, profileData){
let haste = args.slice(0).join(" ")

        let type = args.slice(1).join(" ")

        if (!args[0]) { return msg.channel.send("What do you want to post in Hastebin?") }

        hastebin(haste).then(r => {
const embed = new Discord.MessageEmbed()
            .setTitle(`📁Posted to Hastebin at this URL`)
            .setURL(r)
message.channel.send({embeds: [embed]})
        })

        message.delete();
    }
}