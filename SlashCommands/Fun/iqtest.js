const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("iqtest")
    .setDescription("Whats your iq?"),

    run: async (client, interaction, args) => {

        const result = Math.floor(Math.random() * 200); 
        const certainty = Math.floor(Math.random() * 100)
    
        const embed = new EmbedBuilder() 
            .setTitle(`${interaction.user.tag} Your IQ is...`)
            .setColor('Aqua')
            .addFields(
                {name: 'Certainty:', value: `${certainty.toString()}%`},
                {name: 'IQ:', value: result.toString()}
                )
        await interaction.reply({embeds: [embed]});

	}
}

