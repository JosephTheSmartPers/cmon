const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, messageLink } = require("discord.js")
const guildModel = require('../../models/guildSchema')
const https = require('https');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("imdb")
    .setDescription("Search for a movie.")
    .addStringOption(option => option.setName("movie").setDescription("The movie you wanna search for.").setRequired(true)),

    run: async (client, interaction, args) => {

        const searchMovie = interaction.options.getString("movie")

        let url = `https://www.omdbapi.com/?t=${searchMovie.split(" ").join("+")}&apikey=5a16adc7`
        let data
        let movie
        await https.get(url, (resp) => {             
            resp.on('data', (chunk) =>{
                data += chunk
            })
            resp.on('end', async () => {
                movie = await JSON.parse(data.replace("undefined", ""))   

                if(!movie.Title) return interaction.reply("Couldnt find a movie with the name `"+searchMovie+"`")

                let imdbemb = new EmbedBuilder()

                

            .setColor("#00ff00")
            .setTitle(movie.Title)
            .setDescription(movie.Plot)
            .setThumbnail(movie.Poster)
            .addFields(
                {name: "💯Rateing", value: `${movie.imdbRating}/10`, inline: true},
                {name: "⏲️Time", value: movie.Runtime, inline: true},
                {name: "🏅Awards", value: movie.Awards, inline: true},
                {name: "📚Languages", value: movie.Language, inline: true},
                {name: "🎥Genres", value: movie.Genre, inline: true},
                {name: "🔞Recomended age", value: movie.Rated, inline: true},
                {name: "🌐Coutry", value: movie.Country, inline: true},
                {name: "🎬Production:", value: `${movie.Production || "N/A"}`, inline: true},
                {name: "📥Votes:", value: movie.imdbVotes.toString(), inline: true},
                {name: "💰Income", value: `${movie.BoxOffice || "N/A"}`, inline: true},
                {name: "📃Writer", value: movie.Writer, inline: true},
                {name: "📢Director", value: movie.Director, inline: true},
                {name: "📅Released", value: `${movie.Released}`},
                {name: "👥Actors", value: movie.Actors }
            )

        interaction.reply({embeds: [imdbemb]})

            })
        })

        

	}
}

