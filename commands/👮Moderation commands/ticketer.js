const translate = require('translate-api');
const discord = require('discord.js')


module.exports = {
    name: "ticketer",
    description: "Create a ticket submitter, (first set a category for the tickets with `-setticket <category id>`)",
    aliases: ["-ticketreciever"],
    cooldown: 0,
    permissions: ["MANAGE_CHANNELS"],
    usage: "ticketer",

    async execute(message,args, cmd, client, Discord, profileData) {
       
const row = new discord.MessageActionRow().addComponents(
    new discord.MessageButton()
    .setCustomId("ticket")
    .setLabel("📩Create a ticket")
    .setStyle("PRIMARY")
)
const embed = new discord.MessageEmbed()
    .setTitle("Open a Ticket")
    .setDescription("If you click the button below, a ticket will open for you!")
    .setColor("#03fc5a")
    .setAuthor("powered by BarniBot", client.user.displayAvatarURL({ dynamic: true }))
message.channel.send({embeds: [embed], components: [row]}) 
try{await message.delete()}catch(err){}
    }
    
}