const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

let houses = [
    {house2: "shack", house: ":hut:shack", pay: 700, price: 2000, upper: ":hut:Shack"},
    {house2: "tent", house: "⛺tent", pay: 200, price: 1000, upper: "⛺Tent"},
    {house2: "flat", house: "🏬flat", pay: 1000, price: 4000, upper: "🏬Flat"},
    {house2: "house", house: "🏡house", pay: 2000, price: 10000, upper: "🏡House"},
    {house2: "modernhouse", house: "<:moderhouse:851898817447329803>modern house", pay: 2500, price: 20000, upper: "<:moderhouse:851898817447329803>Modern House"},
    {house2: "mansion", house: "🏰mansion", pay: 8000, price: 100000, upper: "🏰Mansion"},
    {house2: "minibus", house: "🚐minibus", pay: 1100, price: 5000, upper: "🚐Minibus"},
    {house2: "osaka", house: "🏯osaka", pay: 10000, price: 200000, upper: "🏯Osaka"},
    {house2: "island", house: "🏝️island", pay: 50000, price: 1000000, upper: "🏝️Island"},
  ]

module.exports = {
    sub: true,
    ...new SlashCommandBuilder()
    .setName("cmeme")
    .setDescription("Create a bunch of extremely humorous memes.")

    .addSubcommand((subcommand) =>
		subcommand
			.setName('cmm')
			.setDescription("The change my mind meme")
			.addStringOption((option) => option.setName('text').setDescription('Write the thing here.').setRequired(true).setMaxLength(30))
        )

	.addSubcommand(subcommand =>
		subcommand
			.setName('opinion')
			.setDescription('Express ur opinion ):')
            .addStringOption((option) => option.setName('text').setDescription('Ur opinion').setRequired(true).setMaxLength(30))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('ohno')
            .setDescription('...')
            .addStringOption((option) => option.setName('text').setDescription('Oh no!'))
        )
    .addSubcommand(subcommand =>
        subcommand
			.setName('facepalm')
			.setDescription('...')
            .addUserOption((option) => option.setName('user').setDescription('The person who will do a facepalm.'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('pride')
            .setDescription('Someone gon get accepted')
            .addUserOption((option) => option.setName('user').setDescription('The person who will be accepted.'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('rip')
            .setDescription('Mourn his grave')
            .addUserOption((option) => option.setName('user').setDescription('The person that is ded'))
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('trash')
            .setDescription('"Your trash kid"')
            .addUserOption((option) => option.setName('user').setDescription('The person who is allegedly trash.'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('wanted')
            .setDescription('Dis dude is wanted')
            .addUserOption((option) => option.setName('user').setDescription('The person who you puttin a bounty on.'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('wasted')
            .setDescription('Someone is wasted.')
            .addUserOption((option) => option.setName('user').setDescription('Who is absolutely frigin wasted?'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('sepia')
            .setDescription('No idea.')
            .addUserOption((option) => option.setName('user').setDescription('Yes'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('sht')
            .setDescription('Uh.')
            .addUserOption((option) => option.setName('user').setDescription('Not gonna say anything'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('slap')
            .setDescription('Slap someone.')
            .addUserOption((option) => option.setName('user').setDescription('Who u slappin?'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('spank')
            .setDescription('Spank someone.')
            .addUserOption((option) => option.setName('user').setDescription('Who u spankin?'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('affect')
            .setDescription('No it does not affect my baby...')
            .addUserOption((option) => option.setName('user').setDescription('Who is the sad person'))
        )      
    .addSubcommand(subcommand =>
        subcommand
			.setName('current')
			.setDescription('Shows you your current house')
        ),
    run: async (client, interaction, args) => {



    }
}