const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "setpersonalvc",
    description: "Set a channel that if you join, will create a personal channel for you",
    aliases: ["setvc", "setpersonal", "setvoice"],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "setvc <id or name of voicechat>",

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a new channel❗');
        let channel = message.guild.channels.cache.find(channel => channel.name === args[0])
        if(!channel) channel = message.guild.channels.cache.find(channel => channel.id === args[0])
        if(!channel) return message.channel.send(`:x:There is no such channel in this server called **${args[0]}**❗`)
  
        if(!channel.isVoice()) message.reply("This isn't a voicechannel.")
        await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {voicechannel: channel.id,}
        });
    
        console.log("new ")
        await message.channel.send(`<a:check:854289501148020747>Succesffully set new channel to **${args[0]}**`)
    }
}