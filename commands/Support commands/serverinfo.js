const Discord = require('discord.js');
const { min } = require('moment');
module.exports = {
    name: 'serverinfo',
    aliases: [],
    cooldown: 0,
    description: 'Shows info about the server!',
    usage: "serverinfo",
     async execute(message, args, cmd, client, Discord, profileData){
       if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        const verlvl = {
            '0': "None",
            '1': "Low",
            '2': "Medium",
            '3': "(╯°□°）╯︵ ┻━┻",
            '4': "(ノಠ益ಠ)ノ彡┻━┻"
          }
          const charactersPerMessage = 2000;
          const emojis = message.guild.emojis.cache.map((e) => {
            return `**|** ${e} **-** \`:${e.name}:\``;
           });
           const numberOfMessages = Math.ceil(emojis.length / charactersPerMessage);
        
            let inline = true
            let sicon = message.guild.iconURL({ dynamic: true});
            let serverembed = new Discord.EmbedBuilder()
.setColor("#00ff00")
            .setThumbnail(sicon)
            .setAuthor({name: message.guild.name})
            .addFields(
                  {name: "🧾Name", value: `${message.guild.name}`, inline: true},
                  {name: "💳ID", value: `${message.guildId}`, inline: true},
                  {name: "👑Owner", value: `<@${message.guild.ownerId}>`, inline: true},
                  {name: "✅Verification Level", value: `${verlvl[message.guild.verificationLevel]}`, inline: true},
                  {name: "👥Members", value: `${message.guild.memberCount}`, inline: true},
                  {name: "<:Employee:849671009723351071>Roles", value: message.guild.roles.cache.size.toString(), inline: true},
                  {name: "🗨️Channels", value: message.guild.channels.cache.size.toString(), inline: true},
                  {name: "😆Emoji's", value: `${message.guild.emojis.cache.size}`, inline: true},
                  {name: "🖼Sticker's", value: `${message.guild.stickers.cache.size}`, inline: true},
                  {name: "<:Boosting:849670967755276298>Boost level", value: `${message.guild.premiumTier}`},
                  {name: "📅You Joined", value: `${message.member.joinedAt.toString()}`},
              )

              .setFooter({text: `📆Created ${message.guild.createdAt}`});
                       
                        //for (i = 0; i < numberOfMessages; i++) {
                          message.channel.send(
                            {embeds: [serverembed]}
                           
                          );
                         //}
     }
    }