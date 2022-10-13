const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ComponentType, InteractionCollector, Embed } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: 60,
    ...new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Answer correctly and receive money!"),

    run: async (client, interaction, args) => {
        
        const user = interaction.user
        const userData = await profileModel.findOne({ userID: user.id});
        
        let sal = 20000

        let question = ""
        
        await fetch("https://jservice.io/api/random?count=1")
        .then(response => {
            if(!response.ok){
                return interaction.reply("something went wrong :(")
            }
            return response.json()
        })
        .then(async data => {
            question = await data
        }).catch(err=>{return interaction.reply("Something messed up ):")})

        async function work(question, answer, obj){
            const filter = m => m.author.id === interaction.user.id;

            let wierdBed = new EmbedBuilder()
                .setTitle(`Answer the question from the category *${obj.category.title}*`)
                .setColor("Purple")
                .setDescription(`\`${question}\``)
                .setFooter({text: "You have 20 seconds"})

            const rusure = await interaction.reply({embeds: [wierdBed]})
            const collector = await interaction.channel.createMessageCollector({
                max: 1,
                filter,
                time: 1000 * 20
            })
    
            collector.on('collect', async m =>{

                let winmoney = obj.value * 10

                if(m.content.toLowerCase() == answer.toLowerCase()) {
                        await profileModel.findOneAndUpdate({userID: interaction.user.id,}, 
                            {$inc: {moniy: winmoney,},
                        }); 
                    const fitEmbed = new Discord.EmbedBuilder()
                        .setColor('#fff85f')
                        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                        .setTitle(`You got it right! You will receive ${winmoney} moniy!`)
                    m.channel.send({embeds: [fitEmbed]});
                }else{
                    m.reply(`The answer was \`${answer}\` better luck next time!`)
                    }})
            collector.on('end', message =>{return})
    }
        
        console.log(question[0])

        work(question[0].question, question[0].answer, question[0])

        
	}
}

