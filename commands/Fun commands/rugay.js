const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'rugay',
  cooldown: 10,
  description: 'The bot will tell you how gay u are.',
  usage: "rugay [@person]",
  async execute(message,args, cmd, client, Discord) {



    const randomNumber = Math.floor(Math.random() * 100) + 1;


    let target = message.mentions.users.first();
    if(!target) target = message.author;
let embed = new EmbedBuilder()
        .setAuthor({name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true})})
        .setColor('#ffa700')
        .addFields(
            {name:`My man ${target.username}`, value: `is ${randomNumber}% gay :rainbow_flag:`}
        )
    await message.channel.send({embeds: [embed]})

}
};