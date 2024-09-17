const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')
const ProfileGuildModels = require('../../models/profileGuildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("delwarn")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false)
    .setDescription("Delete all the warnings of someone.")
    .addUserOption(option=> option.setName("user").setDescription("The user you want to clear of his warnings.").setRequired(true)),

    run: async (client, interaction, args) => {

        let target = interaction.options.getUser("user")
        let user = interaction.user

        if(user.id === target.id) return interaction.reply('Wait you cant clear ya own warnings hehe:x:');

        let data = await ProfileGuildModels.findOne({ userID: user.id, serverID: interaction.guildId});
        
        if(data && data.warnings === null ){
            await ProfileGuildModels.findOneAndUpdate({
                userID: target.id,
                serverID: interaction.guildId,
            },{
                $set: {warnings: 0,}
            });
        }
        if(data === null) {
            
            let guildProfile = await ProfileGuildModels.create({
                userID: target.id.toString(),
                serverID: interaction.guildId.toString(),
                xp: 0,
                level: 0,
                warnings: 0,
            });
            guildProfile.save();
        }
        await ProfileGuildModels.findOneAndUpdate({
            userID: target.id,
            serverID: interaction.guildId,
        },{
            $set: {warnings: 0,}
        });

        const delwarnEmbed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`has been cleared of all his warns<a:Check:831956237305643069>.`)
            .setFooter({text: `By: ${user.username}`})
        interaction.reply({embeds: [delwarnEmbed]})

        let lc = await guildModel.findOne({guildID: interaction.guildId});
        if(!lc.logschannel) return
        if(!lc) return
        const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
        if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

        const logEmbed = new EmbedBuilder()
            .setColor('#e3b938')
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true})})
            .setTitle(`deleted all the warns of ${user.username}`)
            .setTimestamp();
        logs.send({embeds: [logEmbed]})

	}
}

