const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: "20",
    ...new SlashCommandBuilder()
    .setName("labour")
    .setDescription("Do some good ol labour."),

    run: async (client, interaction, args) => {

        const userData = await profileModel.findOne({ userID: interaction.user.id});

        const bmoniy = Math.floor(Math.random() * 300) + 1;
        const result = Math.floor(Math.random() * 10) + 1;

        if(result == 9){
            const bremebed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setTitle(`You kinda passed out from the labour, you aint getting money.`)
            return interaction.reply({embeds: [bremebed]});
        } else {
            await profileModel.findOneAndUpdate({
                userID: interaction.user.id
                }, {
                    $inc: {
                moniy: bmoniy,
                    },
                }
            );

    const broomEmbed = new EmbedBuilder()
        .setColor('#fff85f')
        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTitle(`You did some labour and you got ${bmoniy} moniy!`)

    return interaction.reply({embeds: [broomEmbed]});

        }
	}
}

