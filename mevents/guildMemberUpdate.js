const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, oldMember, newMember) => {
    if(newMember.id == client.id) return
    let lc = await GuildModel.findOne({guildId: oldMember.guild.id});
    if(!lc || !lc.logschannel) return
    const logs = newMember.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 

    if(oldMember.user.username !==  newMember.user.username){
        const logEmbed = new Discord.EmbedBuilder()
        .setColor('#e3b938')
         .setDescription(`**<@!${newMember.id}> updated his/her username.**`)
         .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true}))
         .addFields(
            {name: "Old Name", value: `${oldMember.name}`},
            {name: "New Name", value: `${newMember.name}`}
         )
         .setTimestamp()
         .setFooter({text: `ID: ${newMember.id}`})
        logs.send({embeds: [logEmbed]})   

    } else if(oldMember.user.displayAvatarURL() !== newMember.user.displayAvatarURL()){
        const logEmbed = new Discord.EmbedBuilder()
        .setColor('#e3b938')
         .setDescription(`**<@!${newMember.id}> updated his/her avatar.**`)
         .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true}))
         .addFields(
            {name: "Old Avatar", value: `${oldMember.user.displayAvatarURL({ dynamic: true})}`},
            {name: "New Avatar", value: `${newMember.user.displayAvatarURL({ dynamic: true})}`}
         )
         .setTimestamp()
         .setFooter({text: `ID: ${newMember.id}`})
        logs.send({embeds: [logEmbed]})  

    } else if(oldMember.nickname !== newMember.nickname){
        let oldnick = oldMember.nickname || oldMember.user.username
        let newnick = newMember.nickname || newMember.user.username
    const logEmbed = new Discord.EmbedBuilder()
    .setColor('#e3b938')
     .setDescription(`**<@!${newMember.id}>'s nickname has been updated.**`)
     .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true}))
     .addFields(
        {name: "Old Nickname", value: `${oldnick}`},
        {name: "New Nickname", value: `${newnick}`}
     )
     .setTimestamp()
     .setFooter({text: `ID: ${newMember.id}`})
    logs.send({embeds: [logEmbed]})  
}
      
    
}