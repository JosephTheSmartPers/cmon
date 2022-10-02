const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'kefir',
    description: 't',
    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String()} args 
     */

     run: async (client, interaction, args) => {
        interaction.reply({ content: 'Buzi e vagy', ephemeral: true});
    },
};
