const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const yoMamma = require('yo-mamma').default;
module.exports = {
    ...new SlashCommandBuilder()
    .setName("joe")
    .setDescription("yes"),

    run: async (client, interaction, args) => {

        let insult = yoMamma();
        
            interaction.reply(insult.replace("Yo mama", "momma"))

	}
}

