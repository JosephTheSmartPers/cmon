

const discord = require('discord.js');
const { getPost, getImage } = require('random-reddit')

module.exports = {
    name: 'meme',
    aliases: ['mem'],
    cooldown: 0,
    description: 'Sends random meme',
    usage: "meme",
    async execute(message, args, cmd, client, Discord){
        let titles = []
                let images = []
                let footers = []
                let side = 1
                let max = 1
                const row = new discord.ActionRowBuilder().addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId("for")
                    .setLabel("Next")
                    .setStyle("Success")
                    .setDisabled(false)
                )
                const subReddits = ["meme", "memes", "AdviceAnimals", "MemeEconomy", "ComedyCemetery", "PrequelMemes", "FostTalicska"]

                           let random = subReddits[Math.floor(Math.random() * subReddits.length)]

                           let image = await getImage(random)
                           let post = await getPost(random)
                           let title = post.title
                           while(!post.url_overridden_by_dest || post.is_video == true || post.type == 'video'){
                            res = await getPost(random);
                        }
                                if(title.length > 200){
                                    title = "Too long"
                                }
                        const embed = new Discord.EmbedBuilder()
                            .setColor("Random")
                            .setImage(post.url_overridden_by_dest)
                            .setTitle(title)
                            .setFooter({text: `👍${post.ups} 👎${post.downs} | 💬${post.num_comments}`})
                           const msg = await message.channel.send({embeds: [embed], components: [row]});

                            const filter = (interaction) => {
                                if(interaction.user.id === message.author.id) return true
                                return
                            }
                            const collector = await message.channel.createMessageComponentCollector({
                                filter,
                                max: 999,
                            });
                            await collector.on("collect", async (ButtonInteraction) => {
                               ButtonInteraction.deferUpdate()

                                        max = max + 1
                                        side = side + 1

                                        random = subReddits[Math.floor(Math.random() * subReddits.length)]

                                        image = await getImage(random)
                                        post = await getPost(random)
                                        title = post.title
                                        while(!post.url_overridden_by_dest || post.is_video == true || post.type == 'video'){
                                         res = await getPost(random);
                                     }
                                             if(title.length > 200){
                                                 title = "Too long"
                                             }
                                     const embed = new Discord.EmbedBuilder()
                                         .setColor("Random")
                                         .setImage(post.url_overridden_by_dest)
                                         .setTitle(title)
                                         .setFooter({text: `👍${post.ups} 👎${post.downs} | 💬${post.num_comments}`})
                                        msg.edit({embeds: [embed]})





                            })
            }
            
        }
       
                
              
                
                           
                
                                
                        

                
