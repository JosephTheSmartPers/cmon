const Discord = require("discord.js");
module.exports = {
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    name: 'pban',
    aliases: [],
    cooldown: 0,
    description: "Ban people FOREVER.",
    usage: "pban <@person>",
    dev: true,
    execute(message,args, cmd, client, discord, profileData){
        const member = message.mentions.users.first();
        if(member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.ban();

            const pbanEmbed = new Discord.MessageEmbed()
            .setColor('#e10000')
            .setAuthor(member.tag, member.displayAvatarURL({ dynamic: true}))
            .setTitle('Pban succesfull!<a:check:854289501148020747>')
            .setDescription('Do not delete this message❗')
            .setFooter(`Member banned by: ${message.author.username}`)
            .setTimestamp()
            message.channel.send({embeds: [pbanEmbed]});
            let lc = "none"
            const logs = message.guild.channels.cache.find(channel => channel.name === lc)
            if(lc === null) return

            const logEmbed = new Discord.MessageEmbed()
            .setColor('#e3b938')
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
            .setTitle(`pbanned ${member.username} from ${message.guild.name}`)
            
                        logs.send({embeds: [embed]})

            




        }else{
            message.channel.send('I cant ban that memeber.');
        }

    }
}            
