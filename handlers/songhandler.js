const {DisTube} = require('distube')
const songs = require('../models/song')

module.exports = async (Discord, client) =>{
    client.distube = new DisTube(client, {
        leaveOnStop: false,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
})

let playing = true

async function updateSong(songURL){
    await songs.findOneAndUpdate({
        userID: message.author.id,
    }, 
    {$set: {
            song: `${songURL}`,
    }});
}


async function playSong(songURL){  
    
    const channel = await client.channels.cache.get("1045781216080707594")
    const textChannel = await client.channels.cache.get("957553977896095764")
    const member = await channel.guild.members.cache.get("826004037043617803")
    const message = await textChannel.send(`message`)
    if(songURL == "toggleStop"){
        if(playing == true){
            client.distube.stop(message)
            textChannel.send("STOPPED SONG")
            playing = false
        }
        else{
            client.distube.resume(message)
            textChannel.send("STARTED SONG")
            playing = true
        }
    }
    client.distube.play(channel, songURL, {
        member,
        textChannel,
        message,
    })
    try{
    client.distube.skip(message);
    }catch(err){}
    client.distube.on("playSong", (queue, song) => {
        textChannel.send("Now playing: "+ song.name)
    })
}

let currentSong = ""

const id = setInterval(async () => {

    let data = await songs.findOne({ sid: "1"});
    if(!data){
        let thingi = await songs.create({
            sid: "1",
            song: "All I want for christmas is you"
        })
        thingi.save()
        return
    }
    else if(currentSong != data.song){
        playSong(data.song)
        currentSong = data.song
    }

}, 5000);

}

