const Discord = require("discord.js");

const https = require('https');
module.exports = {
    name: 'imdb',
    aliases: ['filmrating'],
    cooldown: 0,
    description: 'Shows how much xp you currently have!',
    usage: "imdb <movie name>",
     async execute(message, args, cmd, client, Discord, profileData){

           // if(args[1]) return message.reply("You can't have a space sorry")
            if (!args.join(` `)) return message.channel.send('Oh no, you didn\'t give a movie or serie to search for:x:.');

                   let url = `https://www.omdbapi.com/?t=${args.join("+")}&apikey=5a16adc7`
                   let data
                   let movie
                   await https.get(url, (resp) => {
                       resp.on('data', (chunk) =>{
                           data += chunk
                       })
                       resp.on('end', async () => {
                           movie = await JSON.parse(data.replace("undefined", ""))

                           if(!movie.Title) return message.channel.send("Couldnt find a movie with the name `"+args.join(" ")+"`")

                           let imdbemb = new Discord.EmbedBuilder()
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

                   message.channel.send({embeds: [imdbemb]})

                       })
                   })
       
     }
    }