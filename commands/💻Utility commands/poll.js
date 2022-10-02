Discord = require("discord.js");
module.exports = {
  name: 'poll',
  aliases: [],
  cooldown: 0,
  description: "Create a poll",
  usage: "poll help",
  async execute(message,args, cmd, client, Discord) {
    if(args[0] == "help"){
      const helpEmbed = new Discord.MessageEmbed()
      .setTitle("How to create a poll?")
      .setDescription("`poll <title>\n<emoji> = <option descripton>`")
      .setColor("ORANGE")
      message.channel.send({embeds: [helpEmbed]})
      return
    } 
    const { content } = message
    const eachLine = content.split('\n')
    console.log(eachLine)
    if(!eachLine[1]) return message.reply(':x:Ya need to put anoda line for the option.')
    if(!message.content.includes('=')) return message.reply('You need to put a "**=**" between the emoji and the option.')
        const embed = new Discord.MessageEmbed()
    .setTitle(eachLine[0].replace('-poll', ' '))
    .setColor("BLUE")
    
       for (const line of eachLine) {
        if (line.includes('=')) {
            const split = line.split('=')
            const emoji = split[0].trim()
            const content = split.slice(1).join(" ");
            const eachLine = content.split('\n')
            
           
            
            
                embed.addField(emoji, content, true)
                       }
        
    }
    message.channel.send({embeds: [embed]}).then((msg) =>{
      let i = 1
        for (const line of content.split('\n')) {
          if(i == 2){
            const split = line.split('=')
            const emoji = split[1].trim()
            console.log(emoji)
            msg.react(emoji)
          }
          i++
        }
        
        
    })
   
  }
}