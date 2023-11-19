const Discord = require('discord.js');
const guildModel = require('../../models/guildSchema')

module.exports = {
    name: 'kick',
    cooldown: 0,
    permissions: ["KickMembers"],
    description: "Kick people.",
    usage: "kick <@person>",
    async execute(message, args, cmd, client, Discord){
        const member = message.mentions.users.first();
        if(member){
            let reason = args.slice(1).join(" ");

            if(!reason) reason = 'Unspecified:x:';
            const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            const memberTarger = message.guild.members.cache.get(member.id);
            try{
           await memberTarger.kick()
            }catch(err){
                message.reply("I don't have permissions for that!🔴")
                return
            }
            const kick1Embed = new Discord.EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`has been kicked from: ${message.guild.name}🔴. For: ${reason}.`)
            .setFooter({text: `By: ${message.author.username}`})
             .setTimestamp();
            message.channel.send({embeds: [kick1Embed]})


            const kickEmbed = new Discord.MessageEmbed()
            .setColor('#fff85f')
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`You have kicked from: ${message.guild.name}🔴`)
             .setFooter({text: `Reason: ${reason}`})
            member.send({embeds: [kickEmbed]});
            let lc = await guildModel.findOne({guildID: message.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

            const logEmbed = new Discord.MessageEmbed()
            .setColor('#e3b938')
            .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            .setTitle(`kicked ${member.username} from ${message.guild.name}🔴`)
            .setFooter(reason)
            .setTimestamp();
                     logs.send({embeds: [logEmbed]})
            
        }else{
            message.channel.send('I cant kick that person, sad...:x:');
        }
    }
}
