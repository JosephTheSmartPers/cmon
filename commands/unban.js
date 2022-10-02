const Discord = require('discord.js');

module.exports = {
    name: "unban",
    permissions: ["BAN_MEMBERS"],
    description: "Unban someone",
    aliases: [],
    cooldown: 0,

          async execute(message,args, cmd, client, Discord, profileData){

    

    let bannedMember = await bot.fetchUser(args[0])
    if(!bannedMember) return message.channel.send("**No targeted user :warning:.**")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No Reason given!"

    
    message.delete()
    try {
        message.guild.unban(bannedMember, {reason: reason})
        const with1Embed = new Discord.MessageEmbed()
        .setColor('#fff85f')
        .setAuthor(bannedMember.tag, bannedMember.displayAvatarURL({ dynamic: true }))
        .setTitle(`has been unbanned from ${message.guild.name}.`)
                message.channel.send(with1Embed);
    } catch(e) {
        console.log(e.message)
    }
}

}