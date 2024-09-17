const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const util = require('minecraft-server-util');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("minecraft")
    .setDescription("See the status of any minecraft server.")
    .addStringOption(option => option.setName("ip").setDescription("The ip of the server.").setRequired(true))
    .addNumberOption(option => option.setName("port").setDescription("The port of the server.").setMinValue(1)),

    run: async (client, interaction, args) => {

        let ip = interaction.options.getString("ip")
        let POrt = interaction.options.getNumber("port") || 25565

        interaction.reply(`Searching minecraft for \`${ip}\` <a:loading:1026905223031173150>`)

        util.status(ip, parseInt(POrt)).then((response) =>{
            const embed = new EmbedBuilder()
                .setColor('#4ce100')
                .setTitle('Minecraft server status')
                .addFields(
                    {name: 'Server IP📋', value: `${ip}`},
                    {name: 'Online players🟢', value: `${response.players.online}`},
                    {name: 'Max Players👥', value: `${response.players.max}`},
                    {name: 'Version🆚', value: `${response.version.name}`},
                    {name: 'Description📖', value: `${response.motd.clean}`}
                )

            interaction.editReply({content: "", embeds: [embed]});
            })
        .catch ((error) =>{
            interaction.editReply(`❗There was an error finding \`${ip}\`❗`);
            throw error;
        })

	}
}

