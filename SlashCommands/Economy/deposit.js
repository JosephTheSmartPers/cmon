const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Move money from your wallet to your bank account.")
    .addNumberOption(option => option.setName('amount').setDescription('How much money you wanna withdraw, leave empty for all.').setMinValue(1)),

    run: async (client, interaction, args) => {
        const userData = await profileModel.findOne({ userID: interaction.user.id});
        let amount = interaction.options.getNumber("amount")
        if(!amount) amount = userData.moniy

        try{
            await profileModel.findOneAndUpdate({
                userID: interaction.user.id,
                    },{
                    $set: {
                        moniy: userData.moniy - amount,
                    },
                    $inc: {
                        banker: amount,
                    }
            });
        }catch(err){
            return interaction.reply("Something went wrong...")
        }

        const depEmbed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTitle(`Succesfully deposited \`${amount}\` money <a:Check:831956237305643069>!`)
        interaction.reply({embeds: [depEmbed]})

	}
}

