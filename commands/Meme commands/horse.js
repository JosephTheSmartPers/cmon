const { getPost, getImage } = require('random-reddit')
const Discord = require('discord.js');
module.exports = {
    name: 'horse',
    aliases: [],
    cooldown: 0,
    description: 'Sends random horse picture',
    usage: "horse",
    async execute(message, args, cmd, client, Discord){
        let msg = await message.channel.send(`Searching the internet for horses <a:loading:1026905223031173150>`)

let reddit = "horses"

let res = await getPost(reddit);
let description = res.selftext
let title = res.title
        function isvid(res){
            if(res.crosspost_parent_list){
                if(res.crosspost_parent_list.is_video == true) return true
            }
            return false
        }

        while(!res.url_overridden_by_dest || res.is_video == true || isvid(res) || res.type == 'video' || res.url.includes("gallery")){
            res = await getPost(reddit);
        }
                if(title.length > 200){
                    title = "Too long"
                }
                if(description.length > 200){
                    description = "Too long"
                }
            const embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setImage(res.url_overridden_by_dest)
                .setTitle(res.title)
                .setURL(res.url)
                .setFooter({text: `👍${res.ups} 👎${res.downs} | 💬${res.num_comments}`})
        msg.edit({content: "", embeds: [embed]});
            }
        }