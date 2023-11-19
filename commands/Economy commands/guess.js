const Discord = require('discord.js')
const profileModel = require('../../models/profileSchema')
const mongoose = require('mongoose')

module.exports = {
  name: 'guess',
  cooldown: 60,
  description: 'Guess a number between 1 and 100.',
  usage: "guess <number>",
  async execute(message, args, cmd, client, Discord, profileData) {
   const number = Math.floor(Math.random() * 100) + 1;
 
    const guess = args[0]
if(!guess) return message.reply('You have to specify a number between 1 and 100 and it might just be the correct one.:1234:')
if(number == guess){
            const sembed = new Discord.EmbedBuilder()
            .setTitle('YOU WON!!')
            .setDescription(`You guessed the correct number (${number}), and you won 💰70000 moniy, congrats!`)
            .setColor('#ffc100')
            message.channel.send({embeds: [sembed]})
            await profileModel.findOneAndUpdate({
                userID: message.author.id,
            },
            {
                $inc: {
                    moniy: 70000,
                }
            }
            );
        } else{

            const fembed = new Discord.EmbedBuilder()
            .setTitle('You didnt guess correctly :x:')
            .setDescription(`The correct number was **${number}**, but you guessed **${guess}**, I mean you had a 1% chance you won so not that bad ( :`)
            .setColor('Red')
            message.channel.send({embeds: [fembed]})
        }
  }
}