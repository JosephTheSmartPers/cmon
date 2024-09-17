module.exports = {
  name: '8ball',
  aliases: ['eightball'],
  cooldown: 10,
  description: 'Asks a question and let the bot determine your fate :sparkler:',
  usage: "8ball <text>",
  async execute(message, args, cmd, client, Discord, profileData) {
    if (!args[0]) return message.channel.send('Please ask a full question!'); 
    const replies = ['Yes.', 'No.', 'Never.', 'Definitely.', 'Ask again later.', 'Perhaps', 'Maybe', '100%', 'Bruh what is this question.', 'Probably'];

    const result = Math.floor(Math.random() * replies.length); 
    const question = args.join(' '); 
    
    
      const embed = new EmbedBuilder()
                  .setTitle(`🎱 ${interaction.user.tag} My answer is...`)
                  .setColor('BLACK')
                  .addFields(
                      {name: 'Question:', value: question, inline: true},
                      {name: 'Answer:', value: replies[result], inline: true}
                      );
  },
};
