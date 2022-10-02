const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'deposit',
    aliases: ["dep", "bank"],
    cooldown: 0,
    description: 'Put you money in da bank!',
    usage: "dep <amount>",
    async execute(message, args, cmd, client, discord, profileData){
        const userData = await profileModel.findOne({ userID: message.author.id});
                let amount = args[0]
                if(!amount || amount == "all" || amount == "max") amount = userData.moniy
                try{
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id,
                            },{
                            $set: {
                                moniy: userData.moniy - amount,
                            },
                            $inc: {
                                banker: amount,
                            }
                    });
                }catch(err){ return message.reply("Something went wrong...")}
                const depEmbed = new Discord.EmbedBuilder()
                    .setColor('#fff85f')
                    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                    .setTitle(`Succesfully deposited \`${amount}\` money <a:Check:831956237305643069>!`)
                message.channel.send({embeds: [depEmbed]})
    },
};
