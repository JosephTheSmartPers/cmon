const Discord = require('discord.js')
const profileModel = require('../../models/profileSchema')
const mongoose = require('mongoose')
const ms = require('ms')
module.exports = {
  name: 'vehicle',
  aliases: ["veh"],
  cooldown: 0,
  description: 'Vehicles are very cool!',
  usage: "vehicle help `for more help`",
  async execute(message, args, cmd, client, Discord, profileData) {
    let houses = [
      {smallVeh: "bike", vehicle: "🚲bike", minutes: 90, price: 500, upper: "🚲Bike"},
      {smallVeh: "bus", vehicle: "🚌bus", minutes: 80, price: 600, upper: "🚌Bus"},
      {smallVeh: "car", vehicle: "🚗car", minutes: 70, price: 2000, upper: "🚗Car"},
      {smallVeh: "train", vehicle: "🚃Train", minutes: 60, price: 2500, upper: "🚃Train"},
      {smallVeh: "horse", vehicle: "🐎horse", minutes: 50, price: 5000, upper: "🐎Horse"},
      {smallVeh: "racecar", vehicle: "🏎️racecar", minutes: 40, price: 10000, upper: "🏎️Racecar"},
      {smallVeh: "speedboat", vehicle: "🚤speedboat", minutes: 30, price: 50000, upper: "🚤Speedboat"},
      {smallVeh: "plane", vehicle: "✈️plane", minutes: 20, price: 200000, upper: "✈️Plane"},
      {smallVeh: "rocket", vehicle: "🚀rocket", minutes: 15, price: 20000000, upper: "🚀Rocket"},
    ]
    if(args[0] == "help"){
      const helpEmbed = new Discord.EmbedBuilder()
      .setTitle("Here are the commands you can do with `house`")
      .addFields(
            {name: "vehicle buy <vehicle>", value: "Buy a vehicle that you want."},
            {name: "vehicle list", value: "Sends a list of vehicles."},
            {name: "vehicle sell", value: "Sell your vehicle for not the same moniy you got it for."},
            {name: "vehicle", value: "Shows info about your current vehicle."}
            )
      .setColor("Green")
      message.channel.send({embeds: [helpEmbed]})
      return
    }

    async function embeder(veh2, veh, minutes, price){
        if(targetData.moniy < price) return message.reply(`You dont have enough moniy to buy a ${veh} (its ${price} moniy):x:`)
        vehObj = {
          veh: veh2,
          min: minutes,
          price: price,
              }
        await profileModel.findOneAndUpdate({userID: message.author.id,}, 
          {$set: {veh: vehObj,},
        }); 
        
                    await profileModel.findOneAndUpdate({
                      userID: message.author.id,},{$inc: { moniy: -price, }});
                    const embed = new Discord.EmbedBuilder()
                    .setTitle(`You bought a ${veh2}!`)
                    .setDescription(`You bought a nice little ${veh}, now you can finnaly work!\nYour work cooldown is ${minutes} minutes`)
                    .setColor("Green")
                    message.channel.send({embeds: [embed]})
    }

    const targetData = await profileModel.findOne({ userID: message.author.id});
    const house = args[1]
   let tveh = targetData.veh || "none"
    
    if(args[0] == 'buy'){
      
      if(tveh.veh && tveh.veh != "none")return message.reply("You already have vehicle, do `-veh sell` if you wan't to sell it, than buy a new one!")
      houses.forEach(x=>{
        if(x.smallVeh == args[1]) embeder(x.smallVeh, x.vehicle, x.minutes, x.price)
        return
      })
    if(houses.filter(x=> x.smallVeh === args[1]) == "") return message.reply(`There is no such vehicle as \`${args[1]}\` do \`-house list\``)

  } // no delete

  if(args[0] == 'list'){
    const seembed = new Discord.EmbedBuilder()
    .setTitle('All the vehicles you can buy.')
    .setDescription('If you buy a vehicle you can have a lower cooldown for the **-work** command the better the vehicle the lower the timeout!')
    .setColor("Green")
    .addFields(houses.map(h=>{
      return{
        name: `${h.upper}`,
        value: `**Price:** ${h.price} moniy\n**Cooldown:** ${h.minutes} minutes`,
        inline: true,
      }
    }))
    message.channel.send({embeds: [seembed]})
  }

  if(!args[0]){
    let housename = "🚶Legs"
    let sallary = 0
    let timeout = "100"
    if(!tveh || tveh.veh == "none" || !tveh.veh){
      housename = "🚶Legs"
      timeout = "100"
    }
const dhouse = tveh.veh
houses.forEach(h=>{
  if(dhouse == h.smallVeh){
    housename = h.upper
    timeout = h.minutes
  }
})
const etfembed = new Discord.EmbedBuilder()
.setTitle('This is your vehicle.')   
.setDescription(`You have a ${housename}, your timeout is ${timeout.toString()} minutes.`)
.setColor("Green")
message.channel.send({embeds: [etfembed]})

  } 
  if(args[0] == 'sell'){
    
    if(!tveh) return message.reply('You dont have a vehicle.:x:')
const dhouse = tveh.veh
console.log(tveh + " " + dhouse)
if(dhouse == 'none') return message.reply('You dont have a vehicle.:x:')
let sellingPrice = 0
let housen = ""

houses.forEach(h=>{
  if(dhouse == h.smallVeh ){
    sellingPrice = h.price * 0.7
    housen = h.upper
  }
})
  houseobj = {
    veh: 'none',
    minutes: 200
         }
  await profileModel.findOneAndUpdate({userID: message.author.id,}, 
    {$set: {veh: houseobj,},
  }); 
         await profileModel.findOneAndUpdate({
          userID: message.author.id,},{$inc: { moniy: sellingPrice, }});
        const etfembed = new Discord.EmbedBuilder()
            .setTitle('You sold your vehicle.')
            .setDescription(`You sold your ${housen} for ${sellingPrice}💵.`)
            .setColor("Green")
        message.channel.send({embeds: [etfembed]})
  }
  if(args[0]){
    if(args[0] !== 'sell' && args[0] !=='buy' && args[0] !== 'list') return message.reply('use \`-veh sell`\ , \`-veh buy`\ , \`-veh list`\ or \`-veh (see what house u have rn.)`\ ')
  } 

  }
}