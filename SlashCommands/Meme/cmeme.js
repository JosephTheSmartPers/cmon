const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")
const canvacord = require('canvacord');


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

    .addSubcommand((subcommand) =>
		subcommand
			.setName('help')
			.setDescription("Someone explain this s#!t")
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
			.setDescription('...'),
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
            .addUserOption((option) => option.setName('user').setDescription('Who u slappin?').setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('spank')
            .setDescription('Spank someone.')
            .addUserOption((option) => option.setName('user').setDescription('Who u spankin?').setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('affect')
            .setDescription('No it does not affect my baby...')
            .addUserOption((option) => option.setName('user').setDescription('Who is the faliure?'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('bed')
            .setDescription('Theres a monster under my bed')
            .addUserOption((option) => option.setName('user').setDescription('Who might the monster be?').setRequired(true))
            .addUserOption((option) => option.setName('user2').setDescription('The not nice person'))
        )          
    .addSubcommand(subcommand =>
        subcommand
            .setName('delete')
            .setDescription('Delete someone')
            .addUserOption((option) => option.setName('user').setDescription('Who u wanna un-exist.'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('hitler')
            .setDescription('He is worse than hitler!')
            .addUserOption((option) => option.setName('user').setDescription('Who is this rude person?'))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('jail')
            .setDescription('He in jail now')
            .addUserOption((option) => option.setName('user').setDescription('Who u gon arrest?'))
        )  
    .addSubcommand(subcommand =>
        subcommand
            .setName('kiss')
            .setDescription('Kiss someone')
            .addUserOption((option) => option.setName('user2').setDescription('Who gon the kissed be').setRequired(true))
            .addUserOption((option) => option.setName('user').setDescription('Who gon the kisser be?'))
        )
          
    .addSubcommand(subcommand =>
        subcommand
			.setName('current')
			.setDescription('Shows you your current house')
        ),
    run: async (client, interaction, args) => {

        let format = args.getSubcommand()
        let user = interaction.user
        let target = args.getUser("user") || interaction.user
        let target2 = args.getUser("user2") || user

try{

    if(format == 'help' || !format){
            

        const page1 = new Discord.EmbedBuilder()
.setColor('#ff9a00')
.setTitle('😆Meme commands.')

.addFields(
{name: 'Here are da list of **cmeme** formats', value: 'Note that every one of these should start with **-cmeme**'},
{name: '**/cmeme cmm**', value: 'Change my mind meme.'},
{name: '**/cmeme opinion**', value: 'Every dad should respect their sons opinion ecetera... meme'},
{name: '**/cmeme facepalm**', value: 'Facepalm your own or someone elses face.'},
{name: '**/cmeme ohno**', value: 'The ohno hes stupid meme.'},
{name: '**/cmeme pride**', value: 'Fuse a pride flag with someones pfp'},
{name: '**/cmeme rip**', value: 'Put someones pfp on a graveyard.'},
{name: '**/cmeme trash**', value: 'Is it the tagged person or is it trash?'},
{name: '**/cmeme wanted**', value: 'Make a wanted poster with the pfp of da tagged person.'},
{name: '**/cmeme wasted**', value: 'Put GTA wasted effect on someones pfp.'},
{name: '**/cmeme sepia**', value: 'Idk.'},
{name: '**/cmeme sh!t**', value: '"Eww I stepped in some sh!t" meme.'},
{name: '**/cmeme slap**', value: 'Slap someone.'},
{name: '**/cmeme spank**', value: 'Spank someone.'},
{name: '**/cmeme affect**', value: 'The: No it doesnt affect my baby meme.'},
{name: '**/cmeme beautiful**', value: 'The: Gravity falls "its beautifulll meme. '},
{name: '**/cmeme bed**', value: 'Mum theres a monster under my bed meme.'},
{name: '**/cmeme delete**', value: 'Are you sure you want to delete this (type: trash)'},
{name: '**/cmeme hitler**', value: 'Worse than hitler meme.'},
{name: '**/cmeme kiss**', value: 'Kiss someone'},
{name: '**/cmeme jail**', value: 'Hes in jail now.'}
)





interaction.reply({embeds: [page1]})

}
        if(format == 'cmm'){
            let text = args.getString("text")
    
            let image = await canvacord.Canvas.changemymind(text);
    
            let changeMyMind = new Discord.AttachmentBuilder(image, "cmm.png")
    
            interaction.reply({files: [changeMyMind]});
    }
    
        if(format == 'opinion'){
            const msg = args.getString("text")
            const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
            
            const image = await canvacord.Canvas.opinion(avatar, msg);
    
            const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
            interaction.reply({files: [icong]});
    }
        if(format == 'facepalm'){

        const image = user.displayAvatarURL({ dynamic: false, format: 'png' });
        const sendimage = await canvacord.Canvas.facepalm(image);
        
        const icong = new Discord.AttachmentBuilder(sendimage, "facepalm.png")
        interaction.reply({files: [icong]})
    
    }
        if(format == 'ohno'){
            const msg = args.getString("text")
                   
            const image = await canvacord.Canvas.ohno(msg);
    
            const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
            interaction.reply({files: [icong]});
    
    }
        if(format == 'pride'){
            
            const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
                    
            const image = await canvacord.Canvas.rainbow(targetpfp);
    
            const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
            interaction.reply({files: [icong]});
    }
    if(format == 'rip'){  
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.rip(targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    if(format == 'trash'){
            
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.trash(targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    if(format == 'wanted'){
            
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.wanted(targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    if(format == 'wasted'){
            
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.wasted(targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    if(format == 'sepia'){
            
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.sepia(targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    if(format == 'sht'){
            
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
    
        
                
        const image = await canvacord.Canvas.shit(targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    if(format == 'slap'){
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
    
        const image23 = user.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.slap(image23, targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    if(format == 'spank'){
            
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
    
        const image23 = user.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.spank(image23, targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    if(format === 'affect'){
        const image = target.displayAvatarURL({ dynamic: false, format: 'png' }) 
                
        const atachement = await canvacord.Canvas.affect(image);
    
        const senda = new Discord.AttachmentBuilder(atachement, "opinion.png")
    
        interaction.reply({files: [senda]});
                 
    }
    if(format === 'beautiful'){
        const image = target.displayAvatarURL({ dynamic: false, format: 'png' }) 
                
        const atachement = await canvacord.Canvas.beautiful(image);
    
        const senda = new Discord.AttachmentBuilder(atachement, "opinion.png")
    
        interaction.reply({files: [senda]});
                 
    }
    if(format === 'bed'){
        const image = target.displayAvatarURL({ dynamic: false, format: 'png' }) 
    
        const image2 = (target2.displayAvatarURL({ dynamic: false, format: 'png' })) 
        const atachement = await canvacord.Canvas.bed(image, image2);
        const senda = new Discord.AttachmentBuilder(atachement, "opinion.png")
    
        interaction.reply({files: [senda]});
                 
    }
    if(format === 'delete'){
        const image = target.displayAvatarURL({ dynamic: false, format: 'png' })
                
        const atachement = await canvacord.Canvas.delete(image);
    
        const senda = new Discord.AttachmentBuilder(atachement, "opinion.png")
    
        interaction.reply({files: [senda]});
                 
    }
    if(format === 'hitler'){
        const image = target.displayAvatarURL({ dynamic: false, format: 'png' }) 
        const atachement = await canvacord.Canvas.hitler(image);
    
        const senda = new Discord.AttachmentBuilder(atachement, "opinion.png")
    
        interaction.reply({files: [senda]});
                 
    }
    if(format === 'jail'){
        const image = target.displayAvatarURL({ dynamic: false, format: 'png' }) 
                
        const atachement = await canvacord.Canvas.jail(image);
    
        const senda = new Discord.AttachmentBuilder(atachement, "opinion.png")
    
        interaction.reply({files: [senda]});
                 
    }
    if(format == 'kiss'){
    
        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
    
        const image23 = target2.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.kiss(image23, targetpfp);
    
        const icong = new Discord.AttachmentBuilder(image, "opinion.png")
    
        interaction.reply({files: [icong]});
    }
    }catch(err){console.log(err) 
        interaction.reply("I'm pretty sure you messed something up with this command...")}

    }
}