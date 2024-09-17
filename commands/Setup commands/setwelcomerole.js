const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "setwelcomerole",
    description: "Set a server's prefix",
    aliases: ["swr", "setwelcomer"],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "setwelcomer <channel>",

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a new welcomerole❗');
        const role = args.slice(0).join(" ");
                const welcomeRole = message.guild.roles.cache.find(role => role.name === (args.slice(0).join(" ")));
        if(!welcomeRole) return message.channel.send(':x:There is no such role with this name❗')
       
        await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {welcomerole: args[0],}
        });

        message.channel.send(`<a:check:854289501148020747>Succesffully set new welcome role to **${role}**`)
        console.log(role)
    }
}