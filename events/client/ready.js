const message = require("../guild/messageCreate");
const translate = require("translate"); 
const Discord = require('discord.js');
const offline = require('../../mpassword/offline')
const alarm = require('../../handlers/alarm')
const util = require('minecraft-server-util');

const guildId = '826787118104838184'
const WOKCommands = require('wokcommands')

module.exports = async (Discord, client, message) =>{

  


    console.log(`BarniBot is online`)
    client.user.setActivity(`-help | ${client.guilds.cache.size} servers`, {type:"LISTENING"})
    offline(Discord, client)

    

    
    
}
