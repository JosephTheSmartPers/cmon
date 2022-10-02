const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: 30,
    ...new SlashCommandBuilder()
    .setName("busk")
    .setDescription("Play your guitar for some money."),

    run: async (client, interaction, args) => {

        const user = interaction.user
        const userData = await profileModel.findOne({ userID: user.id});

        if(userData.inv.guitar == 0) return interaction.reply('u dont have a guitar my man.')
        const gmoniy = Math.floor(Math.random() * 500) + 500;

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

        let result = Math.floor(Math.random() * 20) + 1;
        if(result == 9){
            const bremebed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`Your guitar broke and everyone laughed at you.`)
                buytem(interaction.user.id, 1, "guitar")
            return interaction.reply({embeds: [bremebed]});

        } else{
            try{
                await profileModel.findOneAndUpdate({
                    userID: user.id
                    }, {
                        $inc: {
                    moniy: gmoniy,
                        },
                });
            }catch(err){ return }

            const guitarEmbed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`Succesfully played on the streets and u got ${gmoniy}!`)
        
            return interaction.reply({embeds: [guitarEmbed]});
        }
	}
}

