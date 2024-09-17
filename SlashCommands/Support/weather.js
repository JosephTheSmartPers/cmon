const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const weather = require('weather-js');

module.exports = {
    cooldown: 10,
    ...new SlashCommandBuilder()
    .setName("weather")
    .setDescription("See the weather anywhere.")
    .addStringOption(option => option.setName("place").setDescription("The place where you want to know the weather.").setRequired(true)),

    run: async (client, interaction, args) => {

        let country = args.getString("place")

        await interaction.reply(`Searching the weather for \`${country}\` <a:loading:1026905223031173150>`)

        weather.find({search: country, degreeType: 'C'}, function (error, result){
            // 'C' can be changed to 'F' for farneheit results
            if(error) return interaction.editReply("That sounds like a not real country...");
    
            if(result === undefined || result.length === 0) return interaction.editReply('**Invalid** location');
    
            var current = result[0].current;
            var location = result[0].location;
    
            const weatherinfo = new EmbedBuilder()
            .setDescription(`**${current.skytext}**`)
            .setAuthor({name: `WEATHER FORECAST INCOMING FOR: ${current.observationpoint}`})
            .setThumbnail(current.imageUrl)
            .setColor('#0787c5')
            .addFields(
                {name: 'Degree Type', value: 'Celsius', inline: true},
                {name: 'Temperature',  value: `${current.temperature}°`, inline: true},
                {name: 'Feels like',  value: `${current.feelslike}°`, inline: true}
            )
          
    
            interaction.editReply({content: "", embeds: [weatherinfo]})
            })

	}
}

