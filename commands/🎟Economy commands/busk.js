const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");

module.exports = {
    name: 'busk',
    aliases: ['guitar'],
    cooldown: 30,
    permissions: [],
    description: 'Play your guitar for some moniy.',
    usage: "busk",
    async execute(message, args, cmd, client, discord, profileData){

        const user = message.author
        const userData = await profileModel.findOne({ userID: message.author.id});

        if(userData.inv.guitar == 0) return message.reply('u dont have a guitar my man.')
        const gmoniy = Math.floor(Math.random() * 500) + 500;
        async function buytem(person, itemAmount, path){
            let inv = userData.inv
            let current = parseInt(inv[path])
            inv[path] = current - itemAmount
    
            await profileModel.findOneAndUpdate({
                userID: person
                }, {
                    $set: {
                inv: inv,
                    },
            }
            );
        }
        let result = Math.floor(Math.random() * 20) + 1;
            if(result == 9){
                const bremebed = new Discord.EmbedBuilder()
                .setColor('Red')
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`Your guitar broke and everyone laughed at you.`)
                buytem(message.author.id, 1, "guitar")
                return message.channel.send({embeds: [bremebed]});

            } else{
                try{
        await profileModel.findOneAndUpdate({
    
            userID: message.author.id
            }, {
                $inc: {
            moniy: gmoniy,
                },
        }
        );
    }catch(err){
        return
    }
        const guitarEmbed = new Discord.EmbedBuilder()
        .setColor('#fff85f')
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
        .setTitle(`Succesfully played on the streets and u got ${gmoniy}!`)
    
        return message.channel.send({embeds: [guitarEmbed]});
    }
    },
};