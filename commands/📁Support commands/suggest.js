const Discord = require('discord.js')
const guildModel = require('../../models/guildSchema')

module.exports = {
    name: 'suggestions',
    aliases: ["suggest", "suggestion"],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Creates a suggestion!',
    usage: "sugest <suggestions>",
    async execute(message, args, cmd, client, discord){
        let ss = await guildModel.findOne({guildID: message.guildId});
        if(!ss) return message.channel.send('suggestions channel does not exist!');
        if(!ss.suggestionschannel) return message.channel.send('suggestions channel does not exist!');
         const channel = message.guild.channels.cache.find(channel => channel.name === ss.suggestionschannel)
         if(ss.suggestionschannel === null || ss.suggestionschannel == "" || !ss.suggestionschannel) return

        let messageArgs = args.join(' ');
        const embed = new discord.EmbedBuilder()
        .setColor('#eac322')
        .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setDescription(messageArgs)
        .setFooter({text: `${message.author.id}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
        .setTimestamp()

        channel.send({embeds: [embed]}).then((msg) =>{
            msg.react('<a:notCheck:854289501094281236>');
            msg.react('<a:check:854289501148020747>');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
    }
}