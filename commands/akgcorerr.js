const {
    ActionRowBuilder,
    SelectMenuBuilder
} = require("discord.js")
const GuildModel = require('../models/guildSchema')
module.exports = {
    name: 'akgcorerr',
    cooldown: 0,
    aliases: [],
    permissions: [],
    description: "Displays a list of valid commands for all users.",
    async execute(message, args, cmd, client, Discord) {
const embed = new Discord.EmbedBuilder()
.setTitle("Pick a csibe")
.setDescription("Válaszd ki hogy melyik csibébe vagy és annak megfelelően kapsz majd egy rangot amely egyáltalán nem sorol be egy adatbázisba amelybe hogyha Laffi csibés vagy -2000 kredittel kezdesz ami alapból börtönt jelen.")
.setColor("Red")
const components = (state) => [
    new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
        .setCustomId("akgcore")
        .setPlaceholder("Válassz ki role plis")
        .setDisabled(state)
        .addOptions(
            {label: "💪Mariann Csibe", value: "mariann", description: "Mariann csibés vagy"},
            {label: "🏳️‍🌈Laffi Csibe", value: "laffi", description: "Laffi csibés vagy"},
            {label: "🏯Iván Csibe", value: "ivan", description: "Iván csibés vagy"},
            {label: "🌑Veronika Csibe", value: "edit", description: "Veronika csibés vagy"}
        ))]

message.channel.send({
    embeds: [embed],
    components: components(false)
    })
    }
}