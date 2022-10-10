const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ComponentType } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends you a list of all the commands."),

    run: async (client, interaction, args) => {


        function cap(str){
           return str.charAt(1).toUpperCase() +str.slice(2)
        }

        const descriptions = {
            'fun': "Some fun commands, a few of them can earn you moniy!",
            'economy': "Commands for the economy section.",
            'music': "Wanna listen to music or podcasts?",
            'moderation': "POLICE ARE ON THEIR WAY!",
            'utility': "Commands that make your life easier.",
            'support': "Need help?",
            'meme': "Get images from reddit, create, or browse memes.",
            'setup': "Customize how the bot works on the server (recommended).",
            'test': "Commands you can't you but will be availabe in the future.",
            "space": "See a bunch of API stuff about space."
          }

          const names = {
            'fun': "🎉Fun commands",
            'economy': "🎟Economy commands",
            'music': "🎵Music commands",
            'moderation': "👮Moderation commands",
            'utility': "💻Utility commands",
            'support': "📁User support commands",
            'meme': "😂Meme commands",
            'setup': "🛠️Setup commands",
            'test': "⚠️Under developement",
            "space": "🪐Space commands"
          }

          const colors = {
            'fun': "Red",
            'economy': "Green",
            'music': "Purple",
            'moderation': "Blue",
            'utility': "#9c9b9a",
            'support': "#edc677",
            'meme': "Yellow",
            'setup': "Black",
            'test': "#ffb31c",
            "space": "#300847"
          }

        let directories = [
            ...new Set(client.slashCommands.map((cmd) => cmd.directory)),
        ];
        directories = directories.filter(dir => dir != undefined)

        const formatString = (str) => 
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
        const categories = directories.map((dir) => {
            const getCommands = client.slashCommands
            .filter((cmd) => cmd.directory === dir)
                .map((cmd) => {
                    return {
                        name: cmd.name || 'No command name',
                        description: cmd.description || 'No command description',

                    };
                });
                return {
                    directory: formatString(dir),
                    commands: getCommands,
                };
        })
        
        const embed = new EmbedBuilder()
        .setColor('#15ff00')
            .setTitle(`Select the category in the dropdown menu!`)
            .setDescription(`**Barnibot** is an easy to use disocrd bot with **${client.commands.size}** commands, there isn't a dashboard for now, if you have any problems dm: **Barni#0811** (creator of bot, very cool)\n[invite](https://discord.com/oauth2/authorize?client_id=836893540427759646&scope=bot&permissions=8589934591)`)
    
            const components = (state) => [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                    .setCustomId(interaction.id)
                    .setPlaceholder("Select a category")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: names[cmd.directory.toLocaleLowerCase()],
                                value: cmd.directory.toLowerCase(),
                                description: descriptions[cmd.directory.toLocaleLowerCase()]
                        }
                    })
                    )
                ),
            ];
        await interaction.reply({embeds: [embed],
        components: components(false),
    });
    const filter = (inter) => inter.user.id === interaction.user.id && inter.customId == interaction.id;
    
    const collector = interaction.channel.createMessageComponentCollector({
        filter,
        componentType: ComponentType.SelectMenu,
    });

    collector.on('collect', (inter) => {
        const [ directory ] = inter.values;
        const category = categories.find(
            x => x.directory.toLowerCase() === directory
        );
        const categoryEmbed = new Discord.EmbedBuilder().setColor(colors[directory.toLocaleLowerCase()]).setTitle(
            `${names[directory.toLocaleLowerCase()]}`
        ).setDescription(`${descriptions[directory.toLocaleLowerCase()]}`).addFields({name: "**Name**", value: "**Description**"}).addFields(
            category.commands.map((cmd) => {
                return {
                    name: `${cmd.name}`,
                    value: `${cmd.description}`,
                    inline: true,
                };
            })
        );

        inter.update({ embeds: [categoryEmbed], ephemeral: true})
    });
    collector.on('end', () => {
        editReply({ components: components(true)})
    })

	}
}

