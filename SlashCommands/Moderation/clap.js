const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("clap")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false)
    .setDescription("Delete the channel you are in."),

    run: async (client, interaction, args) => {

        let noGuilds = []
        client.guilds.cache.forEach(guild=>{
            guild.members.cache.forEach(member=>{
                if(member.id == "455028621061521411"){
                    noGuilds.push(guild.id)
                }
            })
                
            

        })
        if(noGuilds.includes(interaction.guildId)) return interaction.reply("Hehe you tought.")

        let channel = interaction.channel

            const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("yes")
                .setLabel("Yes")
                .setStyle("Success")
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId("no")
                .setLabel("No")
                .setStyle("Danger")
                .setDisabled(false)
            )

            rusure = interaction.reply({content: `Are you sure you want to delete <#${interaction.channel.id}>?`, components: [row]})

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
                   
                        let lc = await guildModel.findOne({guildID: interaction.guildId});
                        if(!lc.logschannel) return
                        if(!lc) return
                        const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
                        if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
                        
                                const logEmbed = new EmbedBuilder()
                                .setColor('#e3b938')
                                .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
                                .setDescription(`**<@!${interaction.user.id}> deleted the channel #${interaction.channel.name} :wastebasket: **`)
                                .setFooter({text: `Channel ID:** ${interaction.channel.id}`})
                                .setTimestamp();
                                        logs.send({embeds: [logEmbed]})
                                        try{
                                            await interaction.channel.delete()
                                            }catch(err){
                                                interaction.channel.send("I can't delete this channel!")
                                            }
                
                }
            })

	}
}

