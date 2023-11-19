const canvacord = require("canvacord");
const Discord = require('discord.js');

const profileModel = require("../../models/profileSchema");
const ProfileGuildModels = require("../../models/profileGuildSchema");
module.exports = {
    name: 'rank',
    aliases: [],
    cooldown: 0,
    description: 'Shows how much xp you currently have!',
    usage: "rank",
     async execute(message, args, cmd, client, discord, profileData){
      let userdata =  await ProfileGuildModels.findOne({ userID: message.author.id, serverID: message.guildId});
      const level = userdata.level
      const xp = userdata.xp

      const rank = new canvacord.Rank()
      .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png'}))
      .setCurrentXP(xp)
      .setRequiredXP(1000)
      .setStatus(message.member.presence.status)
      .setProgressBar('#FFA500', "COLOR")
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator)
      .setLevel(level)
          rank.build()
        .then(data => {
          const attacment = new Discord.AttachmentBuilder(data, 'funny.png')
          message.channel.send({files: [attacment]})
        })
     }
}
