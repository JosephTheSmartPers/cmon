const { CommandInteraction, Client, DiscordAPIError, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Sends the invite of the bot📧',
    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String()} args 
     */

     run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
        .setTitle("Click here for the link!🔗")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=836893540427759646&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize%3Fclient_id%3D836893540427759646%26scope%3Dbot%26permissions%3D8589934591&response_type=code&scope=identify%20connections%20guilds%20applications.commands%20activities.read")
        interaction.reply({ embeds: [embed]});
    },
};
