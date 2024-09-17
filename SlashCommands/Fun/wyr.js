const { getPost, getImage } = require('random-reddit')
const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("wyr")
    .setDescription("Sends a would-you-rather question"),

    run: async (client, interaction, args) => {

        let post = await getPost("WouldYouRather")
        const themEmoji = '🇦';
        const heEmoji = '🇧';
            const embed = new EmbedBuilder()
            
                .setColor('Random')
                .setImage(post.url_overridden_by_dest)
                .setTitle(post.title)
                .setDescription(post.selftext)
              let messageEmbed = await interaction.channel.send({embeds: [embed]});
              messageEmbed.react(themEmoji);
              messageEmbed.react(heEmoji);

	}
}

