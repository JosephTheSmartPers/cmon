const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const https = require('https');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("iss")
    .setDescription("See where the ISS currently is."),

    run: async (client, interaction, args) => {

        let url = "http://api.open-notify.org/iss-now.json"

        let yourDate = new Date()
        yourDate = yourDate.toISOString().split('T')[0]

        let satData = ""

        await fetch(url)
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
            }
            return response.json()
        })
        .then(data => {
            satData = data
            
        })
        .catch(error => console.log(error))

        let imageURL = `https://api.nasa.gov/planetary/earth/assets?lon=${satData.iss_position.longitude}&lat=${satData.iss_position.latitude}&date=2021-02-01&dim=0.15&api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1`
        let mapURL = `https://google.com/maps/search/${satData.iss_position.latitude}+${satData.iss_position.longitude}/@${satData.iss_position.latitude},${satData.iss_position.longitude}z`
        await fetch(imageURL)
        .then(esponse => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!esponse.ok) {
            }
            return esponse.json()
            
        })
        .then(async data => {
            console.log(data)
            let image = await data.url

            let embed = new EmbedBuilder()
            .setTitle("Where may the ISS be🚀")
            .setDescription(mapURL)
            .setURL(mapURL)
            .setImage(image)
            .addFields(
                {name: "Latitude", value: satData.iss_position.latitude},
                {name: "Longitude", value: satData.iss_position.longitude},
            )
            .setColor("Purple")
            interaction.reply({embeds: [embed]})
            
        })
        .catch(error => console.log(error))

        


        
	}
}

