const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, AttachmentBuilder } = require("discord.js")

const canvacord = require('canvacord');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("trigger")
    .setDescription("Someone is getting triggered.")
    .addUserOption(option => option.setName("user").setDescription("Someone gon get triggered.")),

    run: async (client, interaction, args) => {

        const target = args.getUser("user") || interaction.user;

            let targetavatar = target.displayAvatarURL({dynamic: false, format: "png"});

            let image1 = await canvacord.Canvas.trigger(targetavatar);

            let triggered1 = await new AttachmentBuilder(image1, "triggered.gif")

           interaction.reply({files: [triggered1]});

	}
}

