const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Return a bunch of info on the bot."),

    run: async (client, interaction, args) => {

        let { version } = require("discord.js");
        let inline = true
        let bicon = client.user.displayAvatarURL({ dynamic: true});
        let usersize = client.users.cache.size
        let chansize = client.channels.cache.size
        let uptimxd = client.uptime 
        let servsize = client.guilds.cache.size
        let botembed = new EmbedBuilder()
        .setColor("#00ff00")
        .setThumbnail(bicon)
        .addFields(
                {name: "🤖Bot Name", value: `${client.user.username}`, inline: true},
                {name: "👑Bot Owner", value: "<@483519738727759873>", inline: true},
                {name: "🛡Servers", value: `${servsize}`, inline: true},
                {name: "💬Channels", value: `📁 ${chansize}`, inline: true},
                {name: "👥Users", value: `${usersize}`, inline: true},
                {name: "📚Bot Library", value: "Discord.js", inline: true},
                {name: "⚙️Commands", value: `${client.commands.size}`, inline: true},
                {name: "• Discord.js", value: `v${version}`, inline: true},
                {name: "Invite", value: `[Click here for invite.](https://discord.com/oauth2/authorize?client_id=836893540427759646&scope=bot&permissions=8589934591)`, inline: true},
                {name: "📆Created On", value: `${client.user.createdAt.toString()}`},
        )
        .setFooter({text: `ℹ️Information about: ${client.user.username}. Developed by: Barni#0811`})
       
        interaction.reply({embeds: [botembed]});

	}
}

