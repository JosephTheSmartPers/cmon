const { MessageEmbed } = require('discord.js');
const profileModel = require('../../models/profileSchema')
const mongoose = require('mongoose')
const ms = require('ms');
module.exports = {
  name: 'work',
  cooldown: 0,
  description: 'Work for some moniy',
  usage: "work",
  async execute(message, args, cmd, client, Discord, profileData) {
   
    const user = message.author
    const userData = await profileModel.findOne({ userID: message.author.id});
    const thouse = userData.house;
    if(!userData.house.pay) return message.reply("You don't have a house you can't work yet!")
    const sal = thouse.pay
    let minutes = 100
    if(userData.veh && userData.veh.min) minutes = userData.veh.min
    let timeout = minutes * 1000 * 60;
    let author = userData.worked

    let questions = [
        {question: "Whats the missing word? Joe mom is **f _ _** as heck bruv.", answer: "fit"},
        {question: "Whats the missing word? I made some *c _ _ _* today.", answer: "corn"},
        {question: "Whats the missing **word**? I went to the *m _ _ _ _ _* last night.", answer: "movies"},
        {question: "Whats the missing word? Whats 1 + 1 = _.", answer: "2"},
        {question: "What is the name of the stupidest president T _ _ _ _.", answer: "trump"},
        {question: "How many places are on a chessboard:_ _", answer: "64"},
        {question: "Whats the largest country?", answer: "russia"},
        {question: "What did your dad leave for?", answer: "milk"},
        {question: "Whats the earths current population (in billions)", answer: "8"},
        {question: "Who is the most subscribed channel?", answer: "t-series"},
        {question: "Who likes to give away lots of money?", answer: "mrbeast"},
    ]

    async function working(question, answer){
        const filter = m => m.author.id === message.author.id;
        const rusure = await message.reply(question)
        const collector = await message.channel.createMessageCollector({
            max: 1,
            filter,
            time: 1000 * 20
        })

        collector.on('collect', async m =>{
            if(m.content.toLowerCase() == answer) {
                    await profileModel.findOneAndUpdate({userID: message.author.id,}, 
                        {$inc: {moniy: sal,},
                    }); 
                const fitEmbed = new Discord.EmbedBuilder()
                    .setColor('#fff85f')
                    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                    .setTitle(`After a nice day of work u got ${sal} moniy!`)
                m.channel.send({embeds: [fitEmbed]});
            }else{
                m.reply("That wasn't the answer, better luck next time!")
                }})
        collector.on('end', message =>{return})
}

if(author !== null && timeout - (Date.now() - author) > 0){
        const time = ms(timeout - (Date.now() - author));
        const tembed = new Discord.EmbedBuilder()
        .setTitle('Heyo, you still cant work!')
        .setDescription(`You still cant work for another \`${time}\``)
        .setColor('fff85f')
        return message.channel.send({embeds: [tembed]})
}else {
    

const result = Math.floor(Math.random() * questions.length);
    
    if(!thouse || thouse.house == 'none') return message.reply('You dont have a house so you cant work yet, use **-daily** buy a broom (**-buy broom 1**) and then use it with **-use broom** or see more info with **-help**')
    await profileModel.findOneAndUpdate(
        {
userID: message.author.id,
}, 
{
$set: {
worked: Date.now(),
    },
}
);

working(questions[result].question, questions[result].answer)

            }
        }  
    }                             