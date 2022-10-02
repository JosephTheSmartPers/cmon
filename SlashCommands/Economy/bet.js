const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: 20,
    ...new SlashCommandBuilder()
    .setName("bet")
    .setDescription("Gamble.")
    .addNumberOption(option => option.setName('amount').setDescription("Amount of money you wan't to (probably) lose.").setRequired(true).setMinValue(50)),

    run: async (client, interaction, args) => {

        let profileData = await profileModel.findOne({ userID: interaction.user.id});

        async function pay(amount){
            await profileModel.findOneAndUpdate({
                userID:interaction.user.id,
            }, 
            {
                $inc: {
                    moniy: amount,
                }
            }
            );
        }

        let amount = interaction.options.getNumber("amount")

        if(amount > profileData.moniy) return interaction.reply('you dont even have that much money in ya wallet:x:, chill my man🧊!');
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        const ticket = Math.floor(Math.random() * 5) + 1;

        if(randomNumber == ticket){
            const winner = amount * 4
            pay(winner)

            const begEmbed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: interaction.user.tag, iconURL:interaction.user.displayAvatarURL({ dynamic: true })})
                .setTitle(`YOU JUST WON!!🎉🎉`)
                .setFooter({text: `You won ${winner} moniy💵.`})
            interaction.reply({embeds: [begEmbed]});
        }
        else {
            pay(-1 * amount)
            interaction.reply(`You lost the gamble and \`${amount}\` moniy🙁.`);
        }
	}
}

