const { CommandInteraction } = require("discord.js");

const { ButtonBuilder, ActionRowBuilder, Client, Message, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, ButtonStyle } = require("discord.js")
//const { MessageButton } = require('discord-buttons')
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick someone.")
    .addUserOption(option => option.setName('user').setRequired(true).setDescription('Who u wanna kick🔴?'))
    .addStringOption(option => option.setName('reason').setDescription('Reason for kick.'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers), 

    run: async (client, interaction, args) => {


        const member = interaction.options.getUser('user');
        const memberTarger = await interaction.guild.members.cache.get(member.id);
        if(member){
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("yes")
                .setLabel("Yes")
                .setStyle(ButtonStyle.Success)
                .setDisabled(false),
                new ButtonBuilder()
                .setCustomId("no")
                .setLabel("No")
                .setStyle(ButtonStyle.Danger)
                .setDisabled(false)
                
            )
    interaction.reply({content: `Are you sure you want to kick🔴 ${member}`, components: [row]})
    const filter = (inte) => {
        if(inte.user.id === interaction.user.id) return true
        return
    }
    const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: 1,
    });
    collector.on("end", async (ButtonInteraction) => {
       
        const id = ButtonInteraction.first().customId
        if(id === "no") ButtonInteraction.first().reply("Kick🔴 canceled.")
        if(id === "yes"){
            let reason = interaction.options.getString("reason");
            try{
                await memberTarger.kick();
                }catch(err){
                    console.log(err)
                    interaction.followUp("Missing Permissions :x:")
                    return
                }
            if(!reason) reason = 'Unspecified';
            
            const banEmbed = new Discord.EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: member.username,iconURL: member.displayAvatarURL({ dynamic: true })})
            .setTitle(`🔨has been kicked from: ${interaction.guild.name}.`)
             .setFooter({text: `Reason: ${reason}`})
             .setFooter({text: `By: ${interaction.user.username}`})
             .setTimestamp();
             ButtonInteraction.first().reply({embeds: [banEmbed]})


            const warn1Embed = new Discord.EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: member.username, iconURL: member.displayAvatarURL({ dynamic: true })})
            .setTitle(`You have been kicked from: ${interaction.guild.name}`)
             .setFooter({text: `Reason: ${reason}`})
            member.send({embeds: [warn1Embed]})
            let lc = await guildModel.findOne({guildID: interaction.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

            const logEmbed = new Discord.EmbedBuilder()
            .setColor('#e3b938')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
            .setTitle(`kicked🔴 ${member.username} from ${interaction.guild.name}`)
            .setFooter({text: reason})
            .setTimestamp();
            logs.send({embeds: [logEmbed]})
        }
    })

        } else {
        message.reply('Cant kick that member.')
    }

    }
}