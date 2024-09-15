const mongoose = require("mongoose");

const profileguildSchema = new mongoose.Schema({
  song: { type: String, require: false, unique: false },
  sid: { type: String, require: true, unique: true },
  timetable: { type: Array, require: false, unique: false },
});
const model = mongoose.model("song", profileguildSchema);

module.exports = model;
