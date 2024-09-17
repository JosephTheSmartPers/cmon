
const Discord = require('discord.js');


module.exports = {
    name: "message",
    description: "Act like the bot sent a message",
    aliases: ["speak"],
    cooldown: 0,
    usage: 'message <text>',
    async execute(message,args, cmd, client, Discord, profileData) {


        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);



     



        let reason = args.slice(1).join(" ");







if(!user) return message.reply('Specifiy a person that you want me to impersonate.')
if(!reason) return message.reply('What do you want me to say?')
                        const warnEmbed = new Discord.EmbedBuilder()
                        .setColor('36393f')
                        .setAuthor({name: user.username, iconURL:user.displayAvatarURL({ dynamic: true })})
                        .setFooter({text: `${reason}`})
         message.delete
        await message.channel.send({embeds: [warnEmbed]})
        message.delete()
    }
}