const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

const updater = require("../../handlers/updater")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("throw")
    .setDescription("Throw a tomato at someone.")
    .addUserOption(option => option.setName('user').setDescription('Who you wanna throw the fruit at?').setRequired(true))
    .addNumberOption(option => option.setName("amount").setDescription("How much tomato (optional).").setMinValue(1)),

    run: async (client, interaction, args) => {

        async function pay(person, amount, path){
            await profileModel.findOneAndUpdate({
    
                userID: person
                }, {
                    $inc: {
                [path]: -amount,
                    },
            });
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
            });
        }

        let number = interaction.options.getNumber("amount") || 1
        let missed = 0

        let user = interaction.user
        const target = interaction.options.getUser("user")
        const userData = await profileModel.findOne({ userID: user.id});
        const targetData = await profileModel.findOne({ userID: target.id});

        if(!userData.inv) await updater(client, user.id)

        
        if(userData.inv.tomato == 0) return interaction.reply('you dont have a single tomato lol')
        if(number > userData.inv.tomato) return interaction.reply(`You don't even have ${number} tomatoes.`)

        for (let index = 0; index < number; index++) {
            const result = Math.floor(Math.random() * 10);
            if(result == 9) missed++
        }

        pay(target.id, number - missed, "moniy")
        buytem(user.id, number, "tomato")
        const tomatoEmbed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`You threw ${number} tomato at ${target.username} but you missed ${missed} times\nhe lost ${number - missed} moniy`)
        return interaction.reply({embeds: [tomatoEmbed]});

	}
}

