const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "setwelcomec",
    description: "Set a server's prefix",
    aliases: ["setwelcomechannel", "swc"],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "setwelcomec <channel>",

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a new welcomechannel❗');

        const channel = message.guild.channels.cache.find(channel => channel.name === args[0])
        if(!channel) return message.channel.send(`:x:There is no such channel in this server called **${args[0]}**❗`)
        
        await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {welcomechannel: args[0],}
        });

        message.channel.send(`<a:check:854289501148020747>Succesffully set new welcomechannel to **${args[0]}**`)
    }
}