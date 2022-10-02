const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Gets the balance of you or someone else🧾.")
    .addUserOption(option => option.setName('user').setDescription('Check the balance of someone (leave empty for yours).')),

    run: async (client, interaction, args) => {

        let target = interaction.options.getUser('user')
        if(!target) target = interaction.user
        let targetData = await profileModel.findOne({ userID: target.id});
        if(!targetData) return interaction.reply(`No account found in the database for \`${target.tag}\``)

        let balEmbed = new EmbedBuilder()
        .setColor("#fff85f")
        .setAuthor({name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true })})
        .setTitle(`${target.tag}'s balance is...`)
        .addFields(
            {name: 'Wallet💰:', value: `${targetData.moniy}`},
            {name: 'Bank🏦', value: `${targetData.banker}`}

       )
       .setFooter({text: `This dude: \`${interaction.user.tag}\` scanned da balance!`})

       interaction.reply({embeds: [balEmbed]})
	}
}

