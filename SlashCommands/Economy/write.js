const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

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

const replies = [
    {name: "fake", emojiName: "📢Fake News ", chance: 40, max: 5000, min: 1000, sucess: fsuc, fail: "You kinda got arrested for missinformation..."},
    {name: "global", emojiName: "🌍Global News ", chance: 10, max: 2000, min: 250, sucess: gsuc, fail: "It turn out, all of China isn't actually on fire..."},
    {name: "tech", emojiName: "⌨️Tech News ", chance: 20, max: 3000, min: 500, sucess: tsuc, fail: "Somewhy a bunch of people didn't like your article about GVIDIA"},
    {name: "politics", emojiName: "🗣️Political News ", chance: 40, max: 1000, min: 800, sucess: psuc, fail: "Some communist's raided your article and disliked it..."},
]

module.exports = {
    cooldown: 60,
    ...new SlashCommandBuilder()
    .setName("write")
    .setDescription("Write an article, maybe it will do good!.")
    .addStringOption(option => option.setName('type').setDescription('What kind of article u wanna create?').setRequired(true).addChoices(
        { name: '📢Fake News ', value: 'fake' },
        { name: '🌍Global News ', value: 'global' },
        { name: '⌨️Tech News ', value: 'tech' },
        { name: '🗣️Political News ' , value: 'politics' }
    )),

    run: async (client, interaction, args) => {
        let user = interaction.user

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
        
        const userData = await profileModel.findOne({ userID: user.id});
        if(0 >= userData.inv.typewriter) return interaction.reply('you dont have a typewriter.')
        const aType = interaction.options.getString("type")

        replies.forEach(async r=>{
            if(aType == r.name) {
                replied = true
                const addmoniy = Math.floor(Math.random() * r.max - r.min) + r.min;
                const randomer = Math.floor(Math.random() * 100)
                console.log(randomer.toString() + " " + r.chance)
                if(r.chance >= randomer) {
                    const failEmbed = new EmbedBuilder()
                        .setTitle("Your article was kinda bad, and your typewriter broke.")
                        .setColor("Red")
                        .setDescription(r.fail)
                    interaction.reply({embeds: [failEmbed]})

                    buytem(user.id, 1, "typewriter")
                        return
                }
                await profileModel.findOneAndUpdate({

                    userID: user.id
                    }, {
                        $inc: {
                    moniy: addmoniy,
                        },
                }
                );
                const result = Math.floor(Math.random() * r.sucess.length);
                const fitEmbed = new EmbedBuilder()
                    .setColor('#fff85f')
                    .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                    .setTitle(`Your article was a success!`)
                    .setDescription(`${r.sucess[result]}\nYou got \`${addmoniy}\` moniy.`)
                    .setColor("Green")
                interaction.reply({embeds: [fitEmbed]});
        
            }
        })
	}
}

