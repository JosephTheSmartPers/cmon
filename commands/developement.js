const Discord = require('discord.js');

module.exports = {
    name: 'developement',
    aliases: [],
    cooldown: 0,
    permissions: [],
    description: 'A message for commands being under developement.',
    async execute(message, args, cmd, client, discord, name){
        const banEmbed = new Discord.EmbedBuilder()
        .setColor('#ee0d0d')
        .setTitle(`⚠️This command is under developement!`)
        .setDescription(`This command (\`${name}\`) will probably be shortly ready so don't worry!`)
             message.channel.send({embeds: [banEmbed]})


    }
}