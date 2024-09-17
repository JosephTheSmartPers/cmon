const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "setlogs",
    description: "Set a server's logschannel",
    aliases: ["sl", "setl"],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "setlogs <channel>",

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a new logs channel❗');
        const channel = message.guild.channels.cache.find(channel => channel.name === args[0])
        if(!channel) return message.channel.send(`:x:There is no such channel in this server called **${args[0]}**❗`)
  
        await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {logschannel: args[0],}
        });
    
        console.log("new ")
        await message.channel.send(`<a:check:854289501148020747>Succesffully set new logs channel to **${args[0]}**`)
    }
}