const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pp',
  cooldown: 0,
  description: 'Find out what this command does yourself',
  usage: 'pp <@target>',
  async execute(message, args, cmd, client, Discord) {

    const replies = ['=', '==', '===', '====', '=====', '']; 

    const result = Math.floor(Math.random() * 20);
    let pp = "8"
    for (let index = 0; index < result; index++) {
      pp += "="
      
    } 
    const question = args.join(' '); 
    
    if(!args[0]){
        message.reply(`You have a pp lenght of: \n**${pp}D**`)
    } else {
        const target = message.mentions.users.first();
message.channel.send(`<@${target.id}>'s pp lenght is: \n**${pp}D**`)
    }
  },
};