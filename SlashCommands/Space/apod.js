const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

let yourDate = new Date()
        
yourDate = yourDate.toISOString().split('T')[0]

module.exports = {
    ...new SlashCommandBuilder()
    .setName("apod")
    .setDescription("Astrology Picture of the Day.")
    .addIntegerOption(option => option.setName("year").setDescription("The year the picture was taken").setMinValue(1995).setMaxValue(parseInt(yourDate.split("-")[0])))
    .addIntegerOption(option => option.setName("month").setDescription("The month the picture was taken").setMinValue(1).setMaxValue(12))
    .addIntegerOption(option => option.setName("day").setDescription("The day the picture was taken").setMinValue(1).setMaxValue(31)),

    run: async (client, interaction, args) => {

        let year = args.getInteger("year")
        let month = args.getInteger("month")
        let day = args.getInteger("day")

        if(month.toString().length == 1) month = "0" + month.toString()
        if(day.toString().length == 1) day = "0" + day.toString()

        let date = await new Date(year, month, day)

        let splitDate = yourDate.split("-")

        if(year >= splitDate[0] && month >= splitDate[1] && day > splitDate[2]) return interaction.reply(`Ayo ${year}-${month}-${day} hasnt exactly happened yet ):`)
                     
        let url = "https://api.nasa.gov/planetary/apod?api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1"
        if(year && month && day){
        url = `https://api.nasa.gov/planetary/apod?date=${year}-${month}-${day}&api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1`
        }

        await interaction.reply(`Searching the for the APOD <a:loading:1026905223031173150>`)

        let ok = true

        await fetch(url)
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
                ok = false
                return interaction.editReply("Somehting went wrong ):")
                
            }
            return response.json()
        })
        .then(data => {
            if(ok == false) return
            let embed = new EmbedBuilder()
                .setTitle(data.title)
                .setDescription(data.explanation)
                .setFooter({text: data.date})
                .setImage(data.hdurl || `https://img.youtube.com/vi/${data.url.split("/")[4].split("?")[0]}/0.jpg`)
                .setColor("Purple")
            interaction.editReply({content: "", embeds: [embed]})
        })



	}
}

