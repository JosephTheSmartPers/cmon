const { CommandInteraction } = require("discord.js");

const { Client, Message, EmbedBuilder, SlashCommandBuilder} = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask something from the allmigthy 8ball🎱.")
    .addStringOption(option => option.setName('question').setDescription('Cmon ask something!').setRequired(true)),

    run: async (client, interaction, args) => {

        const replies = ['Yes.', 'No.', 'Never.', 'Definitely.', 'Ask again later.', 'Perhaps', 'Maybe', '100%', 'Bruh what is this question.', 'Probably']; 

        const result = Math.floor(Math.random() * replies.length); 
        const question = interaction.options.getString('question')
        
        
          const embed = new EmbedBuilder() 
            .setTitle(`🎱 ${interaction.user.tag} My answer is...`)
            .setColor('BLACK')
            .addFields(
                {name: 'Question:', value: question, inline: true},
                {name: 'Answer:', value: replies[result], inline: true}
                );
          await interaction.reply({embeds: [embed]});

	}
}

