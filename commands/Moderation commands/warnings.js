const profileModel = require('../../models/profileSchema')
const ProfileGuildModels = require('../../models/profileGuildSchema')

module.exports = {
    name: "warnings",
    aliases: [],
    description: "Check a users warnings",
    cooldown: 0,
    usage: "warnings <@person>",
    async  execute(message, args, cmd, client, Discord, profileData){
        
        const user = message.mentions.users.first() ||  message.author;
        if(!user) return message.channel.send('You need to tag someone after the command!')

        let userdata =  await ProfileGuildModels.findOne({ userID: user.id, serverID: message.guildId});
        let warningss
        if(!userdata || userdata.warnings == null) warningss = 0;
        else warningss = userdata.warnings
         const warningsEmbed = new Discord.EmbedBuilder()
             .setColor('#fff85f')
             .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
             .setTitle(`has ${warningss} warning(s)`)
         message.channel.send({embeds: [warningsEmbed]});

    }
}