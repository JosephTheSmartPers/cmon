const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");

module.exports = {
    name: 'labour',
    aliases: ['blm'],
    cooldown: 40,
    permissions: [],
    description: 'Do some labour',
    usage: "labour",
    async execute(message, args, cmd, client, discord, profileData){


        const userData = await profileModel.findOne({ userID: message.author.id});

        const bmoniy = Math.floor(Math.random() * 300) + 1;


        const result = Math.floor(Math.random() * 10) + 1;
        if(result == 9){
            const bremebed = new Discord.EmbedBuilder()
            .setColor('RED')
              .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setTitle(`You kinda passed out from the labour, you aint getting money.`)
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
    .setTitle(`You did some labour and you got ${bmoniy} moniy!`)

    return message.channel.send({embeds: [broomEmbed]});
        }
    },
};