const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: 60,
    ...new SlashCommandBuilder()
    .setName("rob")
    .setDescription("Rob someone of some or all their money.")
    .addUserOption(option => option.setName('user').setDescription('Who u wanna rob?').setRequired(true)),

    run: async (client, interaction, args) => {

        const target = interaction.options.getUser("user")
        let user = interaction.user

        const targetData = await profileModel.findOne({ userID: target.id});
        const userData = await profileModel.findOne({ userID: user.id});
 
        if(!targetData) return interaction.reply('This dude doesnt have an acount in da database yet!');

        let robNumber = Math.round(((targetData.moniy / 100) * ((Math.floor(Math.random() * 50) + 1))));
        if(targetData.moniy == '0') return interaction.reply(':x:This dude is so damn poor u cant even rob him.');
        
        const r = Math.floor(Math.random() * 800);

        async function money(user, amount){
            await profileModel.findOneAndUpdate(
                {
                    userID: user,
                    }, 
                    {
                    $inc: {
                        moniy: amount,
                    },
                });
        }

        if(299 >= r && r > 0){
            if(robNumber > targetData.moniy) robNumber = targetData.moniy
                money(user.id, robNumber)
                money(target.id, -robNumber)

                const embed = new EmbedBuilder()
                    .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true})})
                    .setTitle(`Rob sucesfull!<a:check:854289501148020747>`)
                    .addFields(
                        {name: `💵You robbed ${target.tag}`, value: `You got ${robNumber} moniy!`}
                        )
                interaction.reply({embeds: [embed]})
        }

        if(599 >= r && r > 300){
                const embed = new EmbedBuilder()
                    .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true})})
                    .setTitle(`<a:notCheck:854289501094281236>Rob failed!`)
                    .addFields(
                        {name: `You couldn't rob ${target.tag}`, value: `👮He called the cops and you had to run for it.`}
                        )
                    .setColor('Red')
                interaction.reply({embeds: [embed]})
        }
        if(699 >= r && r > 600){
            if(targetData.handgun && targetData.handgun > 0){
                const embed = new EmbedBuilder()
                    .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true})})
                    .setTitle(`Rob failed!`)
                    .addFields(
                        {name: `🔫${target.tag} had a hadgun...`, value: `The dude tryed to shoot u and u almost died.`}
                        )
                    .setColor('Red')
                interaction.reply({embeds: [embed]})
            
            } else {
                money(user.id, targetData.moniy)
                money(target.id, -targetData.moniy)
            const embed = new EmbedBuilder()
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true})})
                .setTitle(`<a:check:854289501148020747>Rob sucesfull!`)
                .addFields(
                    {name: `💰You robbed ${target.tag}`, value: `You stole all of that guys moniy LMAO NICE!`}
                    )
                .setColor('Green')
            interaction.reply({embeds: [embed]})
        }
        }
        if(800 >= r && r > 700){
        if(robNumber > userData.moniy) robNumber = userData.moniy
        money(user.id, -robNumber)
        money(target.id, robNumber)
        const embed = new EmbedBuilder()
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true})})
            .setTitle(`Rob backfired!`)
            .addFields(
                {name: `${target.tag} robbed you back`, value: `You lost ${robNumber} moniy!`}
                )
            .setColor('Red')
        interaction.reply({embeds: [embed]})
            }
	}
}

