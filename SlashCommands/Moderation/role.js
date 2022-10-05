const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("role")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    .setDescription("Grant someone a role.")
    .addUserOption(option => option.setName("user").setDescription("The user the role will be added to.").setRequired(true))
    .addRoleOption(option => option.setName("role").setDescription("The role that will be added to someone.").setRequired(true)),
    

    run: async (client, interaction, args) => {

        let role = interaction.options.getRole("role")
        let target = interaction.options.getUser("user")
        let user = interaction.user

        let memberTarget= interaction.guild.members.cache.get(target.id);

        try{
            await memberTarget.roles.add(role);
        }catch(err){
           return interaction.reply("I don't have permissions to do add this role!")
        }
            const giveEmbed = new EmbedBuilder()
                .setColor('#15ff00')
                .setAuthor({name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true })})
                .setDescription(`**<a:check:854289501148020747>Succesfully given the role ${role} to ${target.tag}**`)
                .setFooter({text: `Role given by: ${user.tag}`})
            interaction.reply({embeds: [giveEmbed]});

            let lc = await guildModel.findOne({guildID: interaction.guildId});
            if(!lc.logschannel) return
            if(!lc) return
            const logs = interaction.guild.channels.cache.find(channel => channel.name === lc.logschannel)
            if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
            
            const logEmbed = new EmbedBuilder()
                .setColor('#e3b938')
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: true})})
                .setTitle(`added the role *${role.name}*  to @${target.username}`)
                .setTimestamp();
            return logs.send({embeds: [logEmbed]})
             

	}
}

