const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: "60",
    ...new SlashCommandBuilder()
    .setName("guess")
    .setDescription("Guess a number between 1 and 100 and get a prize!")
    .addNumberOption(option => option.setName('guess').setDescription("What's your lucky number?").setMaxValue(100).setMinValue(1).setRequired(true)),

    run: async (client, interaction, args) => {

        const number = Math.floor(Math.random() * 100) + 1;
        const guess = interaction.options.getNumber("guess")

        if(number == guess){
            const sembed = new EmbedBuilder()
                .setTitle('YOU WON!!')
                .setDescription(`You guessed the correct number (${number}), and you won 💰70000 moniy, congrats!`)
                .setColor('#ffc100')
            interaction.reply({embeds: [sembed]})
            await profileModel.findOneAndUpdate({
                userID: interaction.user.id,
            }, 
            {
                $inc: {
                    moniy: 70000,
                }
            }
            );
        } else{
            const fembed = new EmbedBuilder()
                .setTitle('You didnt guess correctly :x:')
                .setDescription(`The correct number was **${number}**, but you guessed **${guess}**, I mean you had a 1% chance you won so not that bad ( :`)
                .setColor('Red')
            interaction.reply({embeds: [fembed]})
        }

	}
}

