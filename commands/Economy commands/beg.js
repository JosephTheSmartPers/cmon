const Discord = require('discord.js')

const guildModel = require('../../models/guildSchema')

const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'memoney',
    aliases: ["beg", "plsmoni", "plsmoniy"],
    cooldown: 30,
    permissions: ["SPEAK"],
    description: 'Beg for moniy (get rich)',
    usage: "beg",
    async execute(message, args, cmd, client, discord, profileData){
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, 
        {
            $inc: {
                moniy: randomNumber,
            }
        }
        );

        const begEmbed = new Discord.EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setTitle(`You just got ${randomNumber} moniy!:coin:`)
        message.channel.send({embeds: [begEmbed]});

    },
};