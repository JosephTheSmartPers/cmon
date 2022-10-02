const { CommandInteraction } = require("discord.js");

const { ButtonBuilder, ActionRowBuilder, Client, Message, MessageEmbed, PermissionFlagsBits, SlashCommandBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")
//const { MessageButton } = require('discord-buttons')
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban someone.")
    .addUserOption(option => option.setName('user').setRequired(true).setDescription('Who u wanna ban?'))
    .addStringOption(option => option.setName('reason').setDescription('Reason for ban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),    

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
    interaction.reply({content: `Are you sure you want to ban ${member}`, components: [row]})
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
        if(id === "no") ButtonInteraction.first().reply("Ban canceled.")
        if(id === "yes"){
            let reason = interaction.options.getString("reason");
            try{
                await memberTarger.ban();
                }catch(err){
                    console.log(err)
                    interaction.followUp("Missing Permissions :x:")
                    return
                }
            if(!reason) reason = 'Unspecified';
            
            const banEmbed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: member.username,iconURL: member.displayAvatarURL({ dynamic: true })})
            .setTitle(`🔨has been banned from: ${interaction.guild.name}.`)
             .setFooter({text: `Reason: ${reason}`})
             .setFooter({text: `By: ${interaction.user.username}`})
             .setTimestamp();
             ButtonInteraction.first().reply({embeds: [banEmbed]})


            const warn1Embed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: member.username, iconURL: member.displayAvatarURL({ dynamic: true })})
            .setTitle(`You have been banned from: ${interaction.guild.name}`)
             .setFooter({text: `Reason: ${reason}`})
            member.send({embeds: [warn1Embed]})
            let lc = await guildModel.findOne({guildID: interaction.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

            const logEmbed = new EmbedBuilder()
            .setColor('#e3b938')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
            .setTitle(`banned ${member.username} from ${interaction.guild.name}`)
            .setFooter({text: reason})
            .setTimestamp();
            logs.send({embeds: [logEmbed]})
        }
    })

        } else {
        message.reply('Cant ban that member.')
    }

    }
}