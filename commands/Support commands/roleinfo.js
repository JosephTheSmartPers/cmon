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
        let gRole = message.mentions.roles.first() || message.guild.roles.cache.find(role => role.name === args.join(" "))

        if(!gRole) return message.reply("Specify a role❗");

        if(!gRole) return message.reply("Couldn't find that role❗");
    
        const status = {
            false: "❌No",
            true: "✅Yes"
          }
        console.log(gRole.iconURL())
        let roleemebed = new Discord.EmbedBuilder   ()
        .setColor(gRole.hexColor)
        .addFields(
            {name: "💳ID", value: gRole.id, inline: true},
            {name: "Name", value: gRole.name, inline: true},
            {name: "<:Botdev:849670993051385876>Mention", value: `\`<@${gRole.id}>\``, inline: true},
            {name: "🎨Color", value: gRole.hexColor, inline: true},
            {name: "👥Members", value: gRole.members.size.toString(), inline: true},
            {name: "⬆️Position", value: (gRole.position-1).toString(), inline: true},
            {name: "📄Hoisted", value: status[gRole.hoist], inline: true},
            {name: "Mentionable", value: status[gRole.mentionable], inline: true},
            {name: "🛠️Managed", value: status[gRole.managed], inline: true},
            {name: "👑Permissions:",  value: ` ${"`"}${gRole.permissions.toArray().join(" `|` ")}${"`"}`}
        )
        .setThumbnail(gRole.iconURL())
       
        
        message.channel.send(({embeds: [roleemebed]})
        
        );
     }
    }