const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

itemNames = {
    'drugs': "💉drugs",
    'guitar': "🎸guitar",
    'broom': "🧹broom",
    'tomato': "🍅tomato",
    'handgun': "🔫handgun",
    'card': "💳card",
    'pen': "🖊️pen",
    'typewriter': "⌨️typewriter",
}

module.exports = {
    ...new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("See what items you have.")
    .addUserOption(option => option.setName('user').setDescription("See someone else's inventory (optional)")),

    run: async (client, interaction, args) => {

        const target = interaction.options.getUser("user") || interaction.user
        let user = interaction.user
        if(target){ 
            targetData = await profileModel.findOne({ userID: target.id})
            user = target
        }

        if(targetData && targetData.inv && targetData.inv.creditcard){
            let invObj = targetData.inv
            invObj.card = invObj.creditcard
            delete invObj.creditcard

            await profileModel.findOneAndUpdate({
                userID: user.id,
            }, 
            {$set: {
                inv: invObj,
            }});

        }

        if(!targetData) return message.reply("This dude doesn't have an account in da database yet!🗃️");
        const object2 = targetData.inv
        const array = []

        for (const [key, value] of Object.entries(object2)) {
            if(value != 0 && value && key) array.push({name: key, value: value})
        }

        const bal2Embed = new EmbedBuilder()
            .setColor('#fff85f')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
            .setTitle(`${user.username}'s inventory is(drumroll please)`)
            .addFields(
                array.map(obj=>{
                    return{
                        name: itemNames[obj.name],
                        value: `${obj.value.toString()}`,
                        inline: true,
                    }
                })
            )
            .setFooter({text: `Dis dude: ${interaction.user.tag} scanned da inventory!`})

       interaction.reply({embeds: [bal2Embed]});

	}
}

