const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, ban) => {
    let lc = await GuildModel.findOne({guildId: ban.guild.id});
    if(!lc || !lc.logschannel) return
    const logs = ban.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
   
       const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
        .setDescription(`**${ban.user.username} has been banned🔨**`)
        .setThumbnail(ban.user.displayAvatarURL({ dynamic: true}))
        .addFields({name: "Reason:", value: `${ban.reason}`})
        .setTimestamp();
       logs.send({embeds: [logEmbed]})   
    
}