const Discord = require('discord.js');


module.exports = {
    name: "verify",
    description: "Verify a member if he is sus",
    permissions: ["ADMINISTRATOR"],
    aliases: [],
    cooldown: 0,
    usage: "verify",
    dev: true,
    async execute(message,args, cmd, client, Discord, profileData) {
        const target = message.mentions.users.first();
        const channel = message.guild.channels.cache.find(channel => channel.name === 'verify')
        if(!channel){
            const verifychannel = await message.guild.channels.create(`verify`);
            console.log(verifychannel)
            verifychannel.updateOverwrite(message.guild.id, {
                SEND_MESSAGE: true,
                VIEW_CHANNEL: true,
            
            });
            message.reply("you didn't have a verify channel but I created one for you, please don't delete it just move it if you wan't to. Thanks! (try the command again)")
                    }
        if(!target) return message.reply("You need to tag someone you wan't to verify!")
        const code = Math.floor(Math.random() * 9999) + 1000;
        const verifyembed = new Discord.MessageEmbed()
                .setTitle(`${target.tag} need to verify yourself in ${message.guild.name}`)
        .addField('Follow the instructions.', `Put this code **${code}** into <#${channel.id}>, you have 1 minute!`)
        .setColor('GREEN')
        
        target.send({embeds: [verifyembed]}) 
        const filter = m => m.author.id === target.id;
   
        channel.awaitMessages(filter, {
            max: 1,
             time: 60000
             
            }).then(collected => {

        
       console.log(code)
        if(collected.first().content == code){
            channel.send('Valid code!')
            message.author.send(`${target.username} has been verrified!`)
        } else {
            channel.send('Invalid code!')
        }   

        
   
    
    });


    }
}