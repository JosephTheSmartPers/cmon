const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "setticket",
    description: "Set a server's ticket category",
    aliases: ["sets", "ss"],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "setticket <channel>",

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a new ticket category (id)❗');

        const channel = message.guild.channels.cache.find(category => category.id === args[0])
        if(!channel) return message.channel.send(`There is no such category in this server called **${args[0]}**❗`)
        if (channel.type != Discord.ChannelType.GuildCategory) return message.reply('That is a channels id not a categorys❗')
      
         await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {ticketcategory: channel,}
        });
        message.channel.send(`<a:check:854289501148020747>Succesffully set new ticket category to **${args[0]}**`)
    }
}