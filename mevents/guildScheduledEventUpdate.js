const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, oldevent, newevent) => {
    if(!newevent) return
    let lc = await GuildModel.findOne({guildId: newevent.guild.id});
    if(!lc || !lc.logschannel) return
    const logs = newevent.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
    let inline = true
    let channel = "No channel :x:"
    if(newevent.channel) channel = `<#${newevent.channel.id}>`
    if(newevent.name !== oldevent.name){
        const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
        .setDescription(`**\`${newevent.name}\`'s name has been updated:hammer:!**`)
        .setImage(newevent.image)

        .addFields(
            {name: "Invite", value: `[click here for invite](${newevent.url})`, inline: true},
            {name: "New Name:", value: `${newevent.name}`},
            {name: "Old Name:", value: `${oldevent.name}`}
        )

        .setTimestamp()
        .setFooter({text: `ID: ${newevent.id}`})
       logs.send({embeds: [logEmbed]})   

    } else if(newevent.channelId !== oldevent.channelId){
        let oldChannel = "`No channel :x:`"
        let newChannel = "`No channel :x:`"
        if(newevent.channelId) newChannel =  `\`<#${newevent.id}>\``
        if(oldevent.channelId) oldChannel =  `\`<#${oldevent.id}>\``
        const logEmbed = new Discord.EmbedBuilder()
        .setColor('#e3b938')
         .setDescription(`**\`${newevent.name}\`'s channel has been updated:hammer:!**`)
         .setImage(newevent.image)

         .addField(
            {name: "Invite", value: `[click here for invite](${newevent.url})`, inline: true},
            {name: "New Channel:", value: `${newChannel}`},
            {name: "Old Channel:", value: `${oldChannel}`}
            )

         .setTimestamp()
         .setFooter({text: `ID: ${newevent.id}`})
        logs.send({embeds: [logEmbed]}) 

    } else if (newevent.description !== oldevent.description){
        const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
        .setDescription(`**\`${newevent.name}\`'s name has been updated:hammer:!**`)
        .setImage(newevent.image)

        .addField(
            {name: "Invite", value: `[click here for invite](${newevent.url})`, inline: true},
            {name: "New Description:", value: `${newevent.description}`},
            {name: "Old Description:", value: `${oldevent.description}`}
            )

        .setTimestamp()
        .setFooter({text: `ID: ${newevent.id}`})
       logs.send({embeds: [logEmbed]})   
    }   
    
}