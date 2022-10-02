const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, oldguild, newguild) => {
    console.log(newguild)
let lc = await GuildModel.findOne({guildId: newguild.id});
if(!lc || !lc.logschannel) return
const logs = newguild.channels.cache.find(channel => channel.name === lc.logschannel)
if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return 
let inline = true
let channel1 = "No channel :x:"
let channel = "No channel :x:"
if(newguild.afkChannel) channel = `<#${newguild.afkChannel.id}>`
if(oldguild.afkChannel) channel1 = `<#${oldguild.afkChannel.id}>`
if(oldguild.afkChannelId !== newguild.afkChannelId){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s afkChannel has been updated:hammer:!**`)
    .setImage(newguild.iconURL({extension: png}))

    .addFields(
        {name: "New Channel:", value: `${channel}`},
        {name: "Old Name:", value: `${channel1}`}
        )

    .setTimestamp()
    .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
if(oldguild.afkTimeout !== newguild.afkTimeout){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s AFK timeout has been updated:hammer:!**`)
    .setImage(newguild.iconURL({dynamic: true}))

    .addFields(
        {name: "New Timeout:", value: `${ newguild.afkTimeout} seconds`},
        {name: "Old Timeout:", value: `${ oldguild.afkTimeout} seconds`}
        )

    .setTimestamp()
    .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
if(oldguild.banner !== newguild.banner){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s banner has been updated:hammer:!**`)
    .setImage(newguild.iconURL({dynamic: true}))

    .addFields(
        {name: "New Banner:", value: `[banner link](${newguild.bannerURL()})`},
        {name: "Old Banner:", value: `[banner link](${oldguild.bannerURL()})`}
        )

    .setTimestamp()
    .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
if(oldguild.description !== newguild.description){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s description has been updated:hammer:!**`)
    .setImage(newguild.iconURL({dynamic: true}))

    .addFields(
        {name: "New Description:", value: `${newguild.description}`},
        {name: "Old Description:", value: `${oldguild.description}`}
        )

    .setTimestamp()
        .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
if(oldguild.icon !== newguild.icon){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s icon has been updated:hammer:!**`)
    .setImage(newguild.iconURL({dynamic: true}))

    .addFields(
        {name: "New Icon:", value: `[icon link](${newguild.iconURL()})`},
        {name: "Old Icon:", value: `[icon link](${oldguild.iconURL()})`}
        )

    .setTimestamp()
    .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
if(oldguild.icon !== newguild.icon){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s icon has been updated:hammer:!**`)
    .setImage(newguild.iconURL({dynamic: true}))

    .addFields(
        {name: "New Icon:", value: `[icon link](${newguild.iconURL()})`},
        {name: "Old Icon:", value: `[icon link](${oldguild.iconURL()})`}
    )

    .setTimestamp()
    .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
if(oldguild.mfaLevel !== newguild.mfaLevel){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s mfaLevel has been updated:hammer:!**`)
    .setImage(newguild.iconURL({dynamic: true}))

    .addFields(
        {name: "New mfaLevel:", value: `${newguild.mfaLevel}`},
        {name: "Old mfaLevel:", value: `${oldguild.mfaLevel}`}
        )

    .setTimestamp()
    .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
if(oldguild.publicUpdatesChannelId !== newguild.publicUpdatesChannelId){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s public Updates Channel has been updated:hammer:!**`)
    .setImage(newguild.iconURL({dynamic: true}))

    .addFields(
        {name: "New Channel:", value: `${newguild.publicUpdatesChannelId}`},
        {name: "Old Channel:", value: `${oldguild.publicUpdatesChannelId}`}
        )

    .setTimestamp()
    .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
if(oldguild.rulesChannelId !== newguild.rulesChannelId){
    const logEmbed = new Discord.EmbedBuilder()
   .setColor('#e3b938')
    .setDescription(`**\`${newguild.name}\`'s public Updates Channel has been updated:hammer:!**`)
    .setImage(newguild.iconURL({dynamic: true}))

    .addFields(
        {name: "New Channel:", value: `<#${newguild.publicUpdatesChannelId}>`},
        {name: "Old Channel:", value: `<#${oldguild.publicUpdatesChannelId}>`}
        )

    .setTimestamp()
        .setFooter({text: `ID: ${newguild.id}`})
   logs.send({embeds: [logEmbed]})   
}
}