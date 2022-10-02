const Discord = require('discord.js')
const moment = require('moment');
module.exports = {
    name: 'userinfo',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
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
if(userFlags.includes("HOUSE_BRAVERY")){
  dbadges.push("<:Bravery:849670819645751367>")
}
if(userFlags.includes("HOUSE_BRILLIANCE")){
  dbadges.push("<:Brilliance:849670844074033193>")
}
if(userFlags.includes("HOUSE_BALANCE")){
  dbadges.push("<:Balance:849670792408727612>")
}
if(userFlags.includes("EARLY_SUPPORTER")){
  dbadges.push("<:Suporter:849670947102916648>")
}
if(userFlags.includes("EARLY_VERRIFIED_BOT_DEVELOPER")){
  dbadges.push("<:Botdev:849670993051385876>")
}
if(userFlags.includes("EMPLOYEE")){
  dbadges.push("<:Employee:849671009723351071>")
}
if(userFlags.includes("PARTNER")){
  dbadges.push("<:Partner:849671115978047548>")
}
if(userFlags.includes("HYPESQUAD_EVENTS")){
  dbadges.push("<:HypeSquad_Events:849671067898216508>")
}
if(userFlags.includes("NITRO")){
  dbadges.push("<:Nitro:849671100689678348>")
}
if(userFlags.includes("BOOSTING")){
  dbadges.push("<:Boosting:849670967755276298>")
}
if(userFlags.includes("VERIFIED_BOT")){
  dbadges.push("<:Bot:829386756871946280>")
}
const badges = {
  HOUSE_BRAVERY: "<:Bravery:849670819645751367>",
  HOUSE_BRILLIANCE: "<:Brilliance:849670844074033193>",
  HOUSE_BALANCE: "<:Balance:849670792408727612>",
  EARLY_SUPPORTER: "<:Suporter:849670947102916648>",
  EARLY_VERRIFIED_BOT_DEVELOPER: "<:Botdev:849670993051385876>",
  EMPLOYEE: "<:Employee:849671009723351071>",
  PARTNER: "<:Partner:849671115978047548>",
  HYPESQUAD_EVENTS: "<:HypeSquad_Events:849671067898216508>",
  NITRO: "<:Nitro:849671100689678348>",
  BOOSTING: "<:Boosting:849670967755276298>"

}
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
               let embed = new Discord.MessageEmbed()
                    //.setAuthor(member.user.username)
                    .setThumbnail((target.displayAvatarURL({ dynamic: true})))
                    .setColor("#00ff00")
                    .addField("Full Username", `${member.user.tag}`, inline)
                    .addField("🆔ID", member.user.id, inline)
                    .addField("👤Nickname", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "❌ None"}`, true)
                    .addField(`\:robot:Bot`, `${bot}`,inline, true)
                    .addField("🛏️Status", `${status[member.presence.status]}`, inline, true)
                    .addField(`❓Platform`, `${statuss}`, true)
                    .addField("🎮Playing", `${member.presence.game ? `🎮 ${member.user.presence.game.name}` : "❌ Not playing"}`,inline, true)
                    .addField(`🧾Roles(${member.roles.cache.size -1})`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "❌ No Roles"}`, true)
                    .addField('💳Permissions', `${parms}`)
                    .addField("🎖️Badges", dbadges.join(" "), true)
                    .addField("🗓️Joined Discord At", member.user.createdAt.toString())
                    .addField("🕰️Joined server at", moment(member.joinedTimestamp).toString())
                    .setFooter(`ℹ️Information about ${member.user.username}`)
                    .setTimestamp()
                    
                message.channel.send({embeds: [embed]});

                message.delete();
    }
}