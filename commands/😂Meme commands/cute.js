const Discord = require('discord.js');
const { getPost, getImage } = require('random-reddit')
module.exports = {
    name: 'cute',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Sends something cute',
    usage: "cute",
    async execute(message, args, cmd, client, Discord){
        let res = await getPost('cute');
        let description = res.selftext
        let title = res.title
        while(!res.url_overridden_by_dest || res.is_video == true || res.type == 'video'){
            res = await getPost('cute');
        }
                if(title.length > 200){
                    title = "Too long"
                }
                if(description.length > 200){
                    description = "Too long"
                }
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setImage(res.url_overridden_by_dest)
                        .setTitle(res.title)
                        .setURL(res.url)
                        .setDescription(res.selftext)
                        .setFooter(`👍${res.ups} 👎${res.downs} | 💬${res.num_comments}`)
                        message.channel.send({embeds: [embed]}); 
            }
        }