const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("message")
    .setDescription("Make it look like someone else sent a message.")
    .addUserOption(option => option.setName('user').setDescription('Who do you wanna impersonate.').setRequired(true))
    .addStringOption(option => option.setName('message').setDescription('What do you want him to say').setRequired(true)),

    run: async (client, interaction, args) => {

        const user = interaction.options.getUser("user")
        let reason = interaction.options.getString('message')

                const warnEmbed = new EmbedBuilder()
                .setColor('36393f')
                .setAuthor({name: user.username, iconURL:user.displayAvatarURL({ dynamic: true })})
                .setFooter({text: `${reason}`})
                interaction.reply({content: "Done with the thing.", ephemeral: true})
                await interaction.channel.send({embeds: [warnEmbed]})

	}
}

