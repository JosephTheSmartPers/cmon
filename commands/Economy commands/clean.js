const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");

module.exports = {
    name: 'clean',
    aliases: ['broom'],
    cooldown: 40,
    permissions: [],
    description: 'Clean something for some moniy',
    usage: "clean",
    async execute(message, args, cmd, client, discord, profileData){

           
        const userData = await profileModel.findOne({ userID: message.author.id});

        if(userData.inv.broom == 0) return message.reply('you dont have a broom.')

        const bmoniy = Math.floor(Math.random() * 100) + 100;

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
        let result = Math.floor(Math.random() * 10) + 1;
        if(result == 9){
            const bremebed = new Discord.EmbedBuilder()
                .setColor('Red')
                .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                .setTitle(`Your broom broke... You must be sad rn ):`)
            buytem(message.author.id, 1, "broom")
            return message.channel.send({embeds: [bremebed]});

        } else{
        await profileModel.findOneAndUpdate({

            userID: message.author.id
            }, {
                $inc: {
            moniy: bmoniy,
                },
        }
        );
    const broomEmbed = new Discord.EmbedBuilder()
    .setColor('#fff85f')
    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setTitle(`Succesfully got some moniy (${bmoniy})`)

    return message.channel.send({embeds: [broomEmbed]});
        }
    },
};