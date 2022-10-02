module.exports = async (client) =>{
    const Discord = require('discord.js')
    const randomQuestion = require("random-question");
    const guild = client.guilds.cache.get('826787118104838184');
    const channel = guild.channels.cache.get('856761871502671922');


    setInterval(() =>{
        
      
        const embed = new Discord.MessageEmbed()
        .setTitle('QOTD')
        .setDescription(randomQuestion.randomQuestion())
        channel.send(embed)
        
    }, 86400000);
}