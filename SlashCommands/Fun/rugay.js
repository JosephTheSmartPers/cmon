const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("rugay")
    .setDescription("The gay-o-meter will speak.")
    .addUserOption(option => option.setName('user').setDescription('Use the gay-o-meter on someone (u can leave it blank to test urself).')),

    run: async (client, interaction, args) => {

        const randomNumber = Math.floor(Math.random() * 100) + 1;

        let target = interaction.options.getUser("user")

        if(!target) target = interaction.user

        let embed = new EmbedBuilder()
        .setAuthor({name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true})})
        .setColor('#ffa700')
        .addFields(
            {name:`The gay-o-meter says my man ${target.username}`, value: `is ${randomNumber}% gay :rainbow_flag:`}
        )

        interaction.reply({embeds: [embed]})

	}
}

