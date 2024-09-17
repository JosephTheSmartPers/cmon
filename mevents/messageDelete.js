const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, message) => {
        console.log("e")
        if(!message.author) return
        let lc = await GuildModel.findOne({guildId: message.guildId});
        if(!lc || !lc.logschannel) return
        const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
        if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
        let content = message.content
        if(!message.content) content = "`EMPTY MESSAGE`"
        const logEmbed = new Discord.EmbedBuilder()
        .setColor('#e3b938')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
        .setDescription(`**<@!${message.author.id}>'s message was deleted in <#${message.channel.id}>**`)
        .addFields(
                {name: "Message content:", value: `${content}`}
                        )
           .setTimestamp();
        logs.send({embeds: [logEmbed]})
}