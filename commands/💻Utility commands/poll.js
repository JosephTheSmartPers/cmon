Discord = require("discord.js");
module.exports = {
  name: 'poll',
  aliases: [],
  cooldown: 0,
  description: "Create a poll",
  usage: "poll help",
  async execute(message,args, cmd, client, Discord) {
    if(args[0] == "help"){
      const helpEmbed = new Discord.EmbedBuilder()
      .setTitle("How to create a poll?")
      .setDescription("`poll <title>\n<emoji> = <option descripton>`")
      .setColor("Orange")
      message.channel.send({embeds: [helpEmbed]})
      return
    } 
    const { content } = message
    const eachLine = content.split('\n')
    if(!eachLine[1]) return message.reply(':x:Ya need to put anoda line for the option.')
    if(!message.content.includes('=')) return message.reply('You need to put a "**=**" between the emoji and the option.')
        const embed = new Discord.EmbedBuilder()
    .setTitle(eachLine[0].replace('-poll', ' '))
    .setColor("Blue")
    
       for (const line of eachLine) {
        if (line.includes('=')) {
            const split = line.split('=')
            const emoji = split[0].trim()
            const content = split.slice(1).join(" ");
            const eachLine = content.split('\n')
            
           
            
            
                embed.addFields({name: emoji, value: content, inline: true})
                       }
        
    }
    message.channel.send({embeds: [embed]}).then((msg) =>{
      let i = 1
        for (const line of content.split('\n')) {
          if(i > 1){
            const split = line.split('=')
            const emoji = split[0].trim()
            console.log(emoji)
            msg.react(emoji)
          }
          i++
        }
        
        
    })
   
  }
}