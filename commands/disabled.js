const Discord = require('discord.js');

module.exports = {
    name: 'disabled',
    aliases: [],
    cooldown: 0,
    permissions: [],
    description: 'Error message for disabled commands.',
    async execute(message, args, cmd, client, discord, profileData){
        const banEmbed = new Discord.MessageEmbed()
        .setColor('#ee0d0d')
            .setTitle(`This command is currently dissabled!.`)
         .setFooter(`This command is dissabled due to abuseing, or other illegal things.`)
             message.channel.send({embeds: [banEmbed]})


    }
}