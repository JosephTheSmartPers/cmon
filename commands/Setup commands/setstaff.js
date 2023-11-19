const guildModel = require('../../models/guildSchema')

module.exports = {
    name: "setstaff",
    description: "Set a server's staff role",
    aliases: ["sstaff"],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "setstaff <role>",

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a new staff role❗');
        const role = args.slice(0).join(" ");
                const staffrole = message.guild.roles.cache.find(role => role.name === (args.slice(0).join(" ")));
        if(!staffrole) return message.channel.send('There is no such role with this name❗')
       
        await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {staffrole: args[0],}
        });


      

        message.channel.send(`<a:check:854289501148020747>Succesffully set new staff role to **${role}**`)
         }
}