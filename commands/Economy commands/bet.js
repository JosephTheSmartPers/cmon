const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");

module.exports = {
    name: 'bet',
    aliases: ["gamble"],
    cooldown: 20,
    description: 'Gamble',
    usage: "bet <amount>",
    async execute(message, args, cmd, client, discord, profileData){

            async function pay(amount){
                await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                },
                {
                    $inc: {
                        moniy: amount,
                    }
                }
                );
            }

        const amount = args[0];
        if(amount % 1 !=0 || amount <= 0) return message.reply('You cant gamble a number like this:x:');
        
        if(amount > profileData.moniy) return message.reply('you dont even have that much money in ya wallet:x:, chill my man🧊!');

        const randomNumber = Math.floor(Math.random() * 5) + 1;
        const ticket = Math.floor(Math.random() * 5) + 1;

        if(randomNumber == ticket){
            const winner = amount * 2
            pay(winner)
            const begEmbed = new Discord.EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                .setTitle(`YOU JUST WON!!🎉🎉`)
                .setFooter({text: `You won ${winner} moniy💵.`})
            message.channel.send({embeds: [begEmbed]});
     } else {
        pay(amount * -1)
        message.reply(`You lost the gamble and ${amount} moniy🙁.`);
      }
    },
};


