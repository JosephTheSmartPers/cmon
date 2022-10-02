const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, channel) => {
    let lc = await GuildModel.findOne({guildId: channel.guildId});
    if(!lc || !lc.logschannel) return
    const logs = channel.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
    const logEmbed = new Discord.MessageEmbed()
    .setColor('#e3b938')
     .setDescription(`**<#${channel.id}>'s pins has been updated.📌**`)
       .setTimestamp();
    logs.send({embeds: [logEmbed]}) 
}