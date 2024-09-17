const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: 40,
    ...new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Clean for some money."),

    run: async (client, interaction, args) => {

        let user = interaction.user

        const userData = await profileModel.findOne({ userID: user.id});

        if(userData.inv.broom == 0) return interaction.reply('You dont have a broom.')

        const bmoniy = Math.floor(Math.random() * 100) + 100;

        async function buytem(person, itemAmount, path){
            let inv = userData.inv
            let current = parseInt(inv[path])
            inv[path] = current - itemAmount
    
            await profileModel.findOneAndUpdate({
                userID: person
                }, {
                    $set: {
                inv: inv,
                    },
            });
        }

        let result = Math.floor(Math.random() * 10) + 1;
        if(result == 9){
            const bremebed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`Your broom broke... You must be sad rn ):`)
            buytem(user.id, 1, "broom")
            return interaction.reply({embeds: [bremebed]});

        } else{
        await profileModel.findOneAndUpdate({

            userID: user.id
            }, {
                $inc: {
            moniy: bmoniy,
                },
        }
        );
    const broomEmbed = new EmbedBuilder()
        .setColor('#fff85f')
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
        .setTitle(`Succesfully got some moniy (${bmoniy})`)

    return interaction.reply({embeds: [broomEmbed]});
        }

	}
}

