const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: "5",
    ...new SlashCommandBuilder()
    .setName("drugs")
    .setDescription("Do drugs (You might die)"),

    run: async (client, interaction, args) => {

        const userData = await profileModel.findOne({ userID: interaction.user.id});

        if(interaction.guild.id == '826787118104838184') return interaction.reply('no drugs in dis server ):')
        if(userData.drugs == 0) return interaction.reply('u dont have drugs lol.')

        await profileModel.findOneAndUpdate({

            userID: interaction.user.id
            }, {
                $inc: {
            drugs: -1,
                },
        }
        );

        const result = Math.floor(Math.random() * 100); 

        //In case my man died
        if(2 >= result){

            let lostMoney = Math.floor(Math.random() * 2000) + 1;
            if(lostMoney > userData.moniy) lostMoney = userData.moniy

            try{

                await profileModel.findOneAndUpdate({

                    userID: interaction.user.id
                    }, {
                        $inc: {
                    moniy: -lostMoney,
                        },
                }
                );

            }catch(err){
                return interaction.reply("Something went wrong...")
            }
            const drugEmbed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setTitle(`You succesfully did drugs💉 and died... U lost ${lostMoniy} moniy`)
            return interaction.reply({embeds: [drugEmbed]})
        }

        else{
            const drugEmbed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setTitle(`Succesfully used some quality drugs and you survived💉!`)
 
        return interaction.reply({embeds: [drugEmbed]})
        }

	}
}

