const yoMamma = require('yo-mamma').default;
module.exports = {
    name: 'joe',
    cooldown: 0,
    description: "Wonder what this command does...",
    usage: "joe",
    execute(message, args, cmd, client, Discord){
        

       
        
            let insult = yoMamma();
        
            message.channel.send(insult.replace("Yo mama", "momma"))
        
        
        
    






}

}