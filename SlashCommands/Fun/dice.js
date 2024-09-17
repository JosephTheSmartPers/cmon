const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")


module.exports = {
    ...new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Roll a dice🎲."),

    run: async (client, interaction, args) => {

    const number = Math.floor(Math.random() * 6) + 1;
    var dice = []
    if(number === 1) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169763806806036/1.PNG')
    if(number === 2) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169766872842260/2.PNG')
    if(number === 3) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169769348136991/3.PNG')
    if(number === 4) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169771624988722/4.PNG')
    if(number === 5) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169773696843806/5.PNG')
    if(number === 6) dice.push('https://cdn.discordapp.com/attachments/850292393173188678/851169778218827776/6.PNG')
    const embed = new EmbedBuilder()
    .setTitle('Lets see your number🎲...')
    .setImage(dice.join(""))
    interaction.reply({embeds: [embed]})

	}
}

