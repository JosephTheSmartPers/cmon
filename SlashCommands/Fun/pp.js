const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("pp")
    .setDescription("I think we all know what this does...")
    .addUserOption(option => option.setName('user').setDescription("Who's pp u wanna measure (don't tag anyone for your own size)")),

    run: async (client, interaction, args) => {

        const replies = ['=', '==', '===', '====', '=====', '']; 

        const result = Math.floor(Math.random() * 20);
        let pp = "8"
        for (let index = 0; index < result; index++) {
        pp += "="
        
        }  
        
        let person = interaction.options.getUser("user")
        console.log(person)

        if(!person){
            interaction.reply(`You have a pp lenght of: \n**${pp}D**`)
        } else {
            const target = person
            await interaction.deferReply({ ephemeral: true });
        interaction.channel.send(`<@${target.id}>'s pp lenght is: \n**${pp}D**`)
    }

	}
}

