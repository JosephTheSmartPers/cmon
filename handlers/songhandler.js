const { createChannel } = require("discord.js");
const { DisTube } = require("distube");
const songs = require("../models/song");

let timetable = [
  "17:04-17:05",
  "17:06-17:07",
  "17:08-17:09",
  "17:10-17:11",
  "17:12-17:13",
  "17:14-17:15",
  "17:48-17:49",
];

function getTime(dateString) {
  const now = new Date();
  const [hours, minutes] = dateString.split(":");
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );
}

module.exports = async (Discord, client) => {
  client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
  });

  let dataThing;
  let currentSong = "all i want for christmas is you";

  let songState = true;

  async function checkTime() {
    const channel = await client.channels.cache.get("959773491308146738");
    const textChannel = await client.channels.cache.get("957553977896095764");
    const member = await channel.guild.members.cache.get("483519738727759873");
    let message;

    const now = new Date();

    let inTimeRange = timetable.some((timeRange) => {
      let [start, end] = timeRange.split("-");
      let startTime = getTime(start);
      let endTime = getTime(end);

      return now >= startTime && now <= endTime;
    });

    if (inTimeRange != songState) {
      message = await textChannel.send(
        !songState ? "STOPPED SONG" : "STARTED SONG"
      );
    }
    songState = inTimeRange;

    if (inTimeRange) {
      //console.log("Within specified time range, do something.");
      try {
        await client.distube.pause(message);
      } catch (err) {}
    } else {
      //console.log("Outside of specified time range, do something else.");
      try {
        await client.distube.resume(message);
      } catch (err) {}
    }
  }

  async function playSong(songURL) {
    console.log(songURL);
    songState = false;
    const channel = await client.channels.cache.get("959773491308146738");
    const textChannel = await client.channels.cache.get("957553977896095764");
    const member = await channel.guild.members.cache.get("483519738727759873");
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

    await client.distube.play(channel, currentSong, {
      member,
      textChannel,
      skip: false,
      message,
      position: 1,
    });

    /*try{
        await client.distube.resume(message)
    }catch(err){

    }*/

    /*
    client.distube.on("playSong", (queue, song) => {
        textChannel.send("Now playing: "+ song.name)
    })*/
  }

  const id = setInterval(async () => {
    checkTime();
    let data = await songs.findOne({ sid: "1" });
    let timetabledata = await songs.findOne({ sid: "2" });

    if (await timetabledata) timetable = await timetabledata.timetable;
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
