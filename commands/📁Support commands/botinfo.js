const Discord = require('discord.js')
const os = require('os')
const cpuStat = require("cpu-stat");

    
   
               
module.exports = {
    name: 'botinfo',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Shows info about a bot!',
    usage: "botinfo",
     async execute(message, args, cmd, client, Discord, profileData){
        let { version } = require("discord.js");
        let inline = true
        let bicon = client.user.displayAvatarURL({ dynamic: true});
        let usersize = client.users.cache.size
        let chansize = client.channels.cache.size
        let uptimxd = client.uptime 
        let servsize = client.guilds.cache.size
        let botembed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setThumbnail(bicon)
        .addField("🤖Bot Name", `${client.user.username}`, inline)
        .addField("👑Bot Owner", "<@483519738727759873>", inline )
        .addField("🛡Servers", `${servsize}`, inline)
        .addField("💬Channels", `📁 ${chansize}`, inline)
        .addField("👥Users", `${usersize}`, inline)
        .addField("📚Bot Library", "Discord.js", inline)
        .addField("⚙️Commands", `${client.commands.size}`, inline)
        .addField("• Discord.js", `v${version}`, inline)
        .addField("Invite", `[Click here for invite.](https://discord.com/oauth2/authorize?client_id=836893540427759646&scope=bot&permissions=8589934591)`, inline)
        .addField("📆Created On", client.user.createdAt.toString())
                .setFooter(`ℹ️Information about: ${client.user.username}. Developed by: Barni#0811`)
       
        message.channel.send({embeds: [botembed]});
     }
    }