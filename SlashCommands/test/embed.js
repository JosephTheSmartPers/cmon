const { CommandInteraction, Client, DiscordAPIError, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Test',
    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String()} args 
     */

     run: async (client, interaction, args) => {
        const embed = new EmbedBuilder()
        .setTitle("Click here for the link!🔗")
        .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
        interaction.reply({ embeds: [embed]});
    },
};
