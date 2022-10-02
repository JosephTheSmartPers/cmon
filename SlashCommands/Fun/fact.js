const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")
const facts = require('fun-facts');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Sends an interesting fact🗞️."),

    run: async (client, interaction, args) => {

    const res = facts.get()
      const embed = new EmbedBuilder()
      .setTitle("🗞️Fact:")
      .setDescription(res.fact)
      interaction.reply({embeds: [embed]})

	}
}

