const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js")
const GuildModel = require('../models/guildSchema')
module.exports = {
    name: 'helptest',
    cooldown: 0,
    aliases: [],
    permissions: [],
    description: "Displays a list of valid commands for all users.",
    usage: "help",
    async execute(message, args, cmd, client, Discord) {
        let inline = true
        let p = "-"
        if(message.guild){
        let data = await GuildModel.findOne({guildId: message.guild.id});
        p = await data.prefix 
        }
        

        if(p === null) p = '-';
    if(!message.guild) p = '-'
      console.log(p)
      const embed = new MessageEmbed()
      .setColor('#15ff00')
          .setTitle(`Select the category in the dropdown menu! Prefix: \`${p}\``)
          .setDescription(`**Barnibot** is an easy to use disocrd bot with **${Object.keys(client.commands).lenght}** commands, there isn't a dashboard for now, if you have any problems dm: **Barni#0811** (creator of bot, very cool)\n[invite](https://discord.com/oauth2/authorize?client_id=836893540427759646&scope=bot&permissions=8589934591)`)
  
          const components = (state) => [
              new MessageActionRow().addComponents(
                  new MessageSelectMenu()
                  .setCustomId("helpmenuu")
                  .setPlaceholder("Select a category")
                  .setDisabled(state)
                  .addOptions(
                      {label: "🛠️Setup commands", value: "setup", description: "Customize how the bot works (recomended)"},
                      {label: "👮Moderation commands", value: "moderation", description: "Only for mods"},
                      {label: "💻Utility commands", value: "utility", description: "Commands that make your life easier."},
                      {label: "📁User support commands", value: "support", description: "Need help?"},
                      {label: "🎉Fun commands", value: "fun", description: "Some fun commands, you can earn money with some of them!"},
                      {label: ":coin:Economy commands", value: "economy", description: "Commands for the economy section"},
                      {label: "🎵Music commands", value: "music", description: "Wanna listen to music or podcasts"},
                      {label: "😂Meme commands", value: "meme", description: "Meme commands, reddit commands, and image commands, it has it all!"}
                  )
              )
                  ]
          const initialMessage = await message.channel.send({
              embeds: [embed],
              components: components(false),
          });
          const filter = (interaction) => interaction.user.id === message.author.id;

          const collector = message.channel.createMessageComponentCollector({
              filter,
              componentType: "SELECT_MENU",
                       })
          collector.on("collect", (interaction) => {
              const name = interaction.values
            const setup = new MessageEmbed()
            .setColor('#7c7c7c')
            .setTitle('🛠️Setup commands')
            .setDescription("Customize how the bot works (recomended)")
                      .addFields(
                {name: `**${p}setprefix <new prefix>**`, value: 'Set the prefix for the guild youre in.'},
                {name: `**${p}swc <channel>**`, value: 'Set the welcomechannel for the guild.'},
                {name: `**${p}-sbc <channel> **`, value: 'Set the leaveschannel for the guild. (It can be the same as welcome)'},
                {name: `**${p}sl <channel>**`, value: 'Set the logs channel for the guild (It logs all commands there by Barnibot)'},
                {name: `**${p}swm <message>**`, value: 'Set the welcome message if you want to'},
                {name: `**${p}swr <role>**`, value: 'If someone joins your server they will get this role immediately.'},
                {name: `${p}setstaff`, value: 'Set the staff role (for: **-staff**) command.'},
                {name: `${p}info`, value: 'Shows your current settings with the server.'}
                                          )
                                          const moderation = new MessageEmbed()
                                          .setColor('#f4602e')
                                          .setTitle('👮Moderation commands')
                                          
                                                    .addFields(
                                              {name: `**${p}snap <amount of messages you wanna snap>**`, value: 'Snap messages out of existence.'},
                                              {name: `**${p}unmute <@person>**`, value: 'Unmute someone, if you made timed unmute no need to.'},
                                              {name: `**${p}adminscan <@person> **`, value: 'Scan if someone has admin or not.'},
                                              {name: `**${p}warn <@person>**`, value: 'Warns someone 3 warns is max but you can change if you want.'},
                                              {name: `**${p}warnings <@person>**`, value: 'See how many warnings a person has.'},
                                              {name: `**${p}delwarn <@person>**`, value: 'Clear someone of all his warns.'},
                                              {name: `**${p}pban <@person>**`, value: 'Permanently ban someone from the server (DO NOT DELETE THE MESSAGE IT SENDS!)'},
                                                    {name: `**${p}claim**`, value: 'Claims a ticket, use this only when someone opens a ticket and you can claim it **<valid>**.'},
                                              {name: `**${p}cembed <Title(one word)> <color in caps> <body>**`, value: 'Create a custom embed.'},
                                              {name: `**${p}warnings <@person>**`, value: 'See warnings of a person.'},
                                          {name: `${p}userinfo <@user>`, value: 'See some helpfull stuff about tagges user.'},
                                          {name: `**${p}ban**`, value: 'Thanos snap people out of the server.'},
                                          {name: `**${p}kick**`, value: 'Kick people outta here, really fun.'},
                                          {name: `**${p}mute <@person> <amount of time>**`, value: 'Mute someone, you dont have to specify the "<amount of time>'},
                                          {name: `**${p}react**`, value: 'Make reaction roles.' },
                                          {name: `**${p}role <@person> <role> **`, value: 'Give someone the role you wish with a simple command.'},
                                          {name: `**${p}delwarn <@person>**`, value: 'Delete all warning of a person.'},
                                          {name: `**${p}warn <@person> <reason (optional)>**`, value: 'Warn a person'},
                                          {name: `${p}verify <@person>`, value: 'If someone is acting sus, or you just want to verify him, use this command on him.'},
                                          {name: `${p}banlist`, value: 'Shows a list of banned ppl.'}
                                                    )
                                                    const utility = new MessageEmbed()
                                                    .setColor('#2ea9f4')
                                                    .setTitle('💻Utility commands')
                                                              .addFields(
                                                    {name: `**${p}covid <country>**`, value: 'Displays stats for given country, do **-covid all** to see world stats.'},
                                                    {name: `**${p}image <image u want to search> **`, value: 'Search a given image on the internet.'},
                                                    {name: `**${p}minecraft <server ip> <port, baisc is 25565>**`, value: 'See the givven servers status and info about it.'},
                                                    {name: `**${p}message <@person> <text>**`, value: 'Make the bot impersonate someone.'},
                                                    {name: `**${p}ping**`, value: 'See the ping of the server.'},
                                                    {name: `**${p}profile <@person>**`, value: 'Get profilepic of given person.'},
                                                    {name: `**${p}remind <time> <optional text>**`, value: 'Set a reminder for yourself.'},
                                                    {name: `**${p}sf <time> <message>**`, value: 'Sends a message that deletes itslef after a certain amount of time and has no trace of it left.'},
                                                    {name: `${p}weather <country>`, value: 'See what da weather is like in a country.'},
                                                    {name: `${p}afk <reason (optional)>`, value: 'Be afk, if someone tags you the bot tells em ur afk, just send a message to remove being afk.'},
                                                    {name: `${p}search <what u wanna search>`, value: "Searches the urban dicitonary."}
                                                          
                                                    )
                                                    const support = new MessageEmbed()
                                                    .setColor('f9c956')
                                                    .setTitle('📁User support commands')
                                                              .addFields(
{name: `**${p}dm <@person> <message>**`, value: 'Dm someone from the group.'},
{name: `**${p}suggest <suggestion>**`, value: 'Make a suggestion.'},
{name: `**${p}staff**`, value: 'Tag staff if you need help.'},
{name: `**${p}ticket**`, value: 'Make a ticket if you really need help.'},
{name: `${p}poll <poll tittle>`, value: "<emoji> = <anything>\n you can do this howver many times you want to example:\n-poll Am I smart?\n✅ = Yes\n❌ = No", inline: true},
{name: `${p}roleinfo <role name>`, value: 'Shows everything you need to know about a role.'},
{name: `${p}botinfo`, value: 'Shows stats about the bot.'},
{name: `${p}serverinfo`, value: 'Shows info bout da server youre in.'},
{name: `${p}userinfo <@person>`, value: 'Shows stuff about the tagged user.'},
{name: `${p}pastebin <what u wanna paste>`, value: 'Create a link where the message is pasted.'},
{name: `${p}qrcode <what you wanna make into a qrcode>`, value: 'Make a qrcode'}

                                                          
                                                    )
                                                    const fun = new MessageEmbed()
                                                    .setColor('#b656f9')
                                                    .setTitle('🎉Fun commands')
                                                              .addFields(
{name: `**${p}joke**`, value: 'Displays random joke.'},
{name: `**${p}8ball <question>**`, value: 'Ask a question from the allmighty 8ball. '},
{name: `**${p}joe**`, value: 'Wonder what this command does.'},
{name: `**${p}ascii <text>**`, value: 'Turns text into bigger text.'},
{name: `**${p}bagel**`, value: 'Get a bagel.'},
{name: `${p}cute`, value: 'Shows cute pictures (not about ur gf)'},
{name: `${p}cat`, value: 'Pictures of cats'},
{name: `${p}dogs`, value: 'Pictures about dogs'},
{name: `${p}horse`, value: 'Pictures about horses'},
{name: `${p}food`, value: 'Very tasty food'},
{name: `${p}earthporn`, value: 'Extremely beautyfull pictures of nature.'},
{name: `${p}flip <message>`, value: 'Make the given message upside down.'},
{name: `${p}tictactoe <@person>`, value: 'Ordinary tic-tac-toe, might need to get used to the emojis.'},
{name: `${p}snake`, value: 'Play the 50 year old game: snake.'},
{name: `${p}guess <number between 1 and 100>`, value: 'Try to guess the number the bot is thinking about, you only got 1 chance! (per command)'},
{name: `${p}roll`, value: 'Roll with a dice.'},
{name: `${p}blackjack <amount>`, value: 'Play blackjack'},
{name: `${p}wouldyourather (wyr)`, value: 'Sends a would you rather question.'},
{name: `${p}oneliner`, value: 'Sends a oneliner.'}
)
const economy = new MessageEmbed()
                                                    .setColor('#ffe807')
                                                    .setTitle('💰Economy commands')
                                                              .addFields(
                                                                {name: `**${p}bal <@person>**`, value: 'Displays the tagged persons balance, if you dont tag anyone its your balance.'},
                                                                {name: `**${p}beg**`, value: 'Beg for moniy'},
                                                                {name: `**${p}dep**`, value: 'Put moniy into da bank'},
                                                                {name: `**${p}wit**`, value: 'Put moniy into ya pocket'},
                                                                {name: `**${p}rob <@person>**`, value: 'Rob someone.'},
                                                                {name: `**${p}daily**`, value: 'Claim youre daily reward.'},
                                                                {name: `**${p}shop**`, value: 'See what is in the shop, check it every day because there are limited items!'},
                                                                {name: `**${p}buy <item> <amount>**`, value: 'Buy an item from the shop.'},
                                                                {name: `**${p}use <item>** if tomato:**-use tomato <@person> <amount>**`, value: 'Use items that are in your invetnory.'},
                                                                {name: `**${p}work**`, value: 'Not tottaly finsihed command, report any bugs.'},
                                                                {name : `**${p}bet <amont>**`, value: 'Bet on moniy and maybe win'},
                                                                {name: `${p}battle <@person>`, value: 'Battle someone and if you win, you even get **5000** moniy'},
                                                                {name: `${p}pay <@person> <amount or all>`, value: 'Pay someone moniy.'},
                                                                {name:  `${p}loan <amount> or <pay>`, value: 'Loan moniy from the bank, use **-loan pay** if you want to pay your loan.'},
                                                                {name: `${p}house <\`list\` or \`buy\` or \`sell>\``, value: `You can have houses, thanks to that, you can work and loan, also you can do \`-house\` to see what house you have.`},
                                                                {name: `${p}crypto <cryptocurrency name>`, value: 'See how the market is going on the currency you wanna see.'},
                                                                {name: `${p}invest <cryptocurrency name> <amount of money>`, value: 'Invest in any crypto with BarniBot money!'},
                                                                {name: `${p}convert <crypto name> <amount of crypto>`, value: 'Convert your crypto back to money.'}
                                                                
)
const music = new MessageEmbed()
                                                    .setColor('#7f6cfb')
                                                    .setTitle('🎵Music commands')
                                                  
                                                              .addFields(
                                                                {name: `${p}clip`, value: 'Plays a clip sound'},
                                                                {name: `${p}clips`, value: 'List all clips'},
                                                                {name: `${p}loop`, value: 'Loop a song'},
                                                                {name: `${p}lyrics`, value: 'Get lyrics for the currently playing song'},
                                                                {name: `${p}move `, value: 'Move songs around in the queue'},
                                                                {name: `${p}np`, value: 'Show now playing song'},
                                                                {name: `${p}pause`, value: 'Pause the currently playing music'},
                                                                {name: `${p}play`, value: 'Plays audio from YouTube or Soundcloud'},
                                                                {name: `${p}playlist`, value: 'Play a playlist from youtube'},
                                                                {name: `${p}pruning`, value: 'Toggle pruning of bot messages'},
                                                                {name: `${p}queue`, value: 'Show the music queue and now playing.'},
                                                                {name: `${p}remove`, value: 'Remove song from the queue'},
                                                                {name: `${p}resume `, value: 'Resume currently playing music'},
                                                                {name: `${p}search`, value: 'Search and select videos to play'},
                                                                {name: `${p}shuffle `, value: 'Shuffle queue'},
                                                                {name: `${p}skip `, value: 'Skip the currently playing song'},
                                                                {name: `${p}skipto `, value: 'Skip to the selected queue number'},
                                                                {name: `${p}stop `, value: 'Stops the music'},
                                                                {name: `${p}uptime `, value: 'Check the uptime'},
                                                                {name: `${p}volume `, value: 'Change volume of currently playing music'}
                                                                

)
const meme = new MessageEmbed()
                                                    .setColor('#7f6cfb')
                                                    .setTitle('😂Meme commands')
                                                              .addFields(
                                                                {name: `**${p}meme**`, value: 'Displays the latest meme from the subredits.'},
                                                                {name: `**${p}pp <@person>**`, value: 'Measures umbrella size of person (;.'},
                                                                {name: `**${p}rugay <@person>**`, value: 'See if a person is gay or how gay.'},
                                                                {name: `**${p}trigger <person>**`, value: 'Trigger someones pfp.'},
                                                                {name: `**${p}cmeme cmm <message>**`, value: 'Change my mind meme.'},
                {name: `**${p}cmeme opinion <message>**`, value: 'Every dad should respect their sons opinion ecetera... meme'},
                {name: `**${p}cmeme facepalm**`, value: 'Facepalm your own or someone elses face.'},
                {name: `**${p}cmeme ohno <message>**`, value: 'The ohno hes stupid meme.'},
                {name: `**${p}cmeme pride <@user>**`, value: 'Fuse a pride flag with someones pfp'},
            {name: `**${p}cmeme rip <@person>**`, value: 'Put someones pfp on a graveyard.'},
            {name: `**${p}cmeme trash <@person>**`, value: 'Is it the tagged person or is it trash?'},
            {name: `**${p}cmeme wanted <@person>**`, value: 'Make a wanted poster with the pfp of da tagged person.'},
            {name: `**${p}cmeme wasted <@person>**`, value: 'Put GTA wasted effect on someones pfp.'},
            {name: `**${p}cmeme sepia <@person>**`, value: 'Idk.'},
            {name: `${p}cmeme sh!t <@person>`, value: '"Eww I stepped in some sh!t" meme.'},
            {name: `**${p}cmeme slap <@person>**`, value: 'Slap someone.'},
            {name: `${p}cmeme spank <@person>`, value: 'Spank someone.'},
            {name: `${p}cmeme affect <imageURL`, value: 'The: No it doesnt affect my baby meme.'},
            {name: `${p}cmeme beautiful <imageURL>`, value: 'The: Gravity falls "its beautifulll meme. '},
            {name: `${p}cmeme bed <imageURL> <imageURL again>`, value: 'Mum theres a monster under my bed meme.'},
            {name: `${p}cmeme delete <imageURL>`, value: 'Are you sure you want to delete this (type: trash)'},
            {name: `${p}cmeme hitler <imageURL>`, value: 'Worse than hitler meme.'},
            {name: `${p}cmeme kiss <@person>`, value: 'Kiss someone'},
            {name: `${p}cmeme jail <imageURL>`, value: 'Hes in jail now.'}
)

if(name == "setup") interaction.update({ embeds: [setup] })
if(name == "moderation") interaction.update({ embeds: [moderation] })
if(name == "utility") interaction.update({ embeds: [utility] })
if(name == "support") interaction.update({ embeds: [support] })
if(name == "fun") interaction.update({ embeds: [fun] })
if(name == "economy") interaction.update({ embeds: [economy] })
if(name == "music") interaction.update({ embeds: [music] })
if(name == "meme") interaction.update({ embeds: [meme] })
          })
          collector.on("end", () =>{
              try{
              initialMessage.edit({components: components(true)})
              }catch(err){}
          })
    }
}