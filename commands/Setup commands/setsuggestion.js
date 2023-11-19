const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "setsuggestion",
    description: "Set a server's suggestions channel",
    aliases: ["sets", "ss"],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "sets <channel>",

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a new suggestions channel❗');

        const channel = message.guild.channels.cache.find(channel => channel.name === args[0])
        if(!channel) return message.channel.send(`:x:There is no such channel in this server called **${args[0]}**❗`)
       
         await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {suggestionschannel: args[0],}
        });
        message.channel.send(`<a:check:854289501148020747>Succesffully set new suggestions channel to **${args[0]}**`)
    }
}