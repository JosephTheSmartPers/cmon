const { createChannel } = require("discord.js");
const { DisTube } = require("distube");
const songs = require("../models/song");

module.exports = async (Discord, client) => {
  client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
  });

  let dataThing;

  async function playSong(songURL) {
    const channel = await client.channels.cache.get("959773491308146738");
    const textChannel = await client.channels.cache.get("957553977896095764");
    const member = await channel.guild.members.cache.get("826004037043617803");
    const message = await textChannel.send(`message`);
    /* if(dataThing == "toggleStop"){
        try{
            await client.distube.stop(message)
        }catch(err){
            
        }
            textChannel.send("STOPPED SONG")
return
    }if(dataThing == "toggleStart"){
        try{
            await client.distube.resume(message)
        }catch(err){

        }
            textChannel.send("STARTED SONG")
            
        }*/

    client.distube.play(channel, currentSong, {
      member,
      textChannel,
      message,
    });

    /*try{
        await client.distube.resume(message)
    }catch(err){

    }*/
    try {
      await client.distube.skip(message);
    } catch (err) {}
    /*
    client.distube.on("playSong", (queue, song) => {
        textChannel.send("Now playing: "+ song.name)
    })*/
  }

  let currentSong = "all i want for christmas is you";

  const id = setInterval(async () => {
    let data = await songs.findOne({ sid: "1" });
    if (!data) {
      let thingi = await songs.create({
        sid: "1",
        song: "All I want for christmas is you",
      });
      thingi.save();
      return;
    } else if (dataThing != data.song && data.song != "") {
      if (data.song == "toggleStop") {
        dataThing = "toggleStop";
      } else if (data.song == "toggleStart") {
        dataThing = "toggleStart";
      } else if (data.song != "toggleStart" && data.song != "toggleStop") {
        currentSong = data.song;
      }
      dataThing = data.song;

      playSong(currentSong);
    }
  }, 5000);
};
