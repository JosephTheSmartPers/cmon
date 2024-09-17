const { DiscordTogether } = require('discord-together');
const Discord = require('discord.js');
module.exports = {
    name: "youtube",
    description: "Watch YouTube together",
    aliases: [],
    cooldown: 0,
    permissions: [],


    async execute(message,args, cmd, client, Discord, profileData) {
        client.discordTogether = new DiscordTogether(client);
        if(!message.member.voice.channel) return message.reply('You aint in a voicechannel wtf.')
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`${invite.code}`);
           
            });
        };
    }
}