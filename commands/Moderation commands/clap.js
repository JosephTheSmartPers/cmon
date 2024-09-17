const Discord = require('discord.js')
const { MessageButton, MessageActionRow, Client, Message} = require("discord.js")
//const { MessageButton } = require('discord-buttons')
const guildModel = require('../../models/guildSchema')
module.exports = {
    permissions: ["ManageChannels"],
    name: 'clap',
    aliases: [],
    cooldown: 0,
    description: "Deletes the channel your in.",
    usage: "clap",
   async execute(message, args, cmd, client, Discord) {
    let guildsthatno = ["765863431504134154", "955797109548920863"]
    if(guildsthatno.includes(message.guildId)) return message.reply("Hehe you tought.")
    if(message.guild){
        const row = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("yes")
            .setLabel("Yes")
            .setStyle("Success")
            .setDisabled(false),
            new Discord.ButtonBuilder()
            .setCustomId("no")
            .setLabel("No")
            .setStyle("Danger")
            .setDisabled(false)
            
        )
rusure = message.channel.send({content: `Are you sure you want to delete <#${message.channel.id}>?`, components: [row]})
const filter = (interaction) => {
    if(interaction.user.id === message.author.id) return true
    return
}
const collector = message.channel.createMessageComponentCollector({
    filter,
    max: 1,
});
collector.on("end", async (ButtonInteraction) => {
   
    const id = ButtonInteraction.first().customId
    if(id === "no") ButtonInteraction.first().reply("Delete canceled.")

    if(id === "yes"){
       
            let lc = await guildModel.findOne({guildID: message.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
            
                    const logEmbed = new Discord.EmbedBuilder()
                    .setColor('#e3b938')
                    .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true})})
                    .setDescription(`**<@!${message.author.id}> deleted the channel #${message.channel.name} :wastebasket: **`)
                    .setFooter({text: `Channel ID:** ${message.channel.id}`})
                    .setTimestamp();
                            logs.send({embeds: [logEmbed]})
                            try{
                                await message.channel.delete()
                                }catch(err){
                                    message.reply("I can't delete this channel!")
                                }
    
    }
})
           
       
}
   }
}