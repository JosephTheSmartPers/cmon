const { CommandInteraction } = require("discord.js");
const figlet = require('figlet');

const { Client, Message, EmbedBuilder, SlashCommandBuilder} = require("discord.js")


module.exports = {
    ...new SlashCommandBuilder()
    .setName("ascii")
    .setDescription("Turn any text into ascii.")
    .addStringOption(option => option.setName('text').setDescription('Text to turn into ascii').setRequired(true).setMaxLength(24)),

    run: async (client, interaction, args) => {

        msg = interaction.options.getString('text');
    
            figlet.text(msg, function (err, data){
                if(err){
                    console.log('Something went wrong');
                    console.dir(err);
                }
    
                interaction.reply('```' + data + '```')


            })
	}
}

