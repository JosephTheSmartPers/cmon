const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, Colors } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("cembed")
    .setDescription("Create an embed.")
    .addStringOption(option => option.setName('title').setDescription('The title of the embed.').setRequired(true).setMaxLength(255))
    .addStringOption(option => option.setName('color').setDescription('Set the color of the embed').addChoices(
        {name: "Aqua", value: "Aqua"},
        {name: "Blue", value: "Blue"},
        {name: "Blurple", value: "Blurple"},
        {name: "Dark Aqua", value: "DarkAqua"},
        {name: "Dark Blue", value: "DarkBlue"},
        {name: "Darker Grey", value: "DarkerGrey"},
        {name: "Dark Gold", value: "DarkGold"},
        {name: "Dark Green", value: "DarkGreen"},
        {name: "Dark Grey", value: "DarkGrey"},
        {name: "Dark Navy", value: "DarkNavy"},
        {name: "Dark Orange", value: "DarkOrange"},
        {name: "Dark Purple", value: "DarkPurple"},
        {name: "Dark Red", value: "DarkRed"},
        {name: "Fuchsia", value: "Fuchsia"},
        {name: "Gold", value: "Gold"},
        {name: "Green", value: "Green"},
        {name: "Grey", value: "Grey"},
        {name: "Light Grey", value: "LightGrey"},
        {name: "Navy", value: "Navy"},
        {name: "Orange", value: "Orange"},
        {name: "Purple", value: "Purple"},
        {name: "Red", value: "Red"},
        {name: "White", value: "White"},
        {name: "Yellow", value: "Yellow"}
    ))
    .addStringOption(option => option.setName('descripton').setDescription('The description of the embed').setMaxLength(4095))
    ,


    run: async (client, interaction, args) => {

        let color = interaction.options.getString("color") || "Default"
        let title = interaction.options.getString("title")
        let description = interaction.options.getString("description")

        let embed = new EmbedBuilder()

        if(description) embed.setDescription(description)
        embed.setColor(color)
        embed.setTitle(title)

        interaction.reply({content: "Sent embed<a:Check:831956237305643069>", ephemeral: true})

        interaction.channel.send({embeds: [embed]})

	}
}

