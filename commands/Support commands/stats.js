const Discord = require("discord.js")
const os = require('os')
const cpuStat = require("cpu-stat");
const moment = require("moment") 
module.exports = {
  name: 'stats',
  aliases: [],
  cooldown: 0,
  description: "Stats of the bot, like cpu usage",
  usage: "usage",
  async execute(message,args, cmd, client, Discord) {
    
   
               let { version } = require("discord.js");
        
               cpuStat.usagePercent(function(err, percent, seconds) {
                 if (err) {
                   return console.log(err);
                 }
                
                let secs = Math.floor(client.uptime % 60);
                let days = Math.floor((client.uptime % 31536000) / 86400);
                let hours = Math.floor((client.uptime / 3600) % 24);
                let mins = Math.floor((client.uptime / 60) % 60);
     
                 //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
                 let embedStats = new Discord.EmbedBuilder()
                    .setTitle("*** Stats ***")
                    .setColor("#00ff00")
                    .addFields(
                        {name: "• 💾Mem Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, inline: true},
                        {name: "• 🕐Uptime ", value: `${hours}h ${mins}m`, inline: true}, //`${duration}`, true)
                        {name: "• 👥Users", value: `${client.users.cache.size}`, inline: true},
                        {name: "• 🛡️Servers",value:  `${client.guilds.cache.size}`, inline: true},
                        {name: "• 💬Channels ", value: `${client.channels.cache.size}`, inline: true},
                        {name: "• Discord.js", value: `v${version}`, inline: true},
                        {name: "• Node", value: `${process.version}`, inline: true},
                        {name: "• CPU", value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``},
                        {name: "• CPU usage", value: `\`${percent.toFixed(2)}%\``,inline: true},
                        {name: "• Arch", value: `\`${os.arch()}\``, inline: true},
                        {name: "• Platform", value: `\`\`${os.platform()}\`\``, inline: true}
                    )
                    .setFooter({text: "BarniBot stats"})
        
                message.channel.send({embeds: [embedStats]})
                })
   
   
    
  }
}