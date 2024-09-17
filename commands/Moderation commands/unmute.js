const guildModel = require('../../models/guildSchema')

module.exports = {
    permissions: ["ManageRoles"],
    name: 'unmute',
    cooldown: 0,
    description: "Unmute people.",
    usage: "unmute <@person>",
    async execute(message, args, cmd, client, Discord){

        let guildIDD = message.guild
        const target = message.mentions.users.first();

        if(target){
        const mutedrole = await guildModel.findOne({guildID: guildIDD});
        const memberrole = await guildModel.findOne({guildID: guildIDD})
        if(mutedrole === null || !mutedrole.muterole) return message.reply('You havent set the muted role yet you can set it by doing **-smr <role name>**')
        if(memberrole === null ||! memberrole.welcomerole) return message.reply('you havent set the member (welcome) role yet, you can do it by doing **-swr <role>**')
        let muteRole = message.guild.roles.cache.find(role => role.name === memberrole.muterole);
        let mainRole = message.guild.roles.cache.find(role => role.name === mutedrole.welcomerole);

            let memberTarget= message.guild.members.cache.get(target.id);
            try{
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                    }catch(err){
                        return message.reply("I don't have permissions to change roles ):")
                    }
            message.channel.send(`<@${memberTarget.user.id}> Has been 🔉unmuted, wonder why...`);
            let lc = await guildModel.findOne({guildID: message.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

            const logEmbed = new Discord.EmbedBuilder()
            .setColor('#e3b938')
            .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            .setTitle(`🔉unmuted ${target.username}`)
            .setTimestamp();
                      logs.send({embeds: [logEmbed]})
        } else{
            message.channel.send('Invalid user specifeid❗');
        }
        }
}
