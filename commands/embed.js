module.exports = {
    requiredPermissions: ["ADMINISTRATOR"],
    name: 'embed',
    aliases: ['mbed'],
    cooldown: 0,
    description: "Make an embed.",
    execute(message, args, cmd, client, Discord) {
       const newEmbed = new Discord.MessageEmbed()
       .setColor('#eb9e34')
       .setTitle('Introduction')
       .setDescription('[Bot Invite](https://discord.com/oauth2/authorize?client_id=836893540427759646&scope=bot&permissions=8589934591)')
             .addFields(
           {name: 'I am a bot coded by Barni', value: 'If you have any ideas for features you can dm my creator. I have have some features which you can see by doing: **-help** but we are constantly adding new features so stay tuned!'},
           {name: 'More info', value: 'If you need help, you can join the [support server](https://discord.gg/Y6a9Wq4RE2) where you can follow my developement and much more!'},
           {name: 'Also I currently have', value: `\`${client.commands.size} commands\``}
          
       )
              
message.delete()
       message.channel.send({embeds: [newEmbed]});
    }


}