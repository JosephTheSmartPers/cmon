const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require('discord.js')


const queue = new Map();




module.exports = {
    name: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aliases: ['eeeeeeeeeeeeeeeeeeeeeeeeeee', 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'], 
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message,args, cmd, client, Discord, profileData){


     
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('🔉You ain even in a channel, join one and than play ur song.');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.reply(':x:you cant even join a channel how ya wanna play da song?');
        

 
        const server_queue = queue.get(message.guild.id);

        const player = message.author;

      
 
        if (cmd === 'play'){
            if (!args.length) return message.reply(':x:You need to put a song after da command m8.');
            let song = {};

          
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, thumbnail: song_info.videoDetails.video_thumbnail, player: message.author.id }
            } else {
       
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url, player: message.author }
                } else {
                     message.channel.send('🔍There was an error finding ur video');
                }
            }

      
            if (!server_queue){
                const player = message.author
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    player: message.author,
                   
                    connection: null,
                    songs: []
                }
                
          
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
        
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send(':x:There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                const queueEmbed = new Discord.MessageEmbed()
                .setColor('#a335b8')
                .setTitle(`:arrow_forward: Added ${song.title} to the queue`)
                .setURL(song.url)
                .setDescription('yayyyyy')
                .addFields(
                    {name: 'Your desired song will be playing ', value: `:notes: :musical_note:  :notes: :musical_note: :notes: :musical_note: `}
                )
                .setImage(song.thumbnail)
                .setAuthor('Song added by:', message.author.displayAvatarURL({ dynamic: true}), message.author.tag)
            return message.channel.send(queueEmbed)
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);
        else if(cmd === 'play') play(message);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);
   


    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    const playEmbed = new Discord.MessageEmbed()
    .setColor('#a335b8')
    .setTitle(`:arrow_forward: Now playing ${song.title}`)
    .setURL(song.url)
    .setDescription('yayyyyy')
    .addFields(
        {name: 'Your desired song is playing ', value: `:notes: :musical_note:  :notes: :musical_note: :notes: :musical_note: `}
    )
    .setImage(song.thumbnail)
  await song_queue.text_channel.send(playEmbed)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Ya aint even in a voice call join on rn to play ur song.');
    if(!server_queue){
        const noskipEmbed = new Discord.MessageEmbed()
        .setColor('#f23030')
        .setTitle('No song in queue!')
        .addFields(
             {name: 'You cannot skip a song if there is no song in queue', value: '❌'}
        )
        .setFooter('First play a song.')
        return message.channel.send(noskipEmbed)
    }
    server_queue.connection.dispatcher.end();
    const skipEmbed = new Discord.MessageEmbed()
    .setColor('#54f230')
    .setTitle('Skiped')
    .addFields(
         {name: 'Succesfully skiped the song!', value: '✅'}
    )
    .setFooter('Nice')
    message.channel.send(skipEmbed)
}
const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        const nosongEmbed = new Discord.MessageEmbed()
        .setColor('#f23030')
        .setTitle('No song in queue!')
        .addFields(
             {name: 'You cannot stop the bot if there is no song in queue', value: '❌'}
        )
        .setFooter('First play a song.')
        return message.channel.send(nosongEmbed)
    }
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
    const stopEmbed = new Discord.MessageEmbed()
    .setColor('#54f230')
    .setTitle('Stoped')
    .addFields(
         {name: 'Succesfully stoped the song!', value: '✅'}
    )
    .setFooter('Nice')
    message.channel.send(stopEmbed)
}
const play = (message) => {
    if(!args[0]) return
     const playEmbed = new Discord.MessageEmbed()
    .setColor('#54f230')
    .setAuthor(message.author.tag, messag.author.displayAvatarURL({ dynamic: true}))
    .setTitle('Stoped')
    .setDescription(`Song played by ${message.author.username}`)
    message.channel.send(playEmbed)
}



