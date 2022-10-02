const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js")
const GuildModel = require('../models/guildSchema')
module.exports = {
    name: 'akgcorerr',
    cooldown: 0,
    aliases: [],
    permissions: [],
    description: "Displays a list of valid commands for all users.",
    async execute(message, args, cmd, client, Discord) {
const embed = new Discord.MessageEmbed()
.setTitle("Pick a csibe")
.setDescription("Válaszd ki hogy melyik csibébe vagy és annak megfelelően kapsz majd egy rangot amely egyáltalán nem sorol be egy adatbázisba amelybe hogyha Laffi csibés vagy -2000 kredittel kezdesz ami alapból börtönt jelen.")
.setColor("RED")
const components = (state) => [
    new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("akgcore")
        .setPlaceholder("Válassz ki role plis")
        .setDisabled(state)
        .addOptions(
            {label: "💪Mariann Csibe", value: "mariann", description: ""},
            {label: "🏳️‍🌈Laffi Csibe", value: "laffi", description: ""},
            {label: "🏯Iván Csibe", value: "ivan", description: ""},
            {label: "🌑Edit Csibe", value: "edit", description: ""}
        ))]

message.channel.send({
    embeds: [embed],
    components: components(false)
    })
    }
}