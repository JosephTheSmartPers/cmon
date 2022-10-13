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

        await interaction.reply(`Searching the for a question to ask <a:loading:1026905223031173150>`)

        async function work(question, answer){
        const modal = new ModalBuilder()
			.setCustomId(user.id)
			.setTitle('Answer correctly!');
        
        const Wquestion = new TextInputBuilder()
			.setCustomId('triviaQuestion')
		    // The label is the prompt the user sees for this input
			.setLabel(question)
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);
        const firstActionRow = new ActionRowBuilder().addComponents(Wquestion);

        modal.addComponents(firstActionRow);

        interaction.showModal(modal)

        const filter = i =>{
            return i.user == user
        }

        interaction.awaitModalSubmit({filter, time: 15_000 }).then(async inter=> {

            let hisAnsw = inter.fields.getTextInputValue("triviaQuestion")
            if(hisAnsw.toLowerCase() == answer){
                await profileModel.findOneAndUpdate({userID: user.id,}, 
                    {$inc: {moniy: sal,},
                }); 
            const fitEmbed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`Youg got ${sal} moniy for answering correctly!`)
            inter.reply({embeds: [fitEmbed]});
            }else{
                inter.editReply("That wasn't the answer, better luck next time!")
                }
        })}
        
        let question = ""
        
        await fetch("https://jservice.io/api/random?count=1")
        .then(response => {
            if(!response.ok){
                return interaction.editReply("something went wrong :(")
            }
            return response.json()
        })
        .then(async data => {
            question = await data
        }).catch(err=>{return interaction.editReply("Something messed up ):")})
        
        work(question[0].question, question[0].answer)

        
	}
}

