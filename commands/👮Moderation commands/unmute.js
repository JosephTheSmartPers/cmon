const guildModel = require('../../models/guildSchema')

module.exports = {
    requiredPermissions: ["ADMINISTRATOR", "UNMUTE_MEMBERS"],
    name: 'unmute',
    cooldown: 0,
    description: "Unmute people.",
    usage: "unmute <@person>",
    async execute(message, args, cmd, client, Discord){
        const target = message.mentions.users.first();
        if(target){
            const mutedrole = await guildModel.findOne({ guildId: message.guildId}).muterole;
            const memberrole = await guildModel.findOne({ guildId: message.guildId}).welcomerole;
            if(mutedrole === null) return message.reply('You havent set the muted role yet you can set it by doing **-smr <role name>**')
            if(memberrole === null) return message.reply('you havent set the member (welcome) role yet, you can do it by doing **-swr <role>**')
            let mainRole = message.guild.roles.cache.find(role => role.name === memberrole);
            let muteRole = message.guild.roles.cache.find(role => role.name === mutedrole);

            let memberTarget= message.guild.members.cache.get(target.id);

            memberTarget.roles.add(mainRole.id);
            memberTarget.roles.remove(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> Has been 🔉unmuted, wonder why...`);
            let lc = await guildModel.findOne({guildID: message.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

            const logEmbed = new Discord.MessageEmbed()
            .setColor('#e3b938')
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
            .setTitle(`🔉unmuted ${target.username}`)
            .setTimestamp();
                      logs.send({embeds: [logEmbed]})
        } else{
            message.channel.send('Invalid user specifeid❗');
        }
        }
}
