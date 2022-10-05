const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const ProfileGuildModels = require('../../models/profileGuildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("warnings")
    .setDMPermission(false)
    .setDescription("Check someone's warnings.")
    .addUserOption(option => option.setName("user").setDescription("(Leave empty for your warnings) The user you want to see the warnings of.")),

    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("user") || interaction.user

        let userdata =  await ProfileGuildModels.findOne({ userID: user.id, serverID: interaction.guildId});
        let warningss
        if(!userdata || userdata.warnings == null) warningss = 0;
        else warningss = userdata.warnings
        const warningsEmbed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`has ${warningss} warning(s)`)
        interaction.reply({embeds: [warningsEmbed]});

	}
}

