const Discord = require('discord.js');
module.exports = {
    name: 'invite',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Sends the bot invite.',
    usage: "invite",
    async execute(message, args, cmd, client, Discord){
        const embed = new Discord.MessageEmbed()
        .setTitle("📧Click here for invite link")
        .setURL('https://discord.com/api/oauth2/authorize?client_id=836893540427759646&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize%3Fclient_id%3D836893540427759646%26scope%3Dbot%26permissions%3D8589934591&response_type=code&scope=identify%20email%20applications.commands')
        .setColor("GREEN")
        message.channel.send({embeds: [embed]})
            }
}