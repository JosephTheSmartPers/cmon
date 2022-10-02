const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, AttachmentBuilder } = require("discord.js")

const profileModel = require("../../models/profileSchema");
const ProfileGuildModels = require("../../models/profileGuildSchema");

const canvacord = require("canvacord");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("rank")
    .setDescription("See what's your rank.")
    .addUserOption(option => option.setName('user').setDescription("(Optional), see someone else's rank.")),

    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("user") || interaction.user

        let userdata =  await ProfileGuildModels.findOne({ userID: user.id, serverID: interaction.guildId});
        const level = userdata.level
        const xp = userdata.xp

        const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png'}))
            .setCurrentXP(xp)
            .setRequiredXP(1000)
            .setStatus(interaction.member.presence.status)
            .setProgressBar('#FFA500', "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setLevel(level)
        rank.build()
            .then(data => {
                const attacment = new AttachmentBuilder(data, 'funny.png')
                interaction.reply({files: [attacment]})
            })
	}
}

