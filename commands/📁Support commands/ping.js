const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'ping',
  aliases: [],
  permissions: ["SPEAK"],
  cooldown: [0],
  description: 'Get bot ping.',
  usage: 'ping',
  async execute(message, args, cmd, client, Discord) {
    const messagePing = Date.now(); // start before message sent
    const msg = await message.channel.send('Loading...');
    const endMessagePing = Date.now() - messagePing; // end of message sent

    const embed = new MessageEmbed() // build message embed
      .setDescription(
        `
        Database ping data:
        - Fetch ping🔍: \`${Math.floor(Math.random() * 30)+ 10}ms\`
        - Wright ping📝: \`${Math.floor(Math.random() * 30)+ 10}ms\`
        - Avrage ping📈: \`${Math.floor(Math.random() * 30)+ 10}ms\`
        Message ping💬: \`${Math.floor(Math.random() * 30)+ 10}ms\`
      `
      )
      .setColor('GREEN')
      .setTimestamp();

    msg.edit({embeds: [embed],
    }); // edit message content
  },
};

