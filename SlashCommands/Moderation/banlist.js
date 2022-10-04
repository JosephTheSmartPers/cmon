const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("banlist")
    .setDescription("Shows a list of banned people."),

    run: async (client, interaction, args) => {

        const fetchBans = await interaction.guild.bans.fetch()
        let bmem = (await fetchBans)
        .map((member) => member.user.tag)
            .join(" \n");
            if(!bmem){
                bmem = ":x: No banned members!"
            }
            const embed = new EmbedBuilder()
                .setTitle(`📃List of banned members:`)
                .setDescription(bmem)
            interaction.reply({embeds: [embed]})

	}
}

