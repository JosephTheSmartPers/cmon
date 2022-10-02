const Discord = require('discord.js');
const { min } = require('moment');
module.exports = {
    name: 'serverinfo',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Shows info about the server!',
    usage: "serverinfo",
     async execute(message, args, cmd, client, Discord, profileData){
       if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        const verlvl = {
            'NONE': "None",
            'LOW': "Low",
            'MEDIUM': "Medium",
            'HIGH': "(╯°□°）╯︵ ┻━┻",
            'HIGHEST': "(ノಠ益ಠ)ノ彡┻━┻"
          }
          const charactersPerMessage = 2000;
          const emojis = message.guild.emojis.cache.map((e) => {
            return `**|** ${e} **-** \`:${e.name}:\``;
           });
           const numberOfMessages = Math.ceil(emojis.length / charactersPerMessage);
        
            let inline = true
            let sicon = message.guild.iconURL({ dynamic: true});
            let serverembed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setThumbnail(sicon)
            .setAuthor(message.guild.name)
            .setDescription(
              emojis.join(" ")
             )
            .addField("🧾Name", message.guild.name, inline)
            .addField("💳ID", message.guild.id, inline)
            .addField("👑Owner", `<@${message.guild.ownerId}>`, inline)
            .addField("✅Verification Level", verlvl[message.guild.verificationLevel],inline)
            .addField("👥Members", `${message.guild.memberCount}`, inline)
            .addField("<:Employee:849671009723351071>Roles", message.guild.roles.cache.size.toString(), inline)
            .addField("🗨️Channels", message.guild.channels.cache.size.toString(), inline)
            .addField("😆Emoji's", `${message.guild.emojis.cache.size}`, inline)
            .addField("🖼Sticker's", `${message.guild.stickers.cache.size}`, inline)
            .addField("<:Boosting:849670967755276298>Boost level", message.guild.premiumTier)
            .addField("📅You Joined", message.member.joinedAt.toString())
                        .setFooter(`📆Created ${message.guild.createdAt}`);
                       
                        //for (i = 0; i < numberOfMessages; i++) {
                          message.channel.send(
                            {embeds: [serverembed]}
                           
                          );
                         //}
     }
    }