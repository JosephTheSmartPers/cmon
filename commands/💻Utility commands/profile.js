module.exports = {
    name: "profile",
    permissions: ["SPEAK"],
    description: "Shows the pfp of the tagged person",
    usage: "pfp <@person>",
    aliases: ["pfp", "profilepic", "profilepicture", "avatar"],
    cooldown: 0,

          async execute(message,args, cmd, client, Discord, profileData){
            const user = message.mentions.users.first() || message.author;
              
              const newEmbed = new Discord.MessageEmbed()
              .setColor('#00ffec')
              .setFooter(`🖼️Profile of ${user.tag}`)
              .setImage(user.displayAvatarURL({ dynamic: true}))
       
      
             message.channel.send({embeds: [newEmbed]});
        }
}