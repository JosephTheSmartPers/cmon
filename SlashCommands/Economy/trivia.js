const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ComponentType, InteractionCollector, Embed } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    cooldown: 120,
    ...new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Answer correctly and receive money!"),

    run: async (client, interaction, args) => {
        
        const user = interaction.user
        const userData = await profileModel.findOne({ userID: user.id});
        
        let sal = 20000

        async function working(question, answer){
            const filter = m => m.author.id === interaction.user.id;
            const rusure = await interaction.reply(question)
            const collector = await interaction.channel.createMessageCollector({
                max: 1,
                filter,
                time: 1000 * 20
            })
    
            collector.on('collect', async m =>{
                if(m.content.toLowerCase() == answer) {
                        await profileModel.findOneAndUpdate({userID: interaction.user.id,}, 
                            {$inc: {moniy: sal,},
                        }); 
                    const fitEmbed = new Discord.EmbedBuilder()
                        .setColor('#fff85f')
                        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                        .setTitle(`After a nice day of work u got ${sal} moniy!`)
                    m.channel.send({embeds: [fitEmbed]});
                }else{
                    m.reply("That wasn't the answer, better luck next time!")
                    }})
            collector.on('end', message =>{return})
    }
        
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
        
        work(question[0].question, question[0].answer)

        
	}
}

