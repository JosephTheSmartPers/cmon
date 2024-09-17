const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");

module.exports = {
    name: 'pay',
    aliases: [],
    cooldown: 0,
    description: 'Give someone moniey',
    usage: 'pay <@person> <amount>',
    async execute(message, args, cmd, client, discord, profileData){
       const target = message.mentions.users.first();
       let amount = args[1];
       const user = message.author
       const userData = await profileModel.findOne({ userID: user.id});
       const targetdata = await profileModel.findOne({ userID: target.id})
       if(!amount) return message.reply("Ayo how much money you wanna give "+ target.username)
       if(amount == "all" || amount == "max") amount = userData.moniy
        amount = parseInt(amount)

        async function pay(person, amount){
           await profileModel.findOneAndUpdate({
                userID: person,
                },
                { $inc: {
                    moniy: amount,
                },
           });
        }

        pay(user.id, amount * -1)
        pay(target.id, amount)

        const withEmbed = new Discord.EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`💵Succesfully given ${amount} moniy to ${target.tag}`)
            .setFooter({text: target.tag, iconURL: target.displayAvatarURL({ dynamic: true})})
        message.channel.send({embeds: [withEmbed]});
        
    },
};