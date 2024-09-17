const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

const cheerio = require('cheerio');
import('got');
const { stringify } = require('querystring');
var urban = require('urban')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("definition")
    .setDescription("Gets the urban dictionary definition for anything.")
    .addStringOption(option => option.setName("word").setDescription("The word you want to search the dictionary for.").setRequired(true)),

    run: async (client, interaction, args) => {

        const thing = args.getString("word")
        res = urban(thing);

        res.first(function(json) {
            const embed = new EmbedBuilder()
                .setTitle(`Results for *${thing}*`)
                .addFields(
                    {name: "Definition", value: json.definition},
                    {name: "Example", value: json.example}
                )
                .setFooter({text: `Published on ${json.written_on}`})
                .setColor("Orange")
            interaction.reply({embeds: [embed]})
        });

	}
}

