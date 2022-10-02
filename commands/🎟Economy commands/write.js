const Discord = require('discord.js')

const profileModel = require("../../models/profileSchema");

module.exports = {
    name: 'write',
    aliases: ['news'],
    cooldown: 60,
    permissions: [],
    description: 'Write an article for moniy.',
    usage: "write",
    async execute(message, args, cmd, client, discord, profileData){

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

        const userData = await profileModel.findOne({ userID: message.author.id});
        fsuc = [
            "You wrote an article about glasses that give you supowerpowers and everyone bought it!",
            "You wrote about Justin Biebers secret relationship everyone believed!",
            "You wrote about a free Tesla giveaway and you got payed good money for it!"
            ]
        gsuc = [
            "Your wrote about the stock market prices and it kinda went viral!",
            "You wrote about the weather in Florida, nothing new but people read it!",
            "You wrote about carbon emission in China a bunch of people read it."
            ]
        tsuc = [
            "Your wrote about Linus tech tips new build, it went viral!",
            "You wrote about the new revolutionary cooling technology!",
            "You wrote about the new 4000 series."
            ]
        psuc = [
            "Your wrote about Donald Trumps hair.",
            "You wrote about why repbulicans rock!",
            "You wrote about why you should not like corruption."
            ]
        if(0 >= userData.inv.typewriter) return message.reply('you dont have a pen.')
        const replies = [
            {name: "fake", emojiName: "📢Fake News ", chance: 40, max: 5000, min: 1000, sucess: fsuc, fail: "You kinda got arrested for missinformation..."},
            {name: "global", emojiName: "🌍Global News ", chance: 10, max: 2000, min: 250, sucess: gsuc, fail: "It turn out, all of China isn't actually on fire..."},
            {name: "tech", emojiName: "⌨️Tech News ", chance: 20, max: 3000, min: 500, sucess: tsuc, fail: "Somewhy a bunch of people didn't like your article about GVIDIA"},
            {name: "politics", emojiName: "🗣️Political News ", chance: 40, max: 1000, min: 800, sucess: psuc, fail: "Some communist's raided your article and disliked it..."},
        ]
        const result = Math.floor(Math.random() * 15) + 1;
        const replyEmbed = new Discord.MessageEmbed()
            .setTitle("🗞️What kind of article do you wan't to write?")
            .setColor("BLUE")
            .addFields(
                replies.map(r=>{
                    return{
                        name: r.emojiName,
                        value: `Write \`${r.name}\` if you wan't to choose this kind of news.`
                    }
                })
            )
        message.channel.send({embeds: [replyEmbed]})
        const filter = m => m.author.id === message.author.id;
        const collector = await message.channel.createMessageCollector({
            max: 1,
            filter,
            time: 1000 * 30
        })
    let replied = false
    
        collector.on('collect', async m =>{
            replies.forEach(async r=>{
            if(m.content.toLowerCase() == r.name) {
                replied = true
                const addmoniy = Math.floor(Math.random() * r.max - r.min) + r.min;
                const randomer = Math.floor(Math.random() * 100)
                console.log(randomer.toString() + " " + r.chance)
                if(r.chance >= randomer) {
                    const failEmbed = new Discord.MessageEmbed()
                        .setTitle("Your article was kinda bad, and your pen broke.")
                        .setColor("RED")
                        .setDescription(r.fail)
                    m.channel.send({embeds: [failEmbed]})

                    buytem(message.author.id, 1, "pen")
                        return
                }
                await profileModel.findOneAndUpdate({

                    userID: message.author.id
                    }, {
                        $inc: {
                    moniy: addmoniy,
                        },
                }
                );
                const result = Math.floor(Math.random() * r.sucess.length);
                const fitEmbed = new Discord.MessageEmbed()
                    .setColor('#fff85f')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`Your article was a succes!`)
                    .setDescription(`${r.sucess[result]}\nYou got \`${addmoniy}\` moniy.`)
                    .setColor("GREEN")
                m.channel.send({embeds: [fitEmbed]});
            }
                
                })
                if(replied == false) return m.reply(`\`${m}\` isn't a valid article type...`)
        collector.on('end', message =>{return})
        })  
    },
};