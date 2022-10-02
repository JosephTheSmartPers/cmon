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
                 let embedStats = new Discord.MessageEmbed()
                .setTitle("*** Stats ***")
                .setColor("#00ff00")
                .addField("• 💾Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                .addField("• 🕐Uptime ", `${hours}h ${mins}m`, true) //`${duration}`, true)
                .addField("• 👥Users", `${client.users.cache.size}`, true)
                .addField("• 🛡️Servers", `${client.guilds.cache.size}`, true)
                .addField("• 💬Channels ", `${client.channels.cache.size}`, true)
                .addField("• Discord.js", `v${version}`, true)
               // .addField("• Node", `${process.version}`, true)
                .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                .addField("• CPU usage", `\`${percent.toFixed(2)}%\``,true)
                .addField("• Arch", `\`${os.arch()}\``,true)
                .addField("• Platform", `\`\`${os.platform()}\`\``,true)
                .setFooter("BarniBot stats")
        
                message.channel.send({embeds: [embedStats]})
                })
   
   
    
  }
}