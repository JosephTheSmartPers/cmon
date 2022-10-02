const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")
const ms = require('ms');
const profileModel = require("../../models/profileSchema");
const updater = require("../../handlers/timeupdater")

module.exports = {
    cooldown: "20",
    ...new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for some money (get rich)."),
    run: async (client, interaction, args) => {

        const randomNumber = Math.floor(Math.random() * 100) + 1;

        const response = await profileModel.findOneAndUpdate({
            userID: interaction.user.id,
        }, 
        {
            $inc: {
                moniy: randomNumber,
            }
        }
        );

        const begEmbed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTitle(`You just got ${randomNumber} moniy!:coin:`)
        interaction.reply({embeds: [begEmbed]});

	}
}

