module.exports = {
    name: 'spam',
    cooldown: 0,
    aliases: [],
    permissions: [],
    description: "Spam (forbidden)",
   async execute(message, args, cmd, client, Discord){

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
                    message.channel.send('V');
                    message.channel.send('i');
                    message.channel.send('r');
                    message.channel.send('u');
                    message.channel.send('s');
                    }, 2000);
            }
        })
        collector.on('end', collected =>{
rusure.delete()
        })
        
    }


}