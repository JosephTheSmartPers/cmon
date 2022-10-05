const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')
const ProfileGuildModels = require('../../models/profileGuildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("warn")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers, PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    .setDescription("Warn someone.")
    .addUserOption(option => option.setName("user").setDescription("The user you want to warn.").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Why did you warn the poor man?")),

    run: async (client, interaction, args) => {

        const user = interaction.options.getUser("user")
        let reason = interaction.options.getString("reason") || "Unspecified"

        if(user.bot) return interaction.reply('WAIT A SECOND NO WARNING BOTS BRUHHH.');

        let number = 4

        let data = await ProfileGuildModels.findOne({ userID: user.id, serverID: interaction.guildId});
        let r;
        
        if(data && data.warnings === null ){
            await ProfileGuildModels.findOneAndUpdate({
                userID: user.id,
                serverID: interaction.guildId,
            },{
                $set: {warnings: 1,}
            });
        }

        if(data === null) {
            
            let guildProfile = await ProfileGuildModels.create({
                userID: user.id.toString(),
                serverID: interaction.guildId.toString(),
                xp: 0,
                level: 0,
                warnings: 1,
            });
            guildProfile.save();
        
            const warningEmbed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`has been been warned.`)
                .setFooter({text: `Reason: ${reason}`})
            await interaction.reply({embeds: [warningEmbed]})
            
            const warn1Embed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`You have been warned in ${interaction.guild.name}`)
                .setFooter({text: `Reason: ${reason}`})
            user.send({embeds: [warn1Embed]})
        }

        if(data !== null && data.warnings != null){
            await ProfileGuildModels.findOneAndUpdate({
                userID: user.id,
                serverID: interaction.guildId,
            },{
                $inc: {warnings: 1,}
            });
            
            const warnEmbed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`has been been warned.`)
                .setFooter({text: `Reason: ${reason}\nThis is his *${data.warnings + 1}.* warn`})
            await interaction.reply({embeds: [warnEmbed]})

            const warn1Embed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`You have been warned in ${interaction.guild.name}`)
                .setFooter({text: `Reason: ${reason}`})
            user.send({embeds: [warn1Embed]})

            let lc = await guildModel.findOne({guildID: interaction.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
            const logEmbed = new EmbedBuilder()
                .setColor('#e3b938')
                .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
                .setTitle(`warned ${user.username}`)
                .setFooter({text: `Reason: ${reason}`})
                .setTimestamp();
            logs.send({embeds: [logEmbed]})
        }

	}
}

