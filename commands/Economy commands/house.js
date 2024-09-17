const Discord = require('discord.js')
const profileModel = require('../../models/profileSchema')
const mongoose = require('mongoose')
const ms = require('ms')
module.exports = {
  name: 'house',
  cooldown: 0,
  description: 'Buy or sell a house',
  usage: "house help `for more help`",
  async execute(message, args, cmd, client, Discord, profileData) {
    let houses = [
      {house2: "shack", house: ":hut:shack", pay: 700, price: 2000, upper: ":hut:Shack"},
      {house2: "tent", house: "⛺tent", pay: 200, price: 1000, upper: "⛺Tent"},
      {house2: "flat", house: "🏬flat", pay: 1000, price: 4000, upper: "🏬Flat"},
      {house2: "house", house: "🏡house", pay: 2000, price: 10000, upper: "🏡House"},
      {house2: "modernhouse", house: "<:moderhouse:851898817447329803>modern house", pay: 2500, price: 20000, upper: "<:moderhouse:851898817447329803>Modern House"},
      {house2: "mansion", house: "🏰mansion", pay: 8000, price: 100000, upper: "🏰Mansion"},
      {house2: "minibus", house: "🚐minibus", pay: 1100, price: 5000, upper: "🚐Minibus"},
      {house2: "osaka", house: "🏯osaka", pay: 10000, price: 200000, upper: "🏯Osaka"},
      {house2: "island", house: "🏝️island", pay: 50000, price: 1000000, upper: "🏝️Island"},
    ]
    if(args[0] == "help"){
      const helpEmbed = new Discord.EmbedBuilder()
      .setTitle("Here are the commands you can do with `house`")
      .addFields(
                {name: "house buy <house>", value: "Buy a house that you want."},
                {name: "house list", value: "Sends a list of houses."},
                {name: "house sell", value: "Sell your house for not the same moniy you got it for."},
                {name: "house", value: "Shows info about your current house."}
                )
      .setColor("Green")
      message.channel.send({embeds: [helpEmbed]})
      return
    }

    async function embeder(house2, house, pay, price){
        if(targetData.moniy < price) return message.reply(`You dont have enough moniy to buy a ${house} (its ${price} moniy):x:`)
        houseobj = {
          house: house2,
          pay: pay,
          price: price,
              }
        await profileModel.findOneAndUpdate({userID: message.author.id,}, 
          {$set: {house: houseobj,},
        }); 
        
                    await profileModel.findOneAndUpdate({
                      userID: message.author.id,},{$inc: { moniy: -price, }});
                    const embed = new Discord.EmbedBuilder()
                    .setTitle(`You bought a ${house2}!`)
                    .setDescription(`You bought a nice little ${house}, now you can finnaly work!\nYour sallary is ${pay} moniy`)
                    .setColor("Green")
                    message.channel.send({embeds: [embed]})
    }

    const targetData = await profileModel.findOne({ userID: message.author.id});
    const house = args[1]
   const thouse = targetData.house

    if(args[0] == 'buy'){
      if(thouse.house && thouse.house != "none")return message.reply("You already have house, do `-house sell` if you wan't to sell it, than buy a new one!")
      houses.forEach(x=>{
        if(x.house2 == args[1]) embeder(x.house2, x.house, x.pay, x.price)
        return
      })
    if(houses.filter(x=> x.house2 === args[1]) == "") return message.reply(`There is no such house as \`${args[1] || " "}\` do \`-house list\``)

  } // no delete

  if(args[0] == 'list'){
    const seembed = new Discord.EmbedBuilder()
    .setTitle('All the houses you can buy.')
    .setDescription('If you buy a house you can use the **-work** command the better the house the better the sallary!')
    .setColor("Green")
    .addFields(houses.map(h=>{
      return{
        name: `${h.upper}`,
        value: `**Price:** ${h.price} moniy\n**Sallary:** ${h.pay} moniy`,
        inline: true,
      }
    }))
    message.channel.send({embeds: [seembed]})
  }

  if(!args[0]){
    let housename = ""
    let sallary = 0
    if(!thouse || thouse.house == "none") return message.reply('You dont have a house.:x:')
const dhouse = thouse.house
houses.forEach(h=>{
  if(dhouse == h.house2){
    housename = h.upper
    sallary = h.pay
  }
})
const etfembed = new Discord.EmbedBuilder()
.setTitle('This is your house.')   
.setDescription(`You have a ${housename}, your sallary is ${sallary.toString()}$.`)
.setColor("Green")
message.channel.send({embeds: [etfembed]})

  } 
  if(args[0] == 'sell'){
    
    if(!thouse) return message.reply('You dont have a house.:x:')
const dhouse = thouse.house
if(dhouse == 'none') return message.reply('You dont have a house.:x:')
let sellingPrice = 0
let housen = ""

houses.forEach(h=>{
  if(dhouse == h.house2){
    sellingPrice = h.price * 0.7
    housen = h.upper
  }
})
  houseobj = {
    house: 'none',
    pay: 0,
         }
  await profileModel.findOneAndUpdate({userID: message.author.id,}, 
    {$set: {house: houseobj,},
  }); 
         await profileModel.findOneAndUpdate({
          userID: message.author.id,},{$inc: { moniy: sellingPrice, }});
  const etfembed = new Discord.EmbedBuilder()
.setTitle('You sold your house.')   
.setDescription(`You sold your ${housen} for ${sellingPrice}💵.`)
.setColor("Green")
message.channel.send({embeds: [etfembed]})
  }
  if(args[0]){
    if(args[0] !== 'sell' && args[0] !=='buy' && args[0] !== 'list') return message.reply('use \`-house sell`\ , \`-house buy`\ , \`-house list`\ or \`-house (see what house u have rn.)`\ ')
  } 

  }
}