const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'withdraw',
    aliases: ["with", "wt", "wit"],
    cooldown: 0,
    description: 'Get ya moniy outa da bank!',
    usage: "withdraw <amount> (you can do max)",
    async execute(message, args, cmd, client, discord, profileData){

        let amount = args[0];
        const user = message.author
        const userData = await profileModel.findOne({ userID: user.id});


       if(args[0] == "all" || args[0] == "max"){
            amount = await userData.banker
        }
        if(amount % 1 !=0 || amount <= 0 || !args[0]) return message.reply('you cant withdraw a number like this!');
        try{
            await profileModel.findOneAndUpdate(
                            {
                userID: user.id,
                },
                {
                    $inc: {
                moniy: amount,
                banker: -amount,
                    },
            }
            );
        }catch(err){
            console.log(err)
        }
        const withEmbed = new Discord.EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`Succesfully deposited \`${amount}\` money <a:Check:831956237305643069>!`)
        message.channel.send({embeds: [withEmbed]});

    },
};