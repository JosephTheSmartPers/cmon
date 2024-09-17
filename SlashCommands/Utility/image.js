const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')

var Scraper = require('images-scraper');

 const google = new Scraper({
    puppeteer: {
        headless: true,
      }
    })

module.exports = {
    ...new SlashCommandBuilder()
    .setName("image")
    .setDescription("Get the top image of a keyword.")
    .addStringOption(option => option.setName("image").setDescription("What do you wanna search for?").setRequired(true)),

    run: async (client, interaction, args) => {

        const image_query = interaction.options.getString("image")

        let emoji = "<a:loading:1026905223031173150>"
        interaction.reply(`Searching the internet for \`${image_query}\` ${emoji}`)

        const image_results = await google.scrape(image_query, 1);

        const memeEmbed = new EmbedBuilder()
            .setColor('#0eedff')
            .setTitle(`Here is: *${image_query}*🖼️`)
            .setImage(image_results[0].url)
        interaction.editReply({content: "", embeds: [memeEmbed]});

	}
}

