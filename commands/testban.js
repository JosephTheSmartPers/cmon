const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

const { MessageButton, MessageActionRow, Client, Message} = require("discord.js")
//const { MessageButton } = require('discord-buttons')
const guildModel = require('../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a person")
    .addUserOption(option => option.setName('user').setDescription('Who u wanna ban?'))
    .addStringOption(option => option.setName('reason').setDescription('Reason for ban')),    

    run: async (client, interaction, args) => {


        const member = interaction.options.getUser('user');
        if(member){
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("yes")
                .setLabel("Yes")
                .setStyle("SUCCESS")
                .setDisabled(false),
                new MessageButton()
                .setCustomId("no")
                .setLabel("No")
                .setStyle("DANGER")
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
                    interaction.followUp("Missing Permissions :x:")
                    return
                }
            if(!reason) reason = 'Unspecified';
            const memberTarger = interaction.guild.members.cache.get(member.id);
            const banEmbed = new Discord.MessageEmbed()
            .setColor('#fff85f')
            .setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
            .setTitle(`🔨has been banned from: ${interaction.guild.name}.`)
             .setFooter(`Reason: ${reason}`)
             .setFooter(`By: ${interaction.user.username}`)
             .setTimestamp();
             ButtonInteraction.first().reply({embeds: [banEmbed]})
        }
    })
        
      
           


        } else {
        message.reply('Cant ban that member.')
    }

    }
}