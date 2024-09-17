module.exports = {
    permissions: ["SPEAK"],
    name: 'status',
    aliases: [], 
    cooldown: 0,
        description: 'Set bots status',
    execute(message, args, cmd, client, Discord){
        
        if(message.author.id !== '483519738727759873'){
            const fraudEmbed = new Discord.MessageEmbed()
            .setColor('#e10000')
            .setTitle('Error!')
            .addFields(
                 {name: 'Barnibot entered an error trying to execute this command', value: 'You are a fraud, you are not God (@Barni) so this command is not for you!'}
            )
            .setFooter('🛑')
            message.channel.send({embeds: [fraudEmbed]}) 
        }

        if(message.author.id !== '483519738727759873') return;
        if (args[0] === "playing"){
            types = 0
        } else if (args[0] === "streaming") {
            types = 1
        } else if (args[0] === "listening") {
            types = 2
        } else if (args[0] === "watching") {
            types = 3
        } else if (args[0] === "competing") {
            types = 5
        } else if (args[0] === "reset") {
        
            client.user.setActivity(`-help`, {type:"LISTENING"}) //you can change that to whatever you like
        
            return message.channel.send('Status changed succesfully')
        
        } else {
            return message.channel.send('Invalid activity type.')
        }
        //here you tell the bot what the activity is
            args.shift()
            content = args.join(' ')
            client.user.setPresence({
                activity: {
                    name: content,
                    type: types
                }
            })
            message.channel.send('Status changed succesfully')

 
    }
   

    
}