const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");
const blackjack = require("discord-blackjack");

module.exports = {
    cooldown: 10,
    ...new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Play the famoues game blackjack.")
    .addNumberOption(option => option.setName('amount').setDescription('Amount of money you wanna gamble, (leave empty for all)').setMinValue(100)),

    run: async (client, interaction, args) => {

        const userData = await profileModel.findOne({ userID: interaction.user.id});
        let amount = interaction.options.getNumber("amount") || userData.moniy

        let game = await blackjack(interaction, {resultEmbed: true})
        
        switch (game.result) {
            
            case 'WIN':
                
                await profileModel.findOneAndUpdate({
                    userID: interaction.user.id,},{$inc: { moniy: amount, }});
                break;
            case 'TIE':
               
                break;
            case 'LOSE':
                await profileModel.findOneAndUpdate({
                    userID: interaction.user.id,},{$inc: { moniy: -amount, }});
                break;
            case 'DOUBLE WIN':
                await profileModel.findOneAndUpdate({
                    userID:  interaction.user.id,},{$inc: { moniy: 2 * reward, }});
                break;
            case 'DOUBLE LOSE':
                await profileModel.findOneAndUpdate({
                    userID:  interaction.user.id,},{$inc: { moniy: -reward, }});
                break;
            case 'ERROR':
                // do whatever you want
                break;
        }

	}
}

