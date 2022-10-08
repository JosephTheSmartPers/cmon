const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const ms = require('ms');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("remind")
    .setDescription("Set a reminder for something.")
    .addNumberOption(option => option.setName("time").setDescription("Set time after you get reminded (Minutes).").setRequired(true).setMinValue(0.1))
    .addStringOption(option => option.setName("reminder").setDescription("What you wanna be reminded of?")),

    run: async (client, interaction, args) => {

        let displayTime = parseFloat(args.getNumber("time"))
        let time = (parseFloat(args.getNumber("time")) * 60 * 1000)
        let reminder = args.getString("reminder") || 'Unspecified'
        let user = interaction.user

        const remindEmbed = new EmbedBuilder()
            .setColor('#22ff00')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`⏰Reminder set for ${displayTime} minutes!`)
            .setDescription(`Reminder: ${reminder}`)
            .setTimestamp()
        await interaction.reply({embeds: [remindEmbed]});

        setTimeout(function(){

            const remind0Embed = new EmbedBuilder()
                .setColor('#22ff00')
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`⏰Your reminder has expired for ${displayTime} minutes!`)
                .addFields(
                     {name: `Reminder:`, value: `<@${user.id}> ${reminder}`}
                )
                .setTimestamp()
            interaction.followUp({embeds: [remind0Embed]});
        }, time);

	}
}

