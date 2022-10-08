const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggest something and let ppl vote on it.")
    .addStringOption(option => option.setName("suggestion").setDescription("What do you wanna suggest?").setRequired(true)),

    run: async (client, interaction, args) => {

        let ss = await guildModel.findOne({guildID: interaction.guildId});
        if(!ss) return interaction.reply('suggestions channel does not exist!');
        if(!ss.suggestionschannel) return interaction.reply('suggestions channel does not exist!');
         const channel = interaction.guild.channels.cache.find(channel => channel.name === ss.suggestionschannel)
         if(ss.suggestionschannel === null || ss.suggestionschannel == "" || !ss.suggestionschannel) return

        let messageArgs = args.getString("suggestion")
        const embed = new EmbedBuilder()
        .setColor('#eac322')
        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setDescription(messageArgs)
        .setFooter({text: `${interaction.user.id}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
        .setTimestamp()

        channel.send({embeds: [embed]}).then((msg) =>{
            msg.react('<a:notCheck:854289501094281236>');
            msg.react('<a:check:854289501148020747>');
            interaction.reply({content: "<a:check:854289501148020747> suggested", ephemeral: true})
        }).catch((err)=>{
            throw err;
        });

	}
}

