const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction} = require("discord.js")

const https = require('https');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("covid")
    .setDescription("See covid stats.")
    .addStringOption(option => option.setName("country").setDescription("What country would you like info about?").setAutocomplete(true)),

    run: async (client, interaction, args) => {

        let countries = args.getString("country") || "Worldwide🌐"

        let call = "https://covid19.mathdro.id/api"
        if(countries != "Worldwide🌐"){
            call = `https://covid19.mathdro.id/api/countries/${countries}`
        }

        https.get(call, (resp) => {
                            
        let data = ""
        resp.on('data', (chunk) =>{
            data += chunk
        })
        resp.on('end', () => {
            data = JSON.parse(data)
        
            let confirmed = data.confirmed.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()
            let recovered = (data.confirmed.value - data.deaths.value).toLocaleString()
        
            const embed = new EmbedBuilder()
                .setTitle(`${countries} covid19 stats`)
                .addFields(
                    {name: `Confirmed cases🧪`, value: confirmed},
                    {name: `Recovered people🩹`, value: recovered},
                    {name: `Passed away people⚰️`, value: deaths}
                )
                .setImage(data.image)
                    
            interaction.reply({embeds: [embed]});
        });      
                            
    })
            

	}
}

