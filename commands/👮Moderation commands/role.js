const message = require("../../events/guild/messageCreate");
const guildModel = require('../../models/guildSchema')

module.exports = {
    name: 'role',
    permissions: ["ADMINISTRATOR", "MANAGE_ROLES"],
    cooldown: 0,
    description: "Grant roles to people.",
    usage: "role <@person> <role>",
    async execute(message, args, cmd, client, Discord){

        const target = message.mentions.users.first();
if(!args.length) return message.channel.send(':x:You need to mention someone to give a role to!');
const role = args.slice(1).join(" ");

let roletarget = message.guild.roles.cache.find(role => role.name === args[1]);
let memberTarget= message.guild.members.cache.get(target.id);
if(!target) return message.reply(':x:Dis dude is not even real.');
if(!role) return message.reply(':x:Dis aint a real role bruh')
 try{
await memberTarget.roles.add(roletarget.id);
 const giveEmbed = new Discord.MessageEmbed()
 .setColor('#15ff00')
 .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
 .setTitle(`<a:check:854289501148020747>Succesfully given the role @${role} to ${target.tag}`)
  .setFooter(`Role given by: ${message.author.tag}`)
 message.channel.send({embeds: [giveEmbed]});
 let lc = await guildModel.findOne({guildID: message.guildId});
 if(!lc.logschannel) return
 if(!lc) return
 const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
 if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

 const logEmbed = new Discord.MessageEmbed()
 .setColor('#e3b938')
 .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
 .setTitle(`added the role *${role}*  to @${target.username}`)
 .setTimestamp();
 return logs.send({embeds: [logEmbed]})
 }catch(err){
     console.log(err)
    message.reply("I don't have permissions to do that!")
 }
 
} 
}