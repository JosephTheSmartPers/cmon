const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')
const ms = require('ms');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("mute")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    .setDescription("Mute people.")
    .addUserOption(option => option.setName("user").setDescription("Who you want to mute?").setRequired(true))
    .addStringOption(option => option.setName("time").setDescription("The amount of time you wanna mute someone for. (minutes)").addChoices(
        {name: "60 seconds", value: "60s"},
        {name: "5 mins", value: "5m"},
        {name: "10 mins", value: "10m"},
        {name: "1 hour", value: "1h"},
        {name: "1 day", value: "1d"},
        {name: "1 week", value: "1w"}
    ))
    ,

    run: async (client, interaction, args) => {

        const target = interaction.options.getUser("user")
        const time = interaction.options.getString("time")
        const guildIDD = interaction.guildId
        
            
        const mutedrole = await guildModel.findOne({guildID: guildIDD});
        const memberrole = await guildModel.findOne({guildID: guildIDD})
        if(mutedrole === null || !mutedrole.muterole) return interaction.reply('You havent set the muted role yet you can set it by doing **-smr <role name>**')
        if(memberrole === null ||! memberrole.welcomerole) return interaction.reply('you havent set the member (welcome) role yet, you can do it by doing **-swr <role>**')
        let muteRole = interaction.guild.roles.cache.find(role => role.name === memberrole.muterole);
        let mainRole = interaction.guild.roles.cache.find(role => role.name === mutedrole.welcomerole);

        let memberTarget = interaction.guild.members.cache.get(target.id);

        if(!time){
            try{
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
            }catch(err){
                return interaction.reply("I don't have permissions to change roles ):")
            }
            interaction.reply(`🔇<@${memberTarget.user.id}> got muted, he aint talkin no more.`);
                
            let lc = await guildModel.findOne({guildID: guildIDD});
            if(!lc.logschannel) return
            if(!lc) return
            const logss = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
    
            const logEmbed = new EmbedBuilder()
                .setColor('#e3b938')
                .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
                .setTitle(`🔇muted ${target.username}`)
                .setTimestamp();
            logss.send({embeds: [logEmbed]})
            return
        }

        memberTarget.roles.remove(mainRole.id);
        memberTarget.roles.add(muteRole.id);
        interaction.reply(`🔇<@${memberTarget.user.id}> got muted, he aint talkin no more for ⏰${ms(ms(time))}.`);

        setTimeout(function(){
            memberTarget.roles.add(mainRole.id);
            memberTarget.roles.remove(muteRole.id);
            interaction.channel.send(`🔇<@${memberTarget.user.id}> has been unmuted, your timer⏰ has expired.`);
        }, ms(time));

        let lc = await guildModel.findOne({guildID: guildIDD});
        if(!lc.logschannel) return
        if(!lc) return
        const logss = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
        if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

            const logEmbed = new EmbedBuilder()
                .setColor('#e3b938')
                .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
                .setTitle(`🔇muted ${target.username} for ⏰${time}`)
                .setTimestamp();
            logss.send({embeds: [logEmbed]})


	}
}

