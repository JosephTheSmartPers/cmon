
const Discord = require('discord.js')
module.exports = {
    name: 'qrcode',
    cooldown: 0,
    aliases: ['qr'],
    description: 'Generates a qrcode',
    usage: "qr <link or text>",
    async execute(message, args, cmd, client, Discord){
        let qrcode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${args.join("%20")}`
        console.log(qrcode)
        const embed = new Discord.MessageEmbed()
        .setTitle("Scan this!")
        .setImage(qrcode)
        message.channel.send({embeds: [embed]})
        try{
            message.delete()
        }catch(err){
            
        }
    }
}