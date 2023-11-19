const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");

module.exports = {
    name: 'drugs',
    aliases: ['abuse'],
    cooldown: 40,
    permissions: [],
    description: 'Do drugs (this is not encouragement).',
    usage: "drugs",
    async execute(message, args, cmd, client, discord, profileData){

           
        const userData = await profileModel.findOne({ userID: message.author.id});

        if(message.guild.id == '826787118104838184') return message.reply('no drugs in dis server ):')
if(userData.drugs == 0) return message.reply('u dont have drugs lol.')

         await profileModel.findOneAndUpdate({

                    userID: message.author.id
                    }, {
                        $inc: {
                    drugs: -1,
                        },
                }
                );

                const result = Math.floor(Math.random() * 100);

                //In case my man died
                if(2 >= result){

                    let lostMoney = Math.floor(Math.random() * 2000) + 1;
                    if(lostMoney > userData.moniy) lostMoney = userData.moniy

                    try{

                        await profileModel.findOneAndUpdate({

                            userID: message.author.id
                            }, {
                                $inc: {
                            moniy: -lostMoney,
                                },
                        }
                        );

                    }catch(err){
                        return message.author.reply("Something went wrong...")
                    }
                    const drugEmbed = new Discord.EmbedBuilder()
                        .setColor('#fff85f')
                        .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                        .setTitle(`You succesfully did drugs💉 and died... U lost ${lostMoniy} moniy`)
                    return message.channel.send({embeds: [drugEmbed]})
                }

                else{
                    const drugEmbed = new Discord.EmbedBuilder()
                        .setColor('#fff85f')
                        .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                        .setTitle(`Succesfully used some quality drugs and you survived💉!`)

                return message.channel.send({embeds: [drugEmbed]})
                }
    },
};