const {
    Client, 
    Message,
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    ComponentType
    } = require("discord.js")

const GuildModel = require('../../models/guildSchema')

module.exports = {
    name: "help",
    description: "TEST",
    aliases: [],
    cooldown: 0,
    permissions: [],
    usage: "help",

    async execute(message,args, cmd, client, Discord, profileData) {

        let p = "-"
        if(message.guild){
        let data = await GuildModel.findOne({guildId: message.guild.id});
        p = await data.prefix 
        }
        

        if(p === null) p = '-';
        if(!message.guild) p = '-'

        function cap(str){
           return str.charAt(1).toUpperCase() +str.slice(2)
        }

        const descriptions = {
            'mmands': "Some fun commands, a few of them can earn you moniy!",
            'mycommands': "Commands for the economy section.",
            'commands': "Wanna listen to music or podcasts?",
            'ationcommands': "POLICE ARE ON THEIR WAY!",
            'tycommands': "Commands that make your life easier.",
            'upport commands': "Need help?",
            'ommands': "Get images from reddit, create, or browse memes.",
            'pcommands': "Customize how the bot works on the server (recommended).",
            'developement': "Commands you can't you but will be availabe in the future."
          }

          const names = {
            'mmands': "🎉Fun commands",
            'mycommands': "🎟Economy commands",
            'commands': "🎵Music commands",
            'ationcommands': "👮Moderation commands",
            'tycommands': "💻Utility commands",
            'upport commands': "📁User support commands",
            'ommands': "😂Meme commands",
            'pcommands': "🛠️Setup commands",
            'developement': "⚠️Under developement",
          }

        let directories = [
            ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];
        
        directories = directories.filter(dir => dir != undefined)

        const formatString = (str) => 
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
        const categories = directories.map((dir) => {
            const getCommands = client.commands
            .filter((cmd) => cmd.directory === dir)
                .map((cmd) => {
                    return {
                        name: cmd.usage || 'No command name',
                        description: cmd.description || 'No command description',

                    };
                });
                return {
                    directory: formatString(dir),
                    commands: getCommands,
                };
        })
        const embed = new Discord.EmbedBuilder()
        .setColor('#15ff00')
            .setTitle(`Select the category in the dropdown menu! Prefix: \`${p}\``)
            .setDescription(`**Barnibot** is an easy to use disocrd bot with **${client.commands.size}** commands, there isn't a dashboard for now, if you have any problems dm: **Barni#0811** (creator of bot, very cool)\n[invite](https://discord.com/oauth2/authorize?client_id=836893540427759646&scope=bot&permissions=8589934591)`)
    
            const components = (state) => [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                    .setCustomId(message.id)
                    .setPlaceholder("Select a category")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label:names[cmd.directory.toLocaleLowerCase().replace(" ", "").substring(7)],
                                value: cmd.directory.toLowerCase(),
                                description: descriptions[cmd.directory.toLocaleLowerCase().replace(" ", "").substring(7)]
                        }
                    })
                    )
                ),
            ];
        const initialMessage = await message.channel.send({embeds: [embed],
        components: components(false),
    });
    const filter = (interaction) => interaction.user.id === message.author.id && interaction.customId == message.id;
    
    const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: ComponentType.SelectMenu,
    });

    collector.on('collect', (interaction) => {
        const [ directory ] = interaction.values;
        const category = categories.find(
            x => x.directory.toLowerCase() === directory
        );
        const categoryEmbed = new Discord.EmbedBuilder().setTitle(
            `${names[directory.toLocaleLowerCase().replace(" ", "").substring(7)]}`
        ).setDescription(`${descriptions[directory.toLocaleLowerCase().replace(" ", "").substring(7)]}`).addFields({name: "**Usage**", value: "**Description**"}).addFields(
            category.commands.map((cmd) => {
                return {
                    name: `${p}${cmd.name}`,
                    value: `${cmd.description}`,
                    inline: true,
                };
            })
        );

        interaction.update({ embeds: [categoryEmbed], ephemeral: true})
    });
    collector.on('end', () => {
        initialMessage.edit({ components: components(true)})
    })
    },
};