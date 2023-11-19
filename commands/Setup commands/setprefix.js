const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "setprefix",
    description: "Set a server's prefix",
    aliases: [],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "setprefix <prefix>",

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a new prefix❗');

        if(args[1]) return message.channel.send("The prefix can't have two spaces");

        
        await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {prefix: args[0],}
        });



        message.channel.send(`<a:check:854289501148020747>Succesffully set new prefix to **${args[0]}**`)
    }
}