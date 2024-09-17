const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("roleinfo")
    .setDescription("See a bunch of information about a role.")
    .setDMPermission(false)
    .addRoleOption(option => option.setName("role").setDescription("The role you want to see info bout.").setRequired(true)),

    run: async (client, interaction, args) => {

        
        let gRole = args.getRole("role")
    
        const status = {
            false: "❌No",
            true: "✅Yes"
          }
        let roleemebed = new EmbedBuilder()
        .setColor(gRole.hexColor)
        .addFields(
            {name: "💳ID", value: gRole.id, inline: true},
            {name: "Name", value: gRole.name, inline: true},
            {name: "<:Botdev:849670993051385876>Mention", value: `\`<@${gRole.id}>\``, inline: true},
            {name: "🎨Color", value: gRole.hexColor, inline: true},
            {name: "👥Members", value: gRole.members.size.toString(), inline: true},
            {name: "⬆️Position", value: (gRole.position-1).toString(), inline: true},
            {name: "📄Hoisted", value: status[gRole.hoist], inline: true},
            {name: "Mentionable", value: status[gRole.mentionable], inline: true},
            {name: "🛠️Managed", value: status[gRole.managed], inline: true},
            {name: "👑Permissions:",  value: ` ${"`"}${gRole.permissions.toArray().join(" `|` ")}${"`"}`}
        )
        .setThumbnail(gRole.iconURL())
       
        
        interaction.reply(({embeds: [roleemebed]})
        
        );

	}
}

