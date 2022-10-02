const Discord = require('discord.js');

const profileModel = require('../../models/profileSchema')

const guildModel = require('../../models/guildSchema')

const ProfileGuildModels = require('../../models/profileGuildSchema')

module.exports = {
    name: "warn",
    description: "Warn a member",
    aliases: ["ADMINISTRATOR", "KICK_MEMBERS", "BAN_MEMBERS"],
    cooldown: 0,
    usage: "warn <@person>",
    async execute(message,args, cmd, client, Discord, profileData) {


        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!message.guild) return message.reply('This aint a server what the fried chicken breast?')
        if(!user) return message.channel.send('Please tag a member.');

        if(user.bot) return message.channel.send('WAIT A SECOND NO WARNING BOTS BRUHHH.');

        let number = 4


        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let data = await ProfileGuildModels.findOne({ userID: user.id, serverID: message.guildId});
        let r;
        
        if(data && data.warnings === null ){
            await ProfileGuildModels.findOneAndUpdate({
                userID: user.id,
                serverID: message.guildId,
            },{
                $set: {warnings: 1,}
            });
        }
        if(data === null) {
            
            let guildProfile = await ProfileGuildModels.create({
                userID: user.id.toString(),
                serverID: message.guildId.toString(),
                xp: 0,
                level: 0,
                warnings: 1,
            });
            guildProfile.save();
        
                     const warningEmbed = new Discord.MessageEmbed()
            .setColor('#fff85f')
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setTitle(`has been been warned.`)
             .setFooter(`Reason: ${reason}`)
            await message.channel.send({embeds: [warningEmbed]})
            const warn1Embed = new Discord.MessageEmbed()
            .setColor('#fff85f')
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setTitle(`You have been warned in ${message.guild.name}`)
             .setFooter({text: `Reason: ${reason}`})
            user.send({embeds: [warn1Embed]})
        }

        if(data !== null && data.warnings != null){
            await ProfileGuildModels.findOneAndUpdate({
                userID: user.id,
                serverID: message.guildId,
            },{
                $inc: {warnings: 1,}
            });
            
            const warnEmbed = new Discord.MessageEmbed()
            .setColor('#fff85f')
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setTitle(`has been been warned.`)
             .setFooter(`Reason: ${reason}\nThis is his *${data.warnings + 1}.* warn`)
            await message.channel.send({embeds: [warnEmbed]})

            const warn1Embed = new Discord.MessageEmbed()
            .setColor('#fff85f')
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setTitle(`You have been warned in ${message.guild.name}`)
             .setFooter(`Reason: ${reason}`)
            user.send({embeds: [warn1Embed]})
            if(data.warnings + 1 == 3) { 
                r = await message.channel.send(`${user} has already reached three warnings \nBanning in 5...`)
               const id = setInterval(() => {
                    r.edit(`${user} has already reached three warnings \nBanning in ${number}...`)
                    number --;
                    if(number == -1) clearInterval(id);
                }, 1000);
                return};

            let lc = await guildModel.findOne({guildID: message.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
            const logEmbed = new Discord.MessageEmbed()
            .setColor('#e3b938')
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
            .setTitle(`warned ${user.username}`)
            .setFooter(reason)
            .setTimestamp();
            logs.send({embeds: [logEmbed]})
           
        }
       
    }
}