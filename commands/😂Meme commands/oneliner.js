const Discord = require('discord.js');
const { getPost, getImage } = require('random-reddit')
module.exports = {
    name: 'oneliner',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Sends random oneliner',
    usage: "oneliner",
    async execute(message, args, cmd, client, Discord){
        const post = await getPost('oneliners')
            const embed = new Discord.MessageEmbed()
            
                            .setColor("RANDOM")
                .setImage(post. url_overridden_by_dest)
                .setTitle(post.title.toString())    
                .setDescription(post.selftext)
                
                .setFooter(`👍${post.ups} 👎${post.downs}`)
                message.channel.send({embeds: [embed]}); 
            }
        }