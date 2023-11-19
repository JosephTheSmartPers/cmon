const facts = require('fun-facts');
Discord = require("discord.js");
module.exports = {
  name: 'fact',
  aliases: [],
  cooldown: 0,
  description: "Sends a fun fact.",
  usage: "fact",
  async execute(message,args, cmd, client, Discord) {
      const res = facts.get()
      const embed = new Discord.EmbedBuilder()
      .setTitle("🗞️Fact:")
      .setDescription(res.fact)
      message.channel.send({embeds: [embed]})
  }
}