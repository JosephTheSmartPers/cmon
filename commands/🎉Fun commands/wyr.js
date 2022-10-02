const Discord = require('discord.js');
const { getPost, getImage } = require('random-reddit')
module.exports = {
    name: 'wyr',
    aliases: ['wouldyourather'],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Sends a would you rather question.',
    usage: "wyr",
    async execute(message, args, cmd, client, Discord){
        let post = await getPost("WouldYouRather")
        const themEmoji = '🇦';
        const heEmoji = '🇧';
            const embed = new Discord.EmbedBuilder()
            
                .setColor("Random")
                .setImage(post.url_overridden_by_dest)
                .setTitle(post.title)
                .setDescription(post.selftext)
              let messageEmbed = await message.channel.send({embeds: [embed]});
              messageEmbed.react(themEmoji);
              messageEmbed.react(heEmoji);
              
        
                   
        
                        
                
            }
        }