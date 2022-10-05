const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("pfp")
    .setDescription("Get the profile picture of someone.")
    .addUserOption(option => option.setName("user").setDescription("(Leave empty for your pfp) get someones pfp!")),

    run: async (client, interaction, args) => {

        const user = args.getUser("user") || interaction.user;
              
        const newEmbed = new EmbedBuilder()
            .setColor('#00ffec')
            .setFooter({text: `🖼️Profile of ${user.tag}`})
            .setImage(user.displayAvatarURL({ dynamic: true}))
        interaction.reply({embeds: [newEmbed]});

	}
}

