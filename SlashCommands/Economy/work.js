const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ComponentType, InteractionCollector, Embed } = require("discord.js")

const profileModel = require("../../models/profileSchema");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("work")
    .setDescription("Work for some money."),

    run: async (client, interaction, args) => {

        
        const user = interaction.user
        const userData = await profileModel.findOne({ userID: user.id});
        const thouse = userData.house;
        if(!userData.house.pay) return interaction.reply("You don't have a house you can't work yet!")
        const sal = thouse.pay
        let minutes = 100
        if(userData.veh && userData.veh.min) minutes = userData.veh.min
        let timeout = minutes * 1000 * 60;
        let author = userData.worked
    
        let questions = [
            {question: "Joe mom is **f _ _** as heck bruv.", answer: "fit"},
            {question: "I made some *c _ _ _* today.", answer: "corn"},
            {question: "I went to the *m _ _ _ _ _* last night.", answer: "movies"},
            {question: "Whats 1 + 1 = _.", answer: "2"},
            {question: "What is the name of the stupidest president T _ _ _ _.", answer: "trump"},
            {question: "How many places are on a chessboard:_ _", answer: "64"},
            {question: "Whats the largest country?", answer: "russia"},
            {question: "What did your dad leave for?", answer: "milk"},
            {question: "Whats the earths current population (in billions)", answer: "8"},
            {question: "Who is the most subscribed channel?", answer: "t-series"},
            {question: "Who likes to give away lots of money?", answer: "mrbeast"},
        ]
        async function work(question, answer){
        const modal = new ModalBuilder()
			.setCustomId(user.id)
			.setTitle('Time to work');
        
        const Wquestion = new TextInputBuilder()
			.setCustomId('workQuestion')
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

            let hisAnsw = inter.fields.getTextInputValue("workQuestion")
            if(hisAnsw.toLowerCase() == answer){
                await profileModel.findOneAndUpdate({userID: user.id,}, 
                    {$inc: {moniy: sal,},
                }); 
            const fitEmbed = new EmbedBuilder()
                .setColor('#fff85f')
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`After a nice day of work u got ${sal} moniy!`)
            inter.reply({embeds: [fitEmbed]});
            }else{
                inter.reply("That wasn't the answer, better luck next time!")
                }

        }
        )
        }
        if(author !== null && timeout - (Date.now() - author) > 0){
            const time = ms(timeout - (Date.now() - author));
            const tembed = new EmbedBuilder()
                .setTitle('Heyo, you still cant work!')
                .setDescription(`You still cant work for another \`${time}\``)
                .setColor('fff85f')
            return interaction.reply({embeds: [tembed]})
    }else {
        
        const result = Math.floor(Math.random() * questions.length);
        
        if(!thouse || thouse.house == 'none') return interaction.reply('You dont have a house so you cant work yet, use **/daily** buy a broom (**/buy broom 1**) and then use it with **/use broom** or see more info with **/help**')
        await profileModel.findOneAndUpdate({
            userID: message.author.id,
            }, 
            {
            $set: {
                worked: Date.now(),
            },
        });
        work(questions[result].question, questions[result].answer)

        }
	}
}

