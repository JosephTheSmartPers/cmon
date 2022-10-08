const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    cooldown: 10,
    aliases: ['wthr'],
    description: "Tells you the wether.",
    usage: "weather <place>",
    async execute(message, args, cmd, client, Discord) {
    
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Please specify a location')

        if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

        var current = result[0].current;
        var location = result[0].location;

       const weatherinfo = new Discord.EmbedBuilder()
                   .setDescription(`**${current.skytext}**`)
                   .setAuthor({name: `WEATHER FORECAST INCOMING FOR: ${current.observationpoint}`})
                   .setThumbnail(current.imageUrl)
                   .setColor('#0787c5')
                   .addFields(
                       {name: 'Degree Type', value: 'Celsius', inline: true},
                       {name: 'Temperature',  value: `${current.temperature}°`, inline: true},
                       {name: 'Feels like',  value: `${current.feelslike}°`, inline: true}
                   )
      

        message.channel.send({embeds: [weatherinfo]})
        })        
    }
}