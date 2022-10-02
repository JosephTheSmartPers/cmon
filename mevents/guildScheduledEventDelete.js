const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, event) => {
    let lc = await GuildModel.findOne({guildId: event.guild.id});
    if(!lc || !lc.logschannel) return
    const logs = event.guild.channels.cache.find(channel => channel.name === lc.logschannel)
    if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
    let inline = true
    let channel = "No channel :x:"
    if(event.channel) channel = `<#${event.channel.id}>`
       const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
        .setDescription(`**An event named \`${event.name}\` has been deleted! 🗑️**`)
        .setThumbnail(event.image)
        
        .addFields(
            {name: "Invite", value: `[click here for invite](${event.url})`, inline: true},
            {name: "Created at:", value: `${event.createdTimestamp}`, inline: true},
            {name: "Created by", value: `<@!${event.creatorId}>`, inline: true},
            {name: "Name:", value: `${event.name}`, inline: true},
            {name: "Description", value: `${event.description}`, inline: true},
            {name: "Status", value: `${event.status}`, inline: true},
            {name: "Start at", value: `${event.scheduledStartAt}`},
            {name: "End at", value: `${event.scheduledEndAt}`}
            )

        .setTimestamp()
        .setFooter({text: `ID: ${event.id}`})
       logs.send({embeds: [logEmbed]})   
    
}