const Discord = require('discord.js')
const moment = require('moment');

const allBadges = [
    {name: "HypeSquadOnlineHouse1", badge: "<:Bravery:849670819645751367>"},
    {name: "HypeSquadOnlineHouse2", badge: "<:Brilliance:849670844074033193>"},
    {name: "HypeSquadOnlineHouse3", badge: "<:Balance:849670792408727612>"},
    {name: "PremiumEarlySupporter", badge: "<:Suporter:849670947102916648>"},
    {name: "VerifiedBotDeveloper", badge: "<:Botdev:849670993051385876>"},
    {name: "Staff", badge: "<:Employee:849671009723351071>"},
    {name: "Partner", badge: "<:Partner:849671115978047548>"},
    {name: "Hypesquad", badge: "<:HypeSquad_Events:849671067898216508>"},
    {name: "Nitro", badge: "<:Nitro:849671100689678348>"},
    {name: "Boosting", badge: "<:Boosting:849670967755276298>"},
    {name: "VerifiedBot", badge: "<:Bot:829386756871946280>"},
    {name: "BugHunterLevel1", badge: "<:Bug1:849670879621283890>"},
    {name: "BugHunterLevel2", badge: "<:Bug2:849670933731606559>"}
]

module.exports = {
    name: 'userinfo',
    aliases: [],
    cooldown: 0,
    description: 'Shows info about a person!',
    usage: "userinfo <@person>",
     async execute(message, args, cmd, client, Discord, profileData){
      if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        let inline = true
        let resence = true
        const status = {
            online: "<:online:866958444828950548>Online",
            idle: "<:idle:866958509642612767>Idle",
            dnd: "<:dnd:866958538797481994>Do Not Disturb",
            offline: "<:offline:866958479784542208>Offline/Invisible"
          }
            
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let target = message.mentions.users.first() || message.author
    
    if (member.user.bot === true) {
        bot = "✅Yes";
      } else {
        bot = "❌No";
      }
      const perms = member.permissions.toArray()
      
      const flags = await member.user.fetchFlags()
const userFlags = flags.toArray()
if(member.premiumSince){
  userFlags.push("NITRO")
}

if(member.roles.cache.some(r => r.name === "Server Booster")){
  userFlags.push("BOOSTING")
}
var dbadges = [];
if(message.guild.ownerID == member.id){
  dbadges.push("<:owner:852939417097601044>")
}

allBadges.forEach(badg =>{
    if(userFlags.includes(badg.name)){
        dbadges.push(badg.badge)
    }
})

if(dbadges.length === 0){
  dbadges.push("No badges")
}
let parms = `${perms.map(perms => `\`${perms}\``).join(" **|** ")}`
if(parms.length > 1024){
  parms = "All of them"
}
let statuss = "❌ None"
if(member.presence.clientStatus.web != undefined){
statuss = "🌐Web"
}if(member.presence.clientStatus.desktop != undefined){
statuss = "🖥️Desktop"
}
if(member.presence.clientStatus.mobile != undefined){
statuss = "📱Phone"
} 
               let embed = new Discord.EmbedBuilder()
                    //.setAuthor(member.user.username)
                    .setThumbnail((target.displayAvatarURL({ dynamic: true})))
                    .setColor("#00ff00")
                    .addFields(
                        {name: "Full Username", value: `${member.user.tag}`, inline: true},
                        {name: "ID", value: member.user.id, inline: true},
                        {name: "👤Nickname", value: `${member.nickname !== null ? `Nickname: ${member.nickname}` : "❌ None"}`, inline: true},
                        {name: `\:robot:Bot`, value: `${bot}`,inline, inline: true},
                        {name: "🛏️Status", value: `${status[member.presence.status]}`, inline, inline: true},
                        {name: `❓Platform`, value: `${statuss}`, inline: true},
                        {name: "🎮Playing", value: `${member.presence.game ? `🎮 ${member.user.presence.game.name}` : "❌ Not playing"}`,inline, true: true},
                        {name: `🧾Roles(${member.roles.cache.size -1})`, value: `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "❌ No Roles"}`, inline: true},
                        {name: "🎖️Badges", value: dbadges.join(" "), inline: true},
                        {name: '💳Permissions', value: `${parms}`},
                        {name: "🗓️Joined Discord At", value: member.user.createdAt.toString()},
                        {name: "🕰️Joined server at", value: moment(member.joinedTimestamp).toString()}
                        )
                    .setFooter({text: `ℹ️Information about ${member.user.username}`})
                    .setTimestamp()
                    
                message.channel.send({embeds: [embed]});

                message.delete();
    }
}