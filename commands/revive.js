module.exports = {
    name: 'revive',
    cooldown: 0,
    aliases: [],
    permissions: ["MANAGE_CHANNELS"],
    description: "Spam (forbidden)",
   async execute(message, args, cmd, client, Discord){
        if(message.author.id != "483519738727759873") return
        let user = message.mentions.users.first()
        if(!user) return message.reply("Tag someone to revive")
        const filter = m => m.author.id === m.author.id;
        const rusure = await message.reply('Are you sure you wanna execute `spam`? \nReply with `yes` or `no`')
         const collector = await message.channel.createMessageCollector({
            max: 1,
            filter,
            time: 1000 * 20
        })
        collector.on('collect', message =>{
            if(message.content.toLowerCase() == "no") return message.reply("Spam canceled")
            else if(message.content.toLowerCase() == "yes"){
                setInterval(() =>{
                        user.send(`<@!${user.id}>`)
                    }, 2000);
            }
        })
        collector.on('end', collected =>{
rusure.delete() 
        })
        
    }


}