const { CategoryChannel } = require("discord.js");
const guildModel = require('../../models/guildSchema')
module.exports = {
    requiredPermissions: ["ADMINISTRATOR"],
    name: 'claim',
    aliases: [],
    cooldown: 0,
    description: "Claim a ticket",
    usage: "claim",
   async execute(message, args, cmd, client, Discord) {
       const newEmbed = new Discord.MessageEmbed()
       .setAuthor( message.author.tag, message.author.displayAvatarURL({ dynamic: true }) )
       .setColor('#15ff00')
       .setTitle('Clamied')
       .addFields(
           {name: `Ticket clamied by: ${message.author.tag}`, value: 'Any other mods, please dont write anything here from now on'}
       )
       .setFooter('Mod has arrived')
       .setTimestamp()



message.delete()
       message.channel.send({embeds: [newEmbed]});
       let lc = await guildModel.findOne({guildID: message.guildId});
       if(!lc.logschannel) return
       if(!lc) return
       const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
       if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

       const logEmbed = new Discord.MessageEmbed()
       .setColor('#e3b938')
       .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
       .setTitle(`claimed ${message.channel.name}`)
       .setTimestamp();
             logs.send({embeds: [logEmbed]})

               

       }
    }


