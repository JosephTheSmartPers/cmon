const joke = require('discord-jokes')

module.exports = {
    name: 'joke',
    cooldown: 0,
    aliases: ["joek"],
    description: "Sends a joke",
    usage: "joke",
    execute(message, args, cmd, client, Discord){
       
joke.getRandomDadJoke (function(joke) {
message.channel.send(joke)
})
        
      
        
    }
}