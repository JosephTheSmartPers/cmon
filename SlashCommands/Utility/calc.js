const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("calc")
    .setDescription("Calculate some stuff.")
    .addNumberOption(option=> option.setName("num1").setDescription("The first number").setRequired(true))
    .addStringOption(option => option.setName("operator").setDescription("The operator.").setRequired(true).addChoices(
        {name: "*", value:"*"},
        {name: "/", value:"/"},
        {name: "+", value:"+"},
        {name: "-", value:"-"}
    ))
    .addNumberOption(option=> option.setName("num2").setDescription("The second number").setRequired(true)),

    run: async (client, interaction, args) => {


        let num1 = interaction.options.getNumber("num1")
        let num2 = interaction.options.getNumber("num2")
        let op = interaction.options.getString("operator")

        if (op === "*"){
            types = 0
            const result = (num1) * (num2)

            interaction.reply(`Your result is ${result}`)
        } else if (op === "/") {
            types = 1
            const result = (num1) / (num2)

            interaction.reply(`Your result is ${result}`)
        } else if (op === "+") {
            let res5 = num1
            res5 = res5 + parseInt(num2)
            interaction.reply(`Your result is ${res5}`)
        } else if (op === "-") {

            types = 3
            const result = (num1) - (num2)

            interaction.reply(`Your result is ${result}`)

        
        }

	}
}

