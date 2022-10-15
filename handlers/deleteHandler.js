const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

module.exports = async () =>{

    const clientId = "836893540427759646"
    const guildId = "765863431504134154"

    await rest.get(Routes.applicationGuildCommands(clientId, guildId))
    .then(data => {
        const promises = [];
        for (const command of data) {
          console.log(`Deleted ${command.name}`)
            const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        console.log(`Deleted ${data.length} commands`)
        return Promise.all(promises);
    });
}