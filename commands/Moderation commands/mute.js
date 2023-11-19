const ms = require('ms');
const guildModel = require('../../models/guildSchema')

module.exports = {
    name: 'mute',
    cooldown: 0,
    permisssions: ["ManageRoles"],
    description: "Mute people.",
    usage: 'mute <@person> [time]',
   async execute(message, args, cmd, client, Discord){
        const target = message.mentions.users.first();
        const guildIDD = message.guildId
        if(target){
            
            const mutedrole = await guildModel.findOne({guildID: message.guildId});
            const memberrole = await guildModel.findOne({guildID: message.guildId})
            if(mutedrole === null || !mutedrole.muterole) return message.reply('You havent set the muted role yet you can set it by doing **-smr <role name>**')
            if(memberrole === null ||! memberrole.welcomerole) return message.reply('you havent set the member (welcome) role yet, you can do it by doing **-swr <role>**')
            let muteRole = message.guild.roles.cache.find(role => role.name === memberrole.muterole);
            let mainRole = message.guild.roles.cache.find(role => role.name === mutedrole.welcomerole);

            let memberTarget= message.guild.members.cache.get(target.id);

            if(!args[1]){
            try{
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                        }catch(err){
                            return message.reply("I don't have permissions to change roles ):")
                        }
                message.channel.send(`🔇<@${memberTarget.user.id}> got muted, he aint talkin no more.`);
                
                let lc = await guildModel.findOne({guildID: guildIDD});
                if(!lc.logschannel) return
                if(!lc) return
                const logss = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
                if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
    
                const logEmbed = new Discord.EmbedBuilder()
                .setColor('#e3b938')
                .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true})})
                .setTitle(`🔇muted ${target.username}`)
                .setTimestamp();
                          logss.send({embeds: [logEmbed]})
                return
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`🔇<@${memberTarget.user.id}> got muted, he aint talkin no more for ⏰${ms(ms(args[1]))}.`);

            setTimeout(function(){
                memberTarget.roles.add(mainRole.id);
                memberTarget.roles.remove(muteRole.id);
                message.channel.send(`🔇<@${memberTarget.user.id}> has been unmuted, your timer⏰ has expired.`);
            }, ms(args[1]));
            console.log(guildIDD)
            let lc = await guildModel.findOne({guildID: guildIDD});
 if(!lc.logschannel) return
 if(!lc) return
 const logss = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
 if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

            const logEmbed = new Discord.EmbedBuilder()
            .setColor('#e3b938')
            .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            .setTitle(`🔇muted ${target.username} for ⏰${args[1]}`)
            .setTimestamp();
                      logss.send({embeds: [logEmbed]})
        } else{
            message.channel.send('Invalid user specifeid.');
        }
    }
}