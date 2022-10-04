const Discord = require('discord.js');
const { min } = require('moment');
module.exports = {
    name: 'banlist',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Displays a list of banned people',
    usage: "banlist",
     async execute(message, args, cmd, client, Discord, profileData){
          const fetchBans = await message.guild.bans.fetch()
        let bmem = (await fetchBans)
        .map((member) => member.user.tag)
.join(" \n");
if(!bmem){
     bmem = ":x: No banned members!"
}
            const embed = new EmbedBuilder()
                .setTitle(`📃List of banned members:`)
                .setDescription(bmem)
     message.channel.send({embeds: [embed]})
}
}
