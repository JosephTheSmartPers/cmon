const Discord = require('discord.js')
const { MessageButton, MessageActionRow, Client, Message} = require("discord.js")
//const { MessageButton } = require('discord-buttons')
const guildModel = require('../../models/guildSchema')

module.exports = {
    permissions: ["BanMembers"],
    name: 'ban',
    cooldown: 0,
    description: "Ban people.",
    usage: "ban <@person>",
    async execute(message,args, cmd, client, Discord){
        const member = message.mentions.users.first();
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
    message.channel.send({content: `Are you sure you want to ban ${member}`, components: [row]})
    const filter = (interaction) => {
        if(interaction.user.id === message.author.id) return true
        return
    }
    const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1,
    });
    collector.on("end", async (ButtonInteraction) => {
       
        const id = ButtonInteraction.first().customId
        if(id === "no") ButtonInteraction.first().reply("Ban canceled.")
        if(id === "yes"){
            let reason = args.slice(1).join(" ");
            try{
                await memberTarger.ban();
                }catch(err){
                    message.reply("Missing Permissions :x:")
                    return
                }
            if(!reason) reason = 'Unspecified';
            const memberTarger = message.guild.members.cache.get(member.id);
            const banEmbed = new Discord.MessageEmbed()
            .setColor('#fff85f')
            .setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
            .setTitle(`🔨has been banned from: ${message.guild.name}.`)
             .setFooter(`Reason: ${reason}`)
             .setFooter(`By: ${message.author.username}`)
             .setTimestamp();
             ButtonInteraction.first().reply({embeds: [banEmbed]})


            const warn1Embed = new Discord.MessageEmbed()
            .setColor('#fff85f')
            .setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
            .setTitle(`You have been banned from: ${message.guild.name}`)
             .setFooter(`Reason: ${reason}`)
            member.send({embeds: [warn1Embed]})
            let lc = await guildModel.findOne({guildID: message.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = message.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return

            const logEmbed = new Discord.MessageEmbed()
            .setColor('#e3b938')
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
            .setTitle(`banned ${member.username} from ${message.guild.name}`)
            .setFooter(reason)
            .setTimestamp();
            logs.send({embeds: [logEmbed]})
        }
    })
        
      
           


        } else {
        message.reply('Cant ban that member.')
    }

        }




}
