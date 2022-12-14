const lyrics = require('lyrics-finder'); // npm i lyrics-finder
const yt = require('yt-search'); // npm i yt-search

module.exports = {
    name: 'lyrics',
    aliases: ['ly'],
    cooldown: [0],
    description: 'Sends lyrics of something',
    usage: 'lyrics <song name>',
    async execute(message, args, cmd, client, Discord) {
        if (!args.length) return message.channel.send('No song specified'); // Handles empty search queries

        let embed = new Discord.EmbedBuilder().setColor('Random').setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()});
        let lyric = await lyrics(args.join(' ')); // Searching for the lyrics on Google
        let noLyric = 0 // Indicates if the lyrics exist or not

        if (!lyric) {
            lyric = `No Lyrics found for ${args.join(' ')}`; // Handles no lyrics
            noLyric++ // Increments noLyric to indicate theres no lyrics
        }

        embed.setDescription(lyric.length >= 4093 ? lyric.substring(0, 4093) + '...' : lyric); // Adds the lyrics to the embed

        if (noLyric == 0) {
            let res = await yt.search(args.join(' ')); // Searches the song name on youtube
            let song = res.videos[0]; // Chooses the first result
            if (song) embed.setTitle(song.title).setURL(song.url).setThumbnail(song.image) // Adds the youtube video data to the embed
        }

        message.channel.send({ embeds: [embed] }) // Sends the embed
    }
}   