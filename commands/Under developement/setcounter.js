const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "setcounter",
    description: "Set a server's counter",
    aliases: ["sc", "setc"],
    cooldown: 0,
    permisssions: ["MANAGE_SERVER"],
    usage: "setc <channel>",
    dev: true,

    async execute(message, args, cmd, client, Discord) {
        if(!message.guild) return message.reply("You can't use this command in **DM**'s❗")
        if(!args[0]) return message.channel.send('Please provide a valid counter type! \nYou can do `members`, `bots` or `total`');
        if(!args[1]) return message.channel.send('Please provide a channel name.')
        const channel = client.channels.cache.find(channel => channel.name === (args.slice(1).join(" ")))
        if(!channel) return message.channel.send('Please provide a valid channel')
        if(args[0] === 'total'){
            
                    await guildModel.findOneAndUpdate({
            guildId: message.guildId,
        },{
            $set: {counterc: args[1],}
        });

            message.channel.send(`Succesffully set new counter for ${args[0]} to **#${args[1]}**`)
        }
        if(args[0] === 'members'){
            await guildModel.findOneAndUpdate({
                guildId: message.guildId,
            },{
                $set: {counterm: args[1],}
            });
    
            message.channel.send(`Succesffully set new counter for ${args[0]} to **#${args[1]}**`)
        }
        if(args[0] === 'bots'){
  
            await guildModel.findOneAndUpdate({
                guildId: message.guildId,
            },{
                $set: {counterb: args[1],}
            });
    
            message.channel.send(`Succesffully set new counter for ${args[0]} to **#${args[1]}**`)
        } else{
            message.channel.send('Invalid counter type.')
        }   
    }
}