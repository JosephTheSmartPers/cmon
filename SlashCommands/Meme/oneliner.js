const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const { getPost, getImage } = require('random-reddit')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("oneliner")
    .setDescription("Deliver a nice oneliner."),

    run: async (client, interaction, args) => {

        const post = await getPost('oneliners')
        const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setImage(post.url_overridden_by_dest)
            .setTitle(post.title.toString())    
            .setFooter({text: `👍${post.ups} 👎${post.downs}`})
        message.channel.send({embeds: [embed]}); 

	}
}

