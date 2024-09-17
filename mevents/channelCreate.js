const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, newchannel) => {
    let lc = await GuildModel.findOne({guildId: newchannel.guildId});
    if(!lc || !lc.logschannel) return
    const logs = newchannel.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
    const logEmbed = new Discord.EmbedBuilder()
    .setColor('#e3b938')
     .setDescription(`** <#${newchannel.id}> has been created ⚒️**`)
     .addFields(
      {name: "ID", value: `Channel id: ${newchannel.id}`}
              )
       .setTimestamp();
    logs.send({embeds: [logEmbed]})
}