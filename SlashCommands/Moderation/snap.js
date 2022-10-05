const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("snap")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .setDescription("Snap messages out of existence.")
    .addNumberOption(option => option.setName("amount").setDescription("Amount of messages you wanna delete").setMinValue(1).setMaxValue(100).setRequired(true)),

    run: async (client, interaction, args) => {

        let channel = await interaction.channel
        let user = interaction.user
        const number = interaction.options.getNumber("amount")


        await interaction.channel.messages.fetch({limit: number}).then(async messages =>{
           await interaction.channel.bulkDelete(messages);
        }).catch(_e => {
            return interaction.reply('Those messages might be older than 14 days, so I cant delete them.')
        })

        const snapEmbed = new EmbedBuilder()
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setColor('#4be128')
            .setTitle('Whiped out half the discord.')
            .addFields(
                {name: 'Succesfully snaped the discord<a:check:854289501148020747>', value: `You turned ${number} messages to dust.`}
            )
            .setFooter({text: '💣'})
        try{
            await interaction.reply({embeds: [snapEmbed]});
        }catch(err){
            return
        }
        let lc = await guildModel.findOne({guildID: interaction.guildId});
        if(!lc.logschannel) return
        if(!lc) return
        const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
        if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
        if(logs){
        const logEmbed = new EmbedBuilder()
            .setColor('#e3b938')
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true})})
            .setTitle(`snapped ${number} messages in #${interaction.channel.name}`)
            .setTimestamp();
        logs.send({embeds: [logEmbed]})

    }

	}
}

