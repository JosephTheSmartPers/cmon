const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')
const ms = require('ms');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("unmute")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    .setDescription("unmute someone.")
    .addUserOption(option => option.setName("user").setDescription("Who you want to mute?").setRequired(true)),

    run: async (client, interaction, args) => {
        const user = interaction.user
        const target = interaction.options.getUser("user")
        const guildIDD = interaction.guildId
        
            
        const mutedrole = await guildModel.findOne({guildID: guildIDD});
        const memberrole = await guildModel.findOne({guildID: guildIDD})
        if(mutedrole === null || !mutedrole.muterole) return interaction.reply('You havent set the muted role yet you can set it by doing **-smr <role name>**')
        if(memberrole === null ||! memberrole.welcomerole) return interaction.reply('you havent set the member (welcome) role yet, you can do it by doing **-swr <role>**')
        let muteRole = interaction.guild.roles.cache.find(role => role.name === memberrole.muterole);
        let mainRole = interaction.guild.roles.cache.find(role => role.name === mutedrole.welcomerole);

        let memberTarget = interaction.guild.members.cache.get(target.id);
        try{
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
        }catch(err){
            return interaction.reply("I don't have permissions to change roles ):")
        }
            interaction.reply(`<@${memberTarget.user.id}> Has been 🔉unmuted, wonder why...`);
                
            let lc = await guildModel.findOne({guildID: guildIDD});
            if(!lc.logschannel) return
            if(!lc) return
            const logss = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
    
            const logEmbed = new EmbedBuilder()
                .setColor('#e3b938')
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true})})
                .setTitle(`🔉unmuted ${target.username}`)
                .setTimestamp();
            logss.send({embeds: [logEmbed]})
            return

	}
}

