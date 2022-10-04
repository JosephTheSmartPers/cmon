const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Claim a ticket.")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    run: async (client, interaction, args) => {

        let user = interaction.user

        const newEmbed = new Discord.EmbedBuilder()
       .setAuthor( {name:user.tag, iconURL: user.displayAvatarURL({ dynamic: true })} )
       .setColor('#15ff00')
       .setTitle('Claimed<a:Check:831956237305643069>')
       .addFields(
           {name: `Ticket clamied by: ${user.tag}`, value: 'Any other mods, please dont write anything here from now on'}
       )
       .setFooter({text: 'Mod has arrived'})
       .setTimestamp()
       interaction.channel.send({embeds: [newEmbed]});

       interaction.reply({content: "Claim successfull<a:Check:831956237305643069>", ephemeral: true})

       let lc = await guildModel.findOne({guildID: interaction.guildId});
       if(!lc.logschannel) return
       if(!lc) return
       const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
       if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

       const logEmbed = new Discord.EmbedBuilder()
       .setColor('#e3b938')
       .setAuthor( {name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })} )
       .setTitle(`claimed \`#${interaction.channel.name}\``)
       .setTimestamp();
             logs.send({embeds: [logEmbed]})

	}
}

