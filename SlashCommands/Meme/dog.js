const https = require('https');
const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Sends a dp (DOG PIC)."),

    run: async (client, interaction, args) => {

        await interaction.reply(`Searching the internet for dogs <a:loading:1026905223031173150>`)

        let url = "https://dog.ceo/api/breeds/image/random"
        let data = ""

        await https.get(url, (resp) => {             
            resp.on('data', (chunk) =>{
                data += chunk
            })
            resp.on('end', async () => {
                data = await JSON.parse(data)   
                const embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setImage(data.message)
                    .setTitle("Dog sound.")
                interaction.editReply({content: "", embeds: [embed]}); 
            })
        })

	}
}

