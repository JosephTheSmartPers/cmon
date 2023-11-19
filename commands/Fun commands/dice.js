const Discord = require('discord.js')
const profileModel = require('../../models/profileSchema')
const mongoose = require('mongoose')

module.exports = {
  name: 'dice',
  cooldown: 5,
  aliases: ["roll"],
  description: 'Roll a Dice',
  usage: "roll",
  async execute(message, args, cmd, client, Discord, profileData) {
    const number = Math.floor(Math.random() * 6) + 1;
    var dice = []
    if(number === 1) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169763806806036/1.PNG')
    if(number === 2) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169766872842260/2.PNG')
    if(number === 3) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169769348136991/3.PNG')
    if(number === 4) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169771624988722/4.PNG')
    if(number === 5) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169773696843806/5.PNG')
    if(number === 6) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169778218827776/6.PNG')
    const embed = new Discord.EmbedBuilder()
    .setTitle('Lets see your number🎲...')
    .setImage(dice.join(""))
    message.delete
    message.channel.send({embeds: [embed]})
  }
}