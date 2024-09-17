const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const joke = require('discord-jokes')
module.exports = {
    ...new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Please laugh."),

    run: async (client, interaction, args) => {

        joke.getRandomDadJoke (function(joke) {
            interaction.reply(joke)
            })

	}
}

