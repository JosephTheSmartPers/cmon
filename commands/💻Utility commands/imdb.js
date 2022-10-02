const Discord = require("discord.js");
import('chalk');
const {Command} = require('sylphy');
const imdb = require('imdb-api');
module.exports = {
    name: 'imdb',
    aliases: ['filmrating'],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Shows how much xp you currently have!',
    usage: "imdb <movie name>",
     async execute(message, args, cmd, client, Discord, profileData){

           // if(args[1]) return message.reply("You can't have a space sorry")
            console.log(args.join("+"))
            if (!args.join(` `)) return message.channel.send('Oh no, you didn\'t give a movie or serie to search for:x:.');

                     const imob = new imdb.Client({apiKey: "5a16adc7"})
            let movie
            try{
            movie = await imob.get({'name': args.join("")})
            }catch(err){
                   message.reply("No such movie ):")
                   return
            }
  
            let imdbemb = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setTitle(movie.title)
            .setURL(movie.imdburl)
            .setDescription(movie.plot)
            .setThumbnail(movie.poster)
            .addField("💯Rate", `${movie.rating}/10`, true)
            .addField("⏲️Time", movie.runtime, true)
            .addField("🏅Awards", movie.awards, true)
            .addField("📚Langueages", movie.languages, true)
            .addField("🎥Genres", movie.genres, true)
            .addField("🔞Recomended age", movie.rated, true)
            .addField("🌐Coutry", movie.country, true)
            .addField("🎬Production:", `${movie.production}`, true)
            .addField("📥Votes:", movie.votes.toString(), true)
            .addField("💰Income", `${movie.boxoffice}`, true)
            .addField("📃Writer", movie.writer, true)
            .addField("📢Director", movie.director, true)
            .addField("📅Released", `${movie.released}`)
            .addField("👥Actors", movie.actors)
                        
            message.channel.send({embeds: [imdbemb]})
        


        
    
       
     }
    }