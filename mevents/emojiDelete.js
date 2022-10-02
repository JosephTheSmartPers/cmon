const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, emoji) => {
    let lc = await GuildModel.findOne({guildId: emoji.guild.id});
    if(!lc || !lc.logschannel) return
    const logs = emoji.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
    let animated
    if(emoji.animated == true) animated = "Animated✅"
    if(emoji.animated == false) animated = "Not animated:x:"
       const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
        .setDescription(`**Emoji deleted :wastebasket:** \n<:${emoji.name}:${emoji.id}> - \`:${emoji.name}:\``)
        .addFields({name: "🎞️Animated:", value: `${animated}`})
        .setFooter({text: `ID: ${emoji.id}`})
        .setTimestamp();
       logs.send({embeds: [logEmbed]})   
}