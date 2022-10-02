const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, member) => {
    let lc = await GuildModel.findOne({guildId: member.guild.id});
    if(!lc || !lc.logschannel) return
    const logs = member.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
   
       const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
        .setDescription(`**<@!${member.id}> joined the server📥**`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true}))
        .addFields({name: "Joined At:clock1::", value: `${member.joinedAt}`})
        .setTimestamp()
        .setFooter({text: `ID: ${member.id}`})
       logs.send({embeds: [logEmbed]})   
    
}