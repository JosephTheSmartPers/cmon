const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const { getPost, getImage } = require('random-reddit')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("foodporn")
    .setDescription("I would eat."),

    run: async (client, interaction, args) => {

        await interaction.reply(`Searching the internet for food <a:loading:1026905223031173150>`)

        let reddit = "foodporn"

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
                    interaction.editReply({content: "", embeds: [embed]}); 

	}
}


