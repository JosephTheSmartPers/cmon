const ms = require('ms');
module.exports = {
    name: 'remind',
    cooldown: 0,
    permisssions: [],
    description: "Remind yourself in a certain amount of time..",
    usage: "remind <time> <text>",
    execute(message, args, cmd, client, Discord){

        if(args[0]){
            let remider = args.slice(1).join(" ");

            if(!remider) remider = 'Unspecified';





            const remindEmbed = new Discord.MessageEmbed()
    .setColor('#22ff00')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`⏰Reminder set for ${ms(ms(args[0]))}!`)
     .setDescription(`Reminder: ${remider}`)
     .setTimestamp()
    message.channel.send({embeds: [remindEmbed]});

            setTimeout(function(){

                const remind0Embed = new Discord.MessageEmbed()
                .setColor('#22ff00')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`⏰Your reminder has expired for ${ms(ms(args[0]))}!`)
                 .addFields(
                     {name: `Reminder:`, value: `<@${message.author.id}> ${remider}`}
                     )
                 .setTimestamp()
                message.channel.send({embeds: [remind0Embed]});
            }, ms(args[0]));
        } else{
            message.channel.send(':x:You didnt specify the amount of time for your reminder.');
        }
    }
}