const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: 10,
    ...new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily reward."),

    run: async (client, interaction, args) => {

        let user = interaction.user;
        let timeout = 86400000;
        let amount = 500
        const userData = await profileModel.findOne({ userID: user.id});
        let author = userData.daily

        if(!userData || !userData.house) return interaction.reply("You don't have a house bro.")

        if(author !== null && timeout - (Date.now() - author) > 0){
            const time = ms(timeout - (Date.now() - author));
            const tembed = new EmbedBuilder()
                .setTitle('Heyo, you still cant claim your daily!')
                .setDescription(`You can claim for another \`${time}\``)
                .setColor('fff85f')
            return interaction.reply({embeds: [tembed]})

        } else{
            if(userData.house.pay) amount = userData.house.pay * 1.5
        
            const response = await profileModel.findOneAndUpdate({
                userID: user.id,
            }, 
            {
                $inc: {
                    moniy: amount,
                }

            }
            );
            await profileModel.findOneAndUpdate({
                userID: user.id,
            }, 
            {
                $set: {
                    daily: Date.now(),
                }
                
            }
            );
            const dailyEmbed = new EmbedBuilder()
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setColor('#fff85f')
                .setTitle(`You just got your daily reward!💰`)
                .setFooter({text: `Which is ${amount} moniy! Come back every day for more📆!`})
            interaction.reply({embeds: [dailyEmbed]});

        }

	}
}

