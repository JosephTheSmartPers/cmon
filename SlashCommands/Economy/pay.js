const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Give someone money (why would you do that?).")
    .addUserOption(option => option.setName("user").setDescription("Who you wanna give your life savings to?").setRequired(true))
    .addNumberOption(option => option.setName('amount').setDescription('Amount of money (leave blank for all)').setMinValue(1)),

    run: async (client, interaction, args) => {

        const target = interaction.options.getUser("user")
        const user = interaction.user
        const userData = await profileModel.findOne({ userID: user.id});
        const targetdata = await profileModel.findOne({ userID: target.id})
        const amount = interaction.options.getNumber("amount") || userData.moniy

        async function pay(person, amount){
            await profileModel.findOneAndUpdate({
                userID: person,
                }, 
                { $inc: {
                    moniy: amount,
                },
            });
        }

        pay(user.id, amount * -1)
        pay(target.id, amount)

        const withEmbed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`💵Succesfully given ${amount} moniy to ${target.tag}`)
            .setFooter({text: target.tag, iconURL: target.displayAvatarURL({ dynamic: true})})
        interaction.reply({embeds: [withEmbed]});

	}
}

