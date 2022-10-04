const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const lyrics = require('lyrics-finder'); // npm i lyrics-finder
const yt = require('yt-search'); // npm i yt-search

module.exports = {
    ...new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Get the lyrics of any song.")
    .addStringOption(option => option.setName('song').setDescription('The song that you want to get the lyrics of.').setRequired(true)),

    run: async (client, interaction, args) => {
        
        let emoji = "<a:loading:1026905223031173150>"
        const songSug = await interaction.options.getString("song")
        let user = interaction.user

        interaction.reply(`Searching the internet for \`${songSug}\` ${emoji}`)

        let embed = new EmbedBuilder().setColor('Random').setFooter({text: `Requested by ${user.tag}`, iconURL: user.displayAvatarURL()}); // Constructing the embed
        let lyric = await lyrics(songSug); // Searching for the lyrics on Google
        let noLyric = 0 // Indicates if the lyrics exist or not

        


        if (!lyric) {
            lyric = `No Lyrics found for ${songSug}`; // Handles no lyrics
            noLyric++ // Increments noLyric to indicate theres no lyrics
        }

        embed.setDescription(lyric.length >= 4093 ? lyric.substring(0, 4093) + '...' : lyric); // Adds the lyrics to the embed

        if (noLyric == 0) {
            let res = await yt.search(songSug); // Searches the song name on youtube
            let song = res.videos[0]; // Chooses the first result
            if (song) embed.setTitle(song.title).setURL(song.url).setThumbnail(song.image) // Adds the youtube video data to the embed
        }

        interaction.editReply({ content: "", embeds: [embed] }) // Sends the embed

	}
}

