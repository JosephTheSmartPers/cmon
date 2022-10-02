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

        const target = message.mentions.users.first();
        if(target){
            let targetavatar = target.displayAvatarURL({dynamic: false, format: "png"});

            let image1 = await canvacord.Canvas.trigger(targetavatar);

            let triggered1 = new Discord.MessageAttachment(image1, "triggered.gif")

            message.channel.send(triggered1);
        

        
        }else{
        let avatar = message.author.displayAvatarURL({dynamic: false, format: "png"});

        let image = await canvacord.Canvas.trigger(avatar);

        let triggered = new Discord.MessageAttachment(image, "triggered.gif")

        message.channel.send(triggered);
        }
    }
}