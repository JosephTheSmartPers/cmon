const guildModel = require('../../models/guildSchema')

module.exports = {
    permissions: ["MANAGE_MESSAGES"],
    name: 'snap',
    aliases: ['nuke', 'del'],
    cooldown: 0,
    description: "Snap messages out of existence.",
    usage: "snap <amount>",
   async execute(message, args, cmd, client, Discord) {
       let channel = await message.channel
       if(!args[0]) return message.reply("Type the command and then the amount of messages you want to thanos snap❗");
       if(isNaN(args[0])) return message.reply("❗Please enter a number❗");

        if(args[0] > 100) return message.reply("Heyo dat over da amount!(200 is da most)");
        if(args[0] < 1) return message.reply("You cant just unthanos snap:x:, oh wait... You can, but not here!");

        const number = args[0];

        await message.delete()

        await message.channel.messages.fetch({limit: number}).then(async messages =>{
           await message.channel.bulkDelete(messages);
        }).catch(_e => {
                        channel.send('Those messages might be older than 14 days, so I cant delete them.')
                        return
        })
        const snapEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) )
        .setColor('#4be128')
        .setTitle('Whiped out half the discord.')
        .addFields(
             {name: 'Succesfully snaped the discord<a:check:854289501148020747>', value: `You turned ${args[0]} messages to dust.`}
        )
        .setFooter('💣')
        message.channel.send({embeds: [snapEmbed]});
        let lc = await guildModel.findOne({guildID: message.guildId});
        if(!lc.logschannel) return
        if(!lc) return
        const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
        if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
        if(logs){
        const logEmbed = new Discord.MessageEmbed()
        .setColor('#e3b938')
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
        .setTitle(`snapped ${number} messages in #${message.channel.name}`)
        .setTimestamp();
                logs.send({embeds: [logEmbed]})

    }
}
}