    require('dotenv').config();

    const { SlashCommandBuilder } = require('@discordjs/builders');
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');

    const token = process.env.DISCORD_TOKEN;
    const clientID = "836893540427759646"

    const rest = new REST({ version: '9' }).setToken(token);

        module.exports = {
            requiredPermissions: ["ADMINISTRATOR"],
            name: 'seeslash',
            description: "See the slash commands in this guild",

            run: async (client, interaction, args) => {

                let server = interaction.guildId
                rest.get(Routes.applicationGuildCommands(clientID, server))
                .then(data => {
                    const promises = [];
                    const embed = new Discord.MessageEmbed()
                        .setTitle("List of slash commands in this guild.")
                        .addFields(data.map((thing) => {
                            return {
                                name: `/${thing.name}`,
                                value: thing.description,
                                inline: true,
                            }
                        }))
                        interaction.reply({embeds: [embed]})
                });
            },
        
        
        }