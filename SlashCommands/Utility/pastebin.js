const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const hastebin = require('hastebin-gen');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("pastebin")
    .setDescription("Upload text to a pastebin site.")
    .addStringOption(option => option.setName("text").setDescription("This will be uploaded.").setRequired(true).setMinLength(100)),

    run: async (client, interaction, args) => {

        interaction.reply(`Creating link <a:loading:1026905223031173150>`)

        let haste = interaction.options.getString("text")

        hastebin(haste).then(r => {
            const embed = new EmbedBuilder()
                .setTitle(`📁Posted to Hastebin at this URL`)
                .setURL(r)
            interaction.editReply({content: "", embeds: [embed]})
        })
	}
}

