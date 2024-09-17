const Discord = require('discord.js');
const { getPost, getImage } = require('random-reddit')
module.exports = {
    name: 'oneliner',
    aliases: [],
    cooldown: 0,
    description: 'Sends random oneliner',
    usage: "oneliner",
    async execute(message, args, cmd, client, Discord){
        const post = await getPost('oneliners')
        console.log(post)
        const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setImage(post.url_overridden_by_dest)
            .setTitle(`${post.title.toString()}`)
            .setFooter({text: `👍${post.ups} 👎${post.downs}`})
        message.channel.send({embeds: [embed]});
            }
        }