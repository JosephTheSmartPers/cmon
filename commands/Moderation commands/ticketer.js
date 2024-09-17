const translate = require('translate-api');
const discord = require('discord.js')
const guildModel = require('../../models/guildSchema')

module.exports = {
    name: "ticketer",
    description: "Create a ticket submitter, (first set a category for the tickets with `-setticket <category id>`)",
    aliases: ["ticketreciever"],
    cooldown: 0,
    permissions: ["ManageChannels"],
    usage: "ticketer",

    async execute(message,args, cmd, client, Discord, profileData) {

        const category = await guildModel.findOne({guildID: message.guild.id});
        if(!category) return message.reply("Try again now, I had to set some stuff up.")
        const categoryt = await message.guild.channels.cache.find(category => category.id === category.ticketcategory)
        if(category.ticketcategory === null) return message.reply("Set the ticket category first with `/set ticketcategory`")

const row = new discord.ActionRowBuilder().addComponents(
    new discord.ButtonBuilder()
    .setCustomId("ticket")
    .setLabel("📩Create a ticket")
    .setStyle("Primary")
)
const embed = new discord.EmbedBuilder()
    .setTitle("Open a Ticket")
    .setDescription("If you click the button below, a ticket will open for you!")
    .setColor("#03fc5a")
    .setAuthor({name: "powered by BarniBot", iconURL: client.user.displayAvatarURL({ dynamic: true })})
message.channel.send({embeds: [embed], components: [row]}) 
try{await message.delete()}catch(err){}
    }
    
}