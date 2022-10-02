const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Get money from your bank account.")
    .addNumberOption(option => option.setName('amount').setDescription('Leave blank for all').setMinValue(1)),

    run: async (client, interaction, args) => {

        const user = interaction.user
        const userData = await profileModel.findOne({ userID: user.id});

        let amount = interaction.options.getNumber("amount") || userData.banker

        try{
            await profileModel.findOneAndUpdate(
                            {
                userID: user.id,
                }, 
                {
                    $inc: {
                        moniy: amount,
                        banker: -amount,
                    },
                }
            );
        }catch(err){
            console.log(err)
        }
        const withEmbed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`Succesfully deposited \`${amount}\` money <a:Check:831956237305643069>!`)
        interaction.reply({embeds: [withEmbed]});

	}
}

