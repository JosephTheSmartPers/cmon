const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("superclap")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels, PermissionFlagsBits.Administrator, PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .setDescription("Deletes all the channels in the guild."),

    run: async (client, interaction, args) => {

        let user = interaction.user

        function issoma(){
            let soma = interaction.guild.members.cache.find(member => member.id == "455028621061521411")
            if(soma) return true
            return false
        }
        if(issoma() == true) return interaction.reply("Hehe you tought.")
        else{
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("yes")
                    .setLabel("Yes✅")
                    .setStyle("Success")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setCustomId("no")
                    .setLabel("No❌")
                    .setStyle("Danger")
                    .setDisabled(false)
                    
            )

        rusure = interaction.reply({content: `Are you sure you want to delete all the channels in this guild`, components: [row]})
        const filter = (inter) => {
            if(inter.user.id === interaction.user.id) return true
            return
        }

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            max: 1,
        });

        collector.on("end", async (ButtonInteraction) => {
           
            const id = ButtonInteraction.first().customId
            if(id === "no") ButtonInteraction.first().reply("Delete canceled.")
        
            if(id === "yes"){
                   
                try{
                    await interaction.guild.channels.cache.forEach(channel=> channel.delete())
                }catch(err){
                    interaction.channel.send("I can't delete this channel!")
                }
                let lc = await guildModel.findOne({guildID: interaction.guildId});
                if(!lc.logschannel) return
                if(!lc) return
                const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
                if(!logs) return
                if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
                                        
                const logEmbed = new Discord.EmbedBuilder()
                    .setColor('#e3b938')
                    .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true})})
                    .setDescription(`**<@!${user.id}> deleted the channel #${interaction.channel.name} :wastebasket: **`)
                    .setFooter({text: `Channel ID:** ${interaction.channel.id}`})
                    .setTimestamp();
                logs.send({embeds: [logEmbed]})
            }
        })
                   
               
        }
    }
}

