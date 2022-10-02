const Discord = require('discord.js')
const { MessageButton, MessageActionRow, Client, Message} = require("discord.js")
//const { MessageButton } = require('discord-buttons')
const guildModel = require('../../models/guildSchema')
module.exports = {
    permissions: ["MANAGE_CHANNELS"],
    name: 'superclap',
    aliases: [],
    cooldown: 0,
    description: "Deletes all the channels in the guild",
    usage: "superclap",
   async execute(message, args, cmd, client, Discord) {
       function issoma(){
    let soma = message.guild.members.cache.find(member => member.id == "455028621061521411")
    if(soma) return true
    return false
}
    if(issoma() == true) return message.reply("Hehe you tought.")
    else{
    if(message.guild){
        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("yes")
            .setLabel("Yes✅")
            .setStyle("SUCCESS")
            .setDisabled(false),
            new MessageButton()
            .setCustomId("no")
            .setLabel("No❌")
            .setStyle("DANGER")
            .setDisabled(false)
            
        )
rusure = message.channel.send({content: `Are you sure you want to delete all the channels in this guild`, components: [row]})
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
       
            
                            try{
                                await message.guild.channels.cache.forEach(channel=> channel.delete())
                                }catch(err){
                                    message.reply("I can't delete this channel!")
                                }
                                let lc = await guildModel.findOne({guildID: message.guildId});
                                if(!lc.logschannel) return
                                if(!lc) return
                                const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
                                if(!logs) return
                                if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
                                
                                        const logEmbed = new Discord.MessageEmbed()
                                        .setColor('#e3b938')
                                        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
                                        .setDescription(`**<@!${message.author.id}> deleted the channel #${message.channel.name} :wastebasket: **`)
                                        .setFooter(`Channel ID:** ${message.channel.id}`)
                                        .setTimestamp();
                                                logs.send({embeds: [logEmbed]})
    }
})
           
       
}
   }
}
}