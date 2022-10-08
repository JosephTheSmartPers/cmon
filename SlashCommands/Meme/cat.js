const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const https = require('https');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Sends a picture of a cat."),

    run: async (client, interaction, args) => {

        await interaction.reply(`Searching the internet for cats <a:loading:1026905223031173150>`)

        let url = "https://api.thecatapi.com/v1/images/search?"
        let data = ""

        await https.get(url, (resp) => {             
            resp.on('data', (chunk) =>{
                data += chunk
            })
            resp.on('end', async () => {
                data = await JSON.parse(data)   
                const embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setImage(data[0].url)
                    .setTitle("Meow🐈.")
                interaction.editReply({content: "", embeds: [embed]}); 
            })
        })

	}
}

