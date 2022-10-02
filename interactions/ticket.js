const guildModel = require('../models/guildSchema')
const { ChannelType, PermissionsBitField, ButtonBuilder, ActionRowBuilder, ButtonStyle, messageLink } = require("discord.js")
module.exports = async (Discord, client, interaction) => {

    let channel
    try{
    channel = await interaction.guild.channels.create({
        name: `Ticket: ${interaction.user.tag}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
            }
        ]
    });
    const category = await guildModel.findOne({guildID: interaction.guild.id});
    if(!category) return 
    const categoryt = await interaction.guild.channels.cache.find(category => category.id === category.ticketcategory)
    if(category.ticketcategory === null) return 
    await channel.setParent(category.ticketcategory);
    }catch(err){interaction.reply({content: "I don't have permissions to create a channel (damn you owner).", ephemeral: true});console.log(err); return}
    
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId("lock")
        .setLabel("Lock🔒")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false),
        new ButtonBuilder()
        .setCustomId("delete")
        .setLabel("Delete🗑️")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(false)
        )

    const ticketEmbed = new Discord.EmbedBuilder()
    .setColor('#00FFEC')
    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setTitle(`<a:check:854289501148020747>Successfully created ticket!`)
         .setFooter({text: 'Support will arrive shortly!'})

    const reactionMessage = await channel.send({embeds: [ticketEmbed], components: [row]})

    const filter = (inte) => {
        if(inte.guild.members.cache.find((member) => member.id === inte.user.id).permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return true
        }
        return
    }
    let locked = false
    const collector = channel.createMessageComponentCollector({
        filter,
    });

    collector.on("collect", async (ButtonInteraction) => {
        const id = ButtonInteraction.customId
        if(id === "lock") {
            if(locked == true){
                try{
            channel.permissionOverwrites.edit(interaction.user.id,
                {
                    SendMessages: true
                }
            );
            ButtonInteraction.reply("Unlocked channel🔓")
        }catch(err){
            channel.send("Missing Permissions :x:")
        }
            locked = false
        }
        else {
            try{
                channel.permissionOverwrites.edit(interaction.user.id,
                    {
                        SendMessages: false
                    });

            ButtonInteraction.reply("Locked channel🔒")

        }catch(err){
            channel.send("Missing Permissions :x:")
        }
            locked = true
        }
        }

        if(id === "delete"){
            try{
                const r = await ButtonInteraction.reply('Deleteing channel in 5 seconds')
                let number = 5
                const id = setInterval(async () => {
                    if(channel){
                    await ButtonInteraction.editReply(`Deleteing channel in ${number} seconds`)
                    }
                    number --;
                    if(number == -1){ clearInterval(id)};
                }, 1000);
                setTimeout(async () => {
                    await channel.delete()
                }, 7000);
                }catch(err){
                    console.log(err)
                    channel.send("Missing Permissions :x:")
                    return
                }
        }
    }
    )

    interaction.reply({content: `Your ticket has been submited to: ${channel}`, ephemeral: true,}).then(async (msg) => {
        
        let lc = await guildModel.findOne({guildID: interaction.guildId});
     if(!lc.logschannel) return
     if(!lc) return
     const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
     if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

        const logEmbed = new Discord.EmbedBuilder()
        .setColor('#e3b938')
        .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
        .setTitle(`created a ticket`)
        .setTimestamp();
                   logs.send({embeds: [logEmbed]})
    }).catch((err) => {
        throw err;
    })
}