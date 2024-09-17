const Discord = require('discord.js');
const { min } = require('moment');
module.exports = {
    name: 'emoji',
    aliases: [],
    cooldown: 0,
    description: 'Shows a list off al the emojis in the server',
    usage: "serverinfo",
     async execute(message, args, cmd, client, Discord, profileData){
       if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        const charactersPerMessage = 2000;
          const emojis = message.guild.emojis.cache.map((e) => {
            return `**|** ${e} **-** \`\\${e}\``;
           });
           const numberOfMessages = Math.ceil(emojis.length / charactersPerMessage);

            let inline = true
            let sicon = message.guild.iconURL({ dynamic: true});
            let serverembed = new Discord.EmbedBuilder()
.setColor("#00ff00")
            .setThumbnail(sicon)
            .setAuthor({name: message.guild.name})
            .setDescription(emojis.join("\n"))
              .setFooter({text: `📆Created ${message.guild.createdAt}`});

                        //for (i = 0; i < numberOfMessages; i++) {
                          message.channel.send(
                            {embeds: [serverembed]}

                          );
                         //}
     }
    }