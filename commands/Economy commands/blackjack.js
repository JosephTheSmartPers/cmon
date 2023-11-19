const Discord = require('discord.js')
const profileModel = require('../../models/profileSchema')
const mongoose = require('mongoose')
const ms = require('ms')
const blackjack = require("discord-blackjack");
module.exports = {
  name: 'blackjack',
  cooldown: 10,
  description: 'Gamble even more',
  usage: "blackjack <amount>",
  async execute(message, args, cmd, client, Discord, profileData) {
    const userData = await profileModel.findOne({ userID: message.author.id});
    let amount = args[0]
    
    if(!amount) return message.reply('bro you need to play with moniy💵.')
    if(amount == "max" || amount == "all") amount = userData.moniy
    if(amount < 100) return message.reply('You have to play with more than a 100 bucks💵')
    if(userData.moniy < amount) return message.reply('you dont even have that much moniy bro:x:.')
    const reward = amount * 2
    let game = await blackjack(message)
        
    switch (game.result) {
        
        case 'WIN':
            
            await profileModel.findOneAndUpdate({
                userID: message.author.id,},{$inc: { moniy: amount, }});
            break;
        case 'TIE':
           
            break;
        case 'LOSE':
            await profileModel.findOneAndUpdate({
                userID: message.author.id,},{$inc: { moniy: -amount, }});
            break;
        case 'DOUBLE WIN':
            await profileModel.findOneAndUpdate({
                userID: message.author.id,},{$inc: { moniy: 2 * reward, }});
            break;
        case 'DOUBLE LOSE':
            await profileModel.findOneAndUpdate({
                userID: message.author.id,},{$inc: { moniy: -reward, }});
            break;
        case 'ERROR':
            // do whatever you want
            break;
    }
  }
}