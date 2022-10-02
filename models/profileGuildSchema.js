const mongoose = require('mongoose');

const profileguildSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: false},
    serverID: { type: String, require: true, unique: false},
    xp: { type: Number},
    level: { type: Number},
    warnings: {type: Number },
    password: {type: String },
})
const model = mongoose.model('ProfileGuildModels', profileguildSchema);

module.exports = model;