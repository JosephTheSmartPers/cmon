const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    serverID: { type: String, require: true},
    moniy: { type: Number, default: 1000},
    banker: { type: Number},
    xp: { type: Number},
    level: { type: Number},
    drugs: { type: Number},
    guitar: {type: Number},
    broom: { type: Number},
    tomato: { type: Number},
    handgun: { type: Number},
    creditcard: { type: Number},
    warnings: {type: Number },
    house: {type: Object },
    worked: {type: Date },
    daily: {type: Date},
    password: { type: String},
    login: {type: Date},
    inv: {type: Object},
    times: {type: Object},
    veh: {type: Object},
    timeouts: {type: Object},
})
const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;