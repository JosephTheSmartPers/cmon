const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Do this with -poll."),

    run: async (client, interaction, args) => {

        let embed = new EmbedBuilder()
        .setTitle("Do this with `-poll`")
        .setDescription("For mor help do `-poll help`")
        .setColor("Red")

        interaction.reply({embeds: [embed]})

	}
}

