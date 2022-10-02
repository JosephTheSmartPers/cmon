const Discord = require('discord.js')

module.exports = {
    name: 'roleinfo',
    aliases: ['ri '],
    cooldown: 0,
    permissions: [],
    description: 'Shows info about a role!',
    usage: "roleinfo <role name>",
     async execute(message,args, cmd, client, Discord){
        const inline = true
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        let role = args.join(" ")
        
        if(!role) return message.reply("Specify a role❗");
        
        const gRole = message.guild.roles.cache.find(role => role.name === args.join(" "))
              console.log(gRole)
        if(!gRole) return message.reply("Couldn't find that role❗");
    
        const status = {
            false: "❌No",
            true: "✅Yes"
          }
        console.log(gRole.iconURL())
        let roleemebed = new Discord.MessageEmbed()
        .setColor(gRole.hexColor)
        .addField("💳ID", gRole.id, inline )
        .addField("Name", gRole.name, inline)
        .addField("<:Botdev:849670993051385876>Mention", `<@${gRole.id}>`, inline)
        .addField("🎨Hex", gRole.hexColor, inline)
        .addField("👥Members", gRole.members.size.toString(), inline)
        .addField("⬆️Position", gRole.position.toString(), inline)
        .addField("📄Hoisted", status[gRole.hoist], inline)
        .addField("Mentionable", status[gRole.mentionable], inline)
        .addField("🛠️Managed", status[gRole.managed], inline)
        .addField("👑Permissions:",  ` ${"`"}${gRole.permissions.toArray().join(" `|` ")}${"`"}`)
        .setImage(gRole.iconURL())
       
        
        message.channel.send(({embeds: [roleemebed]})
        
        );
     }
    }