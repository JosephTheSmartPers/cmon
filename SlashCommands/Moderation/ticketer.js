const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("ticketer")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false)
    .setDescription("Create a ticket submitter (first set ticket category with /set ticketcategory)"),

    run: async (client, interaction, args) => {

        const category = await guildModel.findOne({guildID: interaction.guild.id});
        if(!category) return interaction.reply("Try again now, I had to set some stuff up.")
        const categoryt = await interaction.guild.channels.cache.find(category => category.id === category.ticketcategory)
        if(category.ticketcategory === null) return interaction.reply("Set the ticket category first with `/set ticketcategory`")

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId("ticket")
            .setLabel("📩Create a ticket")
            .setStyle("Primary")
        )
        const embed = new EmbedBuilder()
            .setTitle("Open a Ticket")
            .setDescription("If you click the button below, a ticket will open for you!")
            .setColor("#03fc5a")
            .setAuthor({name: "powered by BarniBot", iconURL: client.user.displayAvatarURL({ dynamic: true })})
        interaction.channel.send({embeds: [embed], components: [row]}) 

        interaction.reply({content: "Created submitter<a:Check:831956237305643069>", ephemeral: true})

	}
}

