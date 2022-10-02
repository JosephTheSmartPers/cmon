const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Shows whats in the shop today."),

    run: async (client, interaction, args) => {

        if(interaction.guildId === '826787118104838184')
        {
        const shopEmbed = new EmbedBuilder()
            .setColor('#5f62ff')
            .setTitle('Whats on market?')
            .addFields(
                {name: 'Here are all the items in shop', value: '(There are limited items so check it every day)'},
                {name: '**🎸guitar**', value: 'A guitar, play on the streets and get some moniy. 1000$'},
                {name: '**🧹broom**', value: 'Clean up somewhere and get some moniy. 40$'},
                {name: '**🍅tomato**', value: 'Throw it at someone 2$'},
                {name: '💳card', value: 'You can buy items without withdrawing. 2000$'},
                {name: '🔫handgun', value: 'Good if you wanna stay safe. $2000'},
                {name: '🖊️pen', value: 'A very nice pen $50'},
            )
        interaction.reply({embeds: [shopEmbed]});
        } else{
            const shopEmbed = new EmbedBuilder()
                .setColor('#5f62ff')
                .setTitle('Whats on market?')
                .addFields(
                    {name: 'Here are all the items in shop', value: '(There are limited items so check it every day)'},
                    {name: '**💉drugs**', value: 'Do drugs and die 25% of the time (good deal) 20$', inline: true},
                    {name: '**🎸guitar**', value: 'A guitar, play on the streets and get some moniy. 1000$', inline: true},
                    {name: '**🧹broom**', value: 'Clean up somewhere and get some moniy. 40$', inline: true},
                    {name: '**🍅tomato**', value: 'Throw it at someone 2$', inline: true},
                    {name: '🔫handgun', value: 'Good if you wanna stay safe. $2000', inline: true},
                    {name: '💳card', value: 'You can buy items without withdrawing. 2000$', inline: true},
                    {name: '🖊️pen', value: 'A very nice pen $50', inline: true},
                )
            interaction.reply({embeds: [shopEmbed]});
        }

	}
}

