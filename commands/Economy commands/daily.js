const ms = require('ms');

const profileModel = require("../../models/profileSchema");

const Discord = require('discord.js')

module.exports = {
    name: "daily",
    description: "Receive a daily award of money",
    cooldown: 10,
    aliases: [],
    permissions: [],
    usage: "daily",
    async execute(message,args, cmd, client, Discord, profileData) {
        
        let user = message.author;
        let timeout = 86400000;
        let amount = 500
        const userData = await profileModel.findOne({ userID: user.id});
        let author = userData.daily
        if(!userData || !userData.house) return message.reply("You don't have a house bro.")
        if(author !== null && timeout - (Date.now() - author) > 0){
            const time = ms(timeout - (Date.now() - author));
            const tembed = new Discord.EmbedBuilder()
            .setTitle('Heyo, you still cant claim your daily!')
            .setDescription(`You can claim for another \`${time}\``)
            .setColor('fff85f')
            return message.channel.send({embeds: [tembed]})
        } else{
            if(userData.house.pay) amount = userData.house.pay * 1.5
        
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, 
            {
                $inc: {
                    moniy: amount,
                }

            }
            );
            await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, 
            {
                $set: {
                    daily: Date.now(),
                }
                
            }
            );
            const dailyEmbed = new Discord.EmbedBuilder()
            .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor('#fff85f')
            .setTitle(`You just got your daily reward!💰`)
             .setFooter({text: `Which is ${amount} moniy! Come back every day for more📆!`})
            message.channel.send({embeds: [dailyEmbed]});

        }
    }
}
