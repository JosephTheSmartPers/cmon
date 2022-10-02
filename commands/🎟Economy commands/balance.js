const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'balance',
    aliases: ["bal", "wallet", "bl"],
    cooldown: 0,
    permissions: [],
    description: 'Shows how much money you currently have!',
    usage: "-bal [@person]",
     async execute(message, args, cmd, client, discord, profileData){

 

            let target = message.mentions.users.first();
            if(!target) target = message.author
            let targetData = await profileModel.findOne({ userID: target.id});
                    if(!targetData) return message.reply(`No account found in the database for \`${target.tag}\``)

                    let balEmbed = new Discord.EmbedBuilder()
                    .setColor("#fff85f")
                    .setAuthor({name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true })})
                    .setTitle(`${target.tag}'s balance is...`)
                    .addFields(
                        {name: 'Wallet💰:', value: `${targetData.moniy}`},
                        {name: 'Bank🏦', value: `${targetData.banker}`}

                   )
                   .setFooter({text: `This dude: ${message.author.tag} scanned da balance!`})

            message.channel.send({embeds: [balEmbed]})

    },
};