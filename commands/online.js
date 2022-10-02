const Discord = require('discord.js');
module.exports = {
    name: 'online',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Send the online thing',
    async execute(message, args, cmd, client, Discord){
if(message.author.id !== '483519738727759873') return message.reply('HEYOOO stop that rn, u aint the owner.')
client.guilds.cache.forEach(guild => {
let defaultChannel = "";
guild.channels.cache.forEach(channel => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
//defaultChannel will be the channel object that it first finds the bot has permissions for
const wembed1 = new Discord.MessageEmbed()
.setColor('#eb9e34')
.setTitle('BarniBot is back!')
.setDescription('For a long time (2 weeks) BarniBot was not functioning, now it is back online and it will not be going online any soon! As you know you can do `\-help\` for help if you need any (:')
defaultChannel.send({embeds: [wembed1]})
      })
        
                   
        
                        
                
    }
        }
        