const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, invite) => {
    let lc = await GuildModel.findOne({guildId: invite.guild.id});
    if(!lc || !lc.logschannel) return
    const logs = invite.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
   
       const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
        .setDescription(`**New invite has been created!:hammer:**`)
        .addFields(
            {name: "", value: `${invite.joinedAt}`}
        )
        .setTimestamp()
        .setFooter({text: `ID: ${invite.id}`})
       logs.send({embeds: [logEmbed]})   
    
}