const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("Turns text into a QR code.")
    .addStringOption(option => option.setName("message").setDescription("The message you want to hide in the QR code.").setRequired(true)),

    run: async (client, interaction, args) => {

        let qrcode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${args.getString("message").split(" ").join("%20")}`
        interaction.reply({content: "Sent qrcode<a:Check:831956237305643069>", ephemeral: true})
        let msg = interaction.channel.send(`Searching minecraft for \`${ip}\` <a:loading:1026905223031173150>`)
        const embed = new EmbedBuilder()
            .setTitle("Scan this!")
            .setImage(qrcode)
            .setColor("NotQuiteBlack")
        msg.edit({content: "",embeds: [embed]})

	}
}

