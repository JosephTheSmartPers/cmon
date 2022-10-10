const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("epic")
    .setDescription("Get stunning images of earth.")
    .addStringOption(option => option.setName("type").setDescription("Wheter the image is enchanced or natrual").setRequired(true).addChoices(
        {name: "enhanced", value: "enhanced"},
        {name: "natural", value: "natural"}
    ))
    .addIntegerOption(option => option.setName("year").setDescription("The year the picture was shot.").setMaxValue(2022).setMinValue(2015))
    .addIntegerOption(option => option.setName("month").setDescription("The month the picture was shot.").setMaxValue(12).setMinValue(1))
    .addIntegerOption(option => option.setName("day").setDescription("The day the picture was shot").setMaxValue(31).setMinValue(1)),

    run: async (client, interaction, args) => {

        let year = args.getInteger("year") || "n"
        let month = args.getInteger("month") ||  "n"
        let day = args.getInteger("day") ||  "n"

        console.log(month.toString().length)

        if(month.toString().length == 1) month = "0" + month.toString()
        if(day.toString().length == 1) day = "0" + day.toString()

        let yourDate = new Date()
        
        yourDate = yourDate.toISOString().split('T')[0]
        yourDate = yourDate.split("-")
        yourDate[1] =  "0" + (yourDate[1] - 4).toString()
        yourDate = yourDate.join("-")
        console.log(yourDate)



        if(year == "2022" && parseInt(month) > 9) return interaction.reply(`Ayo I cant see into da future`)
        
        let url = `https://api.nasa.gov/EPIC/api/${args.getString("type")}/date/${year}-${month}-${day}?api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1`
                                                            
        if(year == "n" || month == "n" || day == "n") url = `https://api.nasa.gov/EPIC/api/${args.getString("type")}/date/${yourDate}?api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1`

        console.log(url)
        year = yourDate.split("-")[0]
        month = yourDate.split("-")[1]
        day = yourDate.split("-")[2]

        let satData = ""

        await fetch(url)
        .then(response => {
            if(!response.ok){
                return interaction.editReply("something went wrong :(")
            }
            return response.json()
        })
        .then(data => {
            satData = data[Math.floor(Math.random() * data.length)]
            
        })
        .catch(error => console.log(error))
        console.log(satData)
        let imageURL = `https://api.nasa.gov/EPIC/archive/${args.getString("type")}/${year}/${month}/${day}/png/${satData.image}.png?api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1`
        let embed = new EmbedBuilder()
            .setTitle(`${satData.caption}`)
            .addFields(
                {name: "Date:", value: `${year}-${month}-${day}`, inline: true},
                {name: "Latitude:", value: `${satData.centroid_coordinates.lat}`, inline: true},
                {name: "Latitude:", value: `${satData.centroid_coordinates.lon}`, inline: true}
            )

            .setColor("Purple")
            .setImage(imageURL)
            .setFooter({text: satData.date})
            interaction.reply({embeds: [embed]})

	}
}

