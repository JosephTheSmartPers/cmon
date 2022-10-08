module.exports = {
    name: "profile",
    description: "Shows the pfp of the tagged person",
    usage: "pfp <@person>",
    aliases: ["pfp", "profilepic", "profilepicture", "avatar"],
    cooldown: 0,

          async execute(message,args, cmd, client, Discord, profileData){
            const user = message.mentions.users.first() || message.author;
              
              const newEmbed = new Discord.EmbedBuilder()
              .setColor('#00ffec')
            .setFooter({text: `🖼️Profile of ${user.tag}`})
              .setImage(user.displayAvatarURL({ dynamic: true}))
       
      
             message.channel.send({embeds: [newEmbed]});
        }
}