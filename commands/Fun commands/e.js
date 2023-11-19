const facts = require('imageapi.js');
Discord = require("discord.js");
module.exports = {
  name: 'e',
  aliases: [],
  cooldown: 0,
  description: "Make a BIG E",
  usage: "e",
  async execute(message,args, cmd, client, Discord) {
    message.channel.send('<:Bige:867415214173716491>')
  }
}