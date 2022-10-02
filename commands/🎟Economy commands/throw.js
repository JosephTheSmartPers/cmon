const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");

const updater = require("../../handlers/updater")

module.exports = {
    name: 'throw',
    aliases: ['tomato'],
    cooldown: 5,
    permissions: [],
    description: 'Throw tomato at someone',
    usage: "throw <@person> [amount]",
    async execute(message, args, cmd, client, discord, profileData){

    let number = 1
    let user = message.author

    async function pay(person, amount, path){
        await profileModel.findOneAndUpdate({

            userID: person
            }, {
                $inc: {
            [path]: -amount,
                },
        }
        );
    }
    async function buytem(person, itemAmount, path){
        let inv = userData.inv
        let current = parseInt(inv[path])
        inv[path] = current - itemAmount

        await profileModel.findOneAndUpdate({
            userID: person
            }, {
                $set: {
            inv: inv,
                },
        }
        );
    }

let missed = 0
        const userData = await profileModel.findOne({ userID: message.author.id});
        if(!userData.inv) await updater(client, message.author.id)
 const target = message.mentions.users.first();


        const targetData = await profileModel.findOne({ userID: target.id});
        if(!args[0]) return message.reply('you need ta mention someone.')
        if(!target) return message.reply("You didnt tag anyone to throw the tomato at!")
        if(userData.inv.tomato == 0) return message.reply('you dont have a single tomato lol')
        if(args[1]){
        number = parseInt(args[1])
        if(number % 1 !=0 || number <= 0) return message.reply(`I'm pretty sure you can't throw \`${args[1]}\` tomato to someone...`);
        if(number > userData.inv.tomato) return message.reply(`You don't even have ${number} tomatoes.`)
        
        }
        for (let index = 0; index < number; index++) {
            const result = Math.floor(Math.random() * 10);
            if(result == 9) missed++
        }
        pay(target.id, number - missed, "moniy")
        buytem(message.author.id, number, "tomato")
        const tomatoEmbed = new Discord.EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`You threw ${number} tomato at ${target.username} but you missed ${missed} times\nhe lost ${number - missed} moniy`)
        return message.channel.send({embeds: [tomatoEmbed]});

    return message.channel.send({embeds: [tomatoEmbed]});
        
    },
};