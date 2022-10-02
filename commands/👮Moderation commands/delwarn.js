const ProfileGuildModels = require('../../models/profileGuildSchema')
const guildModel = require('../../models/guildSchema')

module.exports = {
    name: "delwarn",
    permissions: ["ADMINISTRATOR"],
    aliases: ["deletewarn", "deletewarns"],
    cooldown: 0,
    description: "Delete a member's warnings",
    usage: "delwarn <@person>",

    async execute(message, args, cmd, client, Discord, profileData){
        
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Ya didnt mention anyone m8❗');

        if(user.bot) return message.channel.send('SOMEONE ARREST THIS MAN HE TRYNA WARN BOTS!👮');

        if(user.id === message.author.id) return message.channel.send('Wait you cant clear ya own warnings hehe:x:');

        let data = await ProfileGuildModels.findOne({ userID: user.id, serverID: message.guildId});
        
        if(data && data.warnings === null ){
            await ProfileGuildModels.findOneAndUpdate({
                userID: user.id,
                serverID: message.guildId,
            },{
                $set: {warnings: 0,}
            });
        }
        if(data === null) {
            
            let guildProfile = await ProfileGuildModels.create({
                userID: user.id.toString(),
                serverID: message.guildId.toString(),
                xp: 0,
                level: 0,
                warnings: 0,
            });
            guildProfile.save();
        }
        await ProfileGuildModels.findOneAndUpdate({
            userID: user.id,
            serverID: message.guildId,
        },{
            $set: {warnings: 0,}
        });

        const delwarnEmbed = new Discord.MessageEmbed()
        .setColor('#fff85f')
        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
        .setTitle(`has been cleared of all his warns<a:Check:831956237305643069>.`)
         .setFooter(`By: ${message.author.username}`)
         message.channel.send({embeds: [delwarnEmbed]})
         let lc = await guildModel.findOne({guildID: message.guildId});
         if(!lc.logschannel) return
         if(!lc) return
         const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
         if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

         const logEmbed = new Discord.MessageEmbed()
         .setColor('#e3b938')
         .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
         .setTitle(`deleted all the warns of ${user.username}`)
         .setTimestamp();
               logs.send({embeds: [logEmbed]})
    }
}