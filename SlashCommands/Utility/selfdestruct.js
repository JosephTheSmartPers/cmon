const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("selfdestruct")
    .setDescription("Sends a message and deletes it after specified time.")
    .addStringOption(option => option.setName("text").setDescription("The message you want to send.").setRequired(true))
    .addNumberOption(option => option.setName("time").setDescription("(Seconds) The time after the message will be deleted").setRequired(true).setMinValue(1)),

    run: async (client, interaction, args) => {
        const delnum = args.getNumber("time") * 1000
        const string = args.getString("text")

        interaction.reply({content: "Sent message<a:Check:831956237305643069>", ephemeral: true})

            await interaction.channel.send('Message deleted here, A message has been deleted here due to a selfdestruct command!')
            await interaction.channel.send('Message deleted here, A message has been deleted here due to a selfdestruct command!')
            await interaction.channel.messages.fetch({limit: '2'}).then(async messages =>{
                await interaction.channel.bulkDelete(messages);
            });
      
            await interaction.channel.send(`**${interaction.user.username}:** ${string.replace("-a","")} \n*(deleted in ${delnum / 1000} seconds)* `).then((msg) => {
                setTimeout(async () =>{
                    await interaction.channel.send('Message deleted here, A message has been deleted here due to a selfdestruct command!')
                    await interaction.channel.messages.fetch({limit: '2'}).then(async messages =>{
                        await interaction.channel.bulkDelete(messages);
                    });
                    }, delnum);
            }) 

	}
}

