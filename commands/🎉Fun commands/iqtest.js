const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'iqtest',
  aliases: ['iq'],
  cooldown: 10,
  description: 'This command will tell your IQ very precisely.',
  usage: "iq",
  async execute(message, args, cmd, client, Discord, profileData) {
    const replies = ['Yes.', 'No.', 'Never.', 'Definitely.', 'Ask again later.']; 

    const result = Math.floor(Math.random() * 200); 
    const certainty = Math.floor(Math.random() * 100)
    
      const embed = new EmbedBuilder()
        .setTitle(`${message.author.tag} Your IQ is...`)
        .setColor('BLUE')
        .addFields(
          {name: 'Certainty:', value: `${certainty.toString()}%`},
          {name: 'IQ:', value: result.toString()}
                  )
      await message.channel.send({embeds: [embed]});
  },
};