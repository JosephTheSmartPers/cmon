const { createChannel } = require("discord.js");
const { DisTube } = require("distube");
const songs = require("../models/song");

let timetable = [
  "08:15-09:50",
  "10:05-10:50",
  "11:05-11:50",
  "12:20-13:40",
  "13:50-14:35",
  "14:40-15:25",
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
    nsfw: true,
  });

  const channel = await client.channels.cache.get("959773491308146738");
  const textChannel = await client.channels.cache.get("957553977896095764");
  const member = await channel.guild.members.cache.get("483519738727759873");

  let dataThing;
  let currentSong = "all i want for christmas is you";
  let prevNumber;

  let slagerLista = [
    "orbán verd ki a ferinek",
    "justin bieber - baby",
    "florida - whistle",
    "dynamite - bts",
  ];
  let slagerHely = 0;

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

  async function playSlager(message) {
    try {
      await client.distube.play(channel, slagerLista[slagerHely], {
        member,
        textChannel,
        skip: false,
        message,
        position: 1,
      });
      slagerHely++;
      if (slagerHely >= slagerLista.length) slagerHely = 0;
    } catch (err) {}
  }

  async function playSong(songURL) {
    songState = false;

    const message = await textChannel.send(songURL);

    if (
      dataThing == "toggleStop" ||
      dataThing == "toggleStart" ||
      dataThing == "skip"
    ) {
      if (dataThing == "toggleStop")
        try {
          await client.distube.pause(message);
        } catch (err) {}
      if (dataThing == "skip") {
        try {
          await client.distube.skip(message);
        } catch (err) {
          console.log(err);
          playSlager(message);
        }
      }
      if (dataThing == "toggleStart")
        try {
          await client.distube.resume(message);
        } catch (err) {}
      return;
    }

    try {
      await client.distube.play(channel, currentSong, {
        member,
        textChannel,
        skip: false,
        message,
        position: 1,
      });
    } catch (err) {}

    try {
      await client.distube.resume(message);
    } catch (err) {}

    /*
    client.distube.on("playSong", (queue, song) => {
        textChannel.send("Now playing: "+ song.name)
    })*/
    client.distube.on("finish", (queue, song) => {
      playSlager(message);
    });
  }

  const id = setInterval(async () => {
    checkTime();
    let data = await songs.findOne({ sid: "1" });
    let timetabledata = await songs.findOne({ sid: "2" });
    let slagerlistdata = await songs.findOne({ sid: "3" });

    if (await timetabledata) timetable = await timetabledata.timetable;
    if (await slagerlistdata) slagerLista = await slagerlistdata.songs;

    if (!data) {
      let thingi = await songs.create({
        sid: "1",
        song: "All I want for christmas is you",
      });
      thingi.save();
      return;
    } else if (data.number != prevNumber && data.song != "") {
      prevNumber = data.number;
      if (data.song == "toggleStop") {
        dataThing = "toggleStop";
      } else if (data.song == "toggleStart") {
        dataThing = "toggleStart";
      } else if (data.song == "skip") {
        dataThing = "skip";
      } else if (
        data.song != "toggleStart" &&
        data.song != "toggleStop" &&
        data.song != "skip"
      ) {
        currentSong = data.song;
      }
      dataThing = data.song;

      playSong(currentSong);
    }
  }, 5000);
};
