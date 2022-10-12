const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const https = require('https');
const yt = require('yt-search');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("iss")
    .setDescription("See where the ISS currently is."),

    run: async (client, interaction, args) => {

        await interaction.reply(`Searching the for the ISS <a:loading:1026905223031173150>`)

        let url = "http://api.open-notify.org/iss-now.json"

        let yourDate = new Date()
        yourDate = yourDate.toISOString().split('T')[0]

        let satData = ""

        let newSDate = await new Date()

        let nowDate = await new Date()
        nowDate = nowDate.toJSON().split(":")[0].split("-").join("").split("T").join() + newSDate.toLocaleTimeString("en-US", {timeZone: 'America/Los_Angeles'}).toString().split(":")[0].split(",")[0];

        nowDate = nowDate.toString().split(",")[0]

        let urlplis = `https://ustvstaticcdn1-a.akamaihd.net/i/channel/live/1_17074538,640x360,b:${nowDate}.jpg` 

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

        let mapURL = `https://google.com/maps/search/${satData.iss_position.latitude}+${satData.iss_position.longitude}/@${satData.iss_position.latitude},${satData.iss_position.longitude}z`

            let embed = new EmbedBuilder()
            .setTitle("Where may the ISS be🚀")
            .setDescription(mapURL)
            .setURL(mapURL)
            .setImage(urlplis)
            .addFields(
                {name: "Latitude", value: satData.iss_position.latitude},
                {name: "Longitude", value: satData.iss_position.longitude},
            )
            .setColor("Purple")
            interaction.editReply({embeds: [embed]})

        


        
	}
}

