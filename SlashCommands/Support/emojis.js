const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("emojis")
    .setDescription("See info bout the emojis on this server.")
    .setDMPermission(false),

    run: async (client, interaction, args) => {
        let sicon = interaction.guild.iconURL({ dynamic: true});
        const emojis = interaction.guild.emojis.cache.map((e) => {
            return `**|** ${e} **-** \`\\${e}\``;
           });

        let serverembed = new EmbedBuilder()
            .setColor("#00ff00")
            .setThumbnail(sicon)
            .setAuthor({name: interaction.guild.name})
            .setFooter({text: `📆Created ${interaction.guild.createdAt}`})
            .setDescription(
                emojis.join("\n")
            )

        interaction.reply({embeds: [serverembed]})

	}
}

