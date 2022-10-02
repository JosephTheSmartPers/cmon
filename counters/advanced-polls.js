/*const channel = ['834361869066174524']
const Discord = require('discord.js');
module.exports = (client, Discord) =>{
client.on('message', message =>{
    if(message.channel.id === '834361869066174524'){
    const { content } = message
    const eachLine = content.split('\n')
    console.log(eachLine)
    const embed = new Discord.MessageEmbed()
    .setTitle(eachLine[0])
    
       for (const line of eachLine) {
        if (line.includes('=')) {
            const split = line.split('=')
            const emoji = split[0].trim()
            const content = split.slice(1).join(" ");
            const eachLine = content.split('\n')
            
           
            
            
                embed.addField(emoji, content)
                       }
        
    }
    message.channel.send(embed).then((msg) =>{
      
        for (const line of content.split('\n')) {
            const split = line.split('=')
            const emoji = split[0].trim()
            msg.react(emoji)
        }
        
        
    })
}
})
} */