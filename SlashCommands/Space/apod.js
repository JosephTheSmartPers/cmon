const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("apod")
    .setDescription("Astrology Picture of the Day."),

    run: async (client, interaction, args) => {

        let url = "https://api.nasa.gov/planetary/apod?api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1"

        interaction.reply(`Searching the for the APOD <a:loading:1026905223031173150>`)

        fetch(url)
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
            }
            return response.json()
        })
        .then(data => {
            let embed = new EmbedBuilder()
                .setTitle(data.title)
                .setDescription(data.explanation)
                .setFooter({text: data.date})
                .setImage(data.hdurl)
                .setColor("Purple")
            interaction.editReply({content: "", embeds: [embed]})
        })



	}
}

