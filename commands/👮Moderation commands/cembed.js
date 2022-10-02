const Discord = require('discord.js')

module.exports = {
    name: "cembed",
    cooldown: 0,
    description: "Make an embed",
    usage: "cembed <title> <COLOR> <text>",

    async execute(message, args, cmd, client, Discord){

        let title = args[0] // args[0] is the first word or number after the command name
        let color = args[1]
        let description = args.slice(2).join(" ") // args.slice(2).join(" ") means we're taking all the arguments including and after the second argument. An argument is just a word or number.
        const error = new Discord.MessageEmbed() 
        .setColor('#0787c5')
        .setTitle('**❌ERROR INVALID ARGS**')
        .setDescription(`-cembed, title(one word) color(hex code or basic colors in caps; i.e(YELLOW), description(embed body))`)

        if(!title) return message.channel.send({embeds: [error]}) // ! means no, so if there's no title, return and send the error embed
        if(!color) return message.channel.send({embeds: [error]})
        if(!description) return message.channel.send({embeds: [error]})

try{
        const embed = new Discord.MessageEmbed()
        .setTitle(`**${title}**`)
        .setColor(color)
        .setDescription(description)
        
        message.delete() // this deletes the command

        message.channel.send({embeds: [embed]})
    
}catch(err){
    
    }
    }
}