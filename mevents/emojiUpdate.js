const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, oldEmoji, newEmoji) => {
    let lc = await GuildModel.findOne({guildId: newEmoji.guild.id});
    if(!lc || !lc.logschannel) return
    const logs = newEmoji.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
    if(oldEmoji.name != newEmoji.name){
    let animated
    if(newEmoji.animated == true) animated = "Animated✅"
    if(newEmoji.animated == false) animated = "Not animated:x:"
       const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
        .setDescription(`**Emoji updated⚒️**`)
        .addFields(
            {name: "New Name:", value: `\n<:${newEmoji.name}:${newEmoji.id}> - \`:${newEmoji.name}:\``},
            {name: "Old Name:", value: `\n<:${oldEmoji.name}:${oldEmoji.id}> - \`:${oldEmoji.name}:\``}
                    )
        .setFooter({text: `ID: ${newEmoji.id}`})
        .setTimestamp();
       logs.send({embeds: [logEmbed]})   
    }
}