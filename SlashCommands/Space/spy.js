const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("spy")
    .setDescription("Look at the most fresh satelite data on specified coordiantes.")
    .addNumberOption(option => option.setName("lat").setDescription("Latitude.").setRequired(true))
    .addNumberOption(option => option.setName("lon").setDescription("Longitude.").setRequired(true))
    .addNumberOption(option => option.setName("size").setDescription("The size of the image (angle).").setRequired(true).setMaxValue(0.5)),

    run: async (client, interaction, args) => {

        let lat = args.getNumber("lat")
        let lon = args.getNumber("lon")
        let dim = args.getNumber("size")

        let yourDate = new Date()
        yourDate = yourDate.toISOString().split('T')[0]

        let url = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=2021-02-01&dim=${dim}&api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1`



        let satData = ""

        await fetch(url)
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            return response.json()
        })
        .then(data => {
            satData = data
            
        })
        .catch(error => console.log(error))

        let embed = new EmbedBuilder()
            .setTitle(`Results for \`${satData.id}\``)
            .addFields(
                {name: "Latitude", value: lat.toString(), inline: true},
                {name: "Longitude", value: lon.toString(), inline: true},
                {name: "Size", value: dim.toString(), inline: true},
            )
            .setColor("Purple")
            .setImage(satData.url)
            interaction.reply({embeds: [embed]})

	}
}

