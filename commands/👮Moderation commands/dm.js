const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'dm',
  aliases: [],
  permissions: ["Administrator"],
  cooldown: [0],
  description: 'spam dms',
  usage: "dm <@person> <text>",
  async execute(message, args, cmd, client, Discord) {

      const user = message.mentions.users.first() || 
      message.guild.members.cache.get(args[0])?.user;
      const string = args.slice(1).join(" ")
      
          user.send(string.replace("-a",""));


      },
    };