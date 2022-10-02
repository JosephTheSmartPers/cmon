const canvacord = require('canvacord');
const Discord = require('discord.js');
const { changemymind } = require('canvacord');
const paginationEmbed = require('discord.js-pagination');

module.exports = {
    name: "cmeme",
    description: "Create a meme",
    aliases: ["cmem", "creatememe"],
    cooldown: 0,
    permissions: [],
    usage: "cmeme help",


    async execute(message,args, cmd, client, Discord, profileData) {
try{
        const target = message.mentions.users.first();
        const format = args[0]
        message.delete();

       
        if(format == 'help' || !format){
            

                            const page1 = new Discord.MessageEmbed()
                .setColor('#ff9a00')
                .setTitle('😆Meme commands.')
            
                .addFields(
                    {name: 'Here are da list of **cmeme** formats', value: 'Note that every one of these should start with **-cmeme**'},
                    {name: '**-cmeme cmm <message>**', value: 'Change my mind meme.'},
                    {name: '**-cmeme opinion <message>**', value: 'Every dad should respect their sons opinion ecetera... meme'},
                    {name: '**-cmeme facepalm**', value: 'Facepalm your own or someone elses face.'},
                    {name: '**-cmeme ohno <message>**', value: 'The ohno hes stupid meme.'},
                    {name: '**-cmeme pride <@user>**', value: 'Fuse a pride flag with someones pfp'},
                {name: '**-cmeme rip <@person>**', value: 'Put someones pfp on a graveyard.'},
                {name: '**-cmeme trash <@person>**', value: 'Is it the tagged person or is it trash?'},
                {name: '**-cmeme wanted <@person>**', value: 'Make a wanted poster with the pfp of da tagged person.'},
                {name: '**-cmeme wasted <@person>**', value: 'Put GTA wasted effect on someones pfp.'},
                {name: '**-cmeme sepia <@person>**', value: 'Idk.'},
                {name: '-cmeme sh!t <@person>', value: '"Eww I stepped in some sh!t" meme.'},
                {name: '**-cmeme slap <@person>**', value: 'Slap someone.'},
                {name: '-cmeme spank <@person>', value: 'Spank someone.'},
                {name: '-cmeme affect <imageURL>', value: 'The: No it doesnt affect my baby meme.'},
                {name: '-cmeme beautiful <imageURL>', value: 'The: Gravity falls "its beautifulll meme. '},
                {name: '-cmeme bed <imageURL> <imageURL again>', value: 'Mum theres a monster under my bed meme.'},
                {name: '-cmeme delete <imageURL>', value: 'Are you sure you want to delete this (type: trash)'},
                {name: '-cmeme hitler <imageURL>', value: 'Worse than hitler meme.'},
                {name: '-cmeme kiss <@person>', value: 'Kiss someone'},
                {name: '-cmeme jail <imageURL>', value: 'Hes in jail now.'}
                )
               

       

                
    message.channel.send({embeds: [page1]})
    
}

    if(format == 'cmm'){
        if(!args[1]) return message.channel.send('You need to put a message after **cmm**')
        let text = args.slice(1).join(" ");

        let image = await canvacord.Canvas.changemymind(text);

        let changeMyMind = new Discord.MessageAttachment(image, "cmm.png")

        message.channel.send({files: [changeMyMind]});
}

    if(format == 'opinion'){
        if(!args[1]) return message.reply('Put an opinion m8.')
        const msg = args.slice(1).join(" ");
        const avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        
        const image = await canvacord.Canvas.opinion(avatar, msg);

        const icong = new Discord.MessageAttachment(image, "opinion.png")

        message.channel.send({files: [icong]});
}
    if(format == 'facepalm'){

const image = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
const sendimage = await canvacord.Canvas.facepalm(image);

const icong = new Discord.MessageAttachment(sendimage, "facepalm.png")
message.channel.send({files: [icong]})

}
    if(format == 'ohno'){
        if(!args[1]) return message.reply('Put a message m8.')
        const msg = args.slice(1).join(" ");
               
        const image = await canvacord.Canvas.ohno(msg);

        const icong = new Discord.MessageAttachment(image, "opinion.png")

        message.channel.send({files: [icong]});

}
    if(format == 'pride'){
        
        if(!target) return message.reply('Put a target in m8.')

        const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
                
        const image = await canvacord.Canvas.rainbow(targetpfp);

        const icong = new Discord.MessageAttachment(image, "opinion.png")

        message.channel.send({files: [icong]});
}
if(format == 'rip'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
            
    const image = await canvacord.Canvas.rip(targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
if(format == 'trash'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
            
    const image = await canvacord.Canvas.trash(targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
if(format == 'wanted'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
            
    const image = await canvacord.Canvas.wanted(targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
if(format == 'wasted'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
            
    const image = await canvacord.Canvas.wasted(targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
if(format == 'sepia'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });
            
    const image = await canvacord.Canvas.sepia(targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
if(format == 'sh!t'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });

    
            
    const image = await canvacord.Canvas.shit(targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
if(format == 'slap'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });

    const image23 = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            
    const image = await canvacord.Canvas.slap(image23, targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
if(format == 'spank'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });

    const image23 = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            
    const image = await canvacord.Canvas.spank(image23, targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
if(format === 'affect'){
    const image = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' }) || null
    if(image == null) return message.reply("You didn't tag anyone!")
            
    const atachement = await canvacord.Canvas.affect(image);

    const senda = new Discord.MessageAttachment(atachement, "opinion.png")

    message.channel.send({files: [senda]});
             
}
if(format === 'beautiful'){
    const image = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' }) || null
    if(image == null) return message.reply("You didn't tag anyone!")
            
    const atachement = await canvacord.Canvas.beautiful(image);

    const senda = new Discord.MessageAttachment(atachement, "opinion.png")

    message.channel.send({files: [senda]});
             
}
if(format === 'bed'){
    const image = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' }) || null
    if(image == null) return message.channel.send("You didn't tag anyone for the first argument!")

    const image2 = (message.mentions.users.at(1).displayAvatarURL({ dynamic: false, format: 'png' })) || null
    if(image2 == null) return message.channel.send("You didn't tag anyone for the second argument!")
    const atachement = await canvacord.Canvas.bed(image, image2);
    const senda = new Discord.MessageAttachment(atachement, "opinion.png")

    message.channel.send({files: [senda]});
             
}
if(format === 'delete'){
    const image = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' }) || null
    if(image == null) return message.reply("You didn't tag anyone!")
            
    const atachement = await canvacord.Canvas.delete(image);

    const senda = new Discord.MessageAttachment(atachement, "opinion.png")

    message.channel.send({files: [senda]});
             
}
if(format === 'hitler'){
    const image = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' }) || null
    if(image == null) return message.reply("You didn't tag anyone!")
    const atachement = await canvacord.Canvas.hitler(image);

    const senda = new Discord.MessageAttachment(atachement, "opinion.png")

    message.channel.send({files: [senda]});
             
}
if(format === 'jail'){
    const image = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' }) || null
    if(image == null) return message.reply("You didn't tag anyone!")
            
    const atachement = await canvacord.Canvas.jail(image);

    const senda = new Discord.MessageAttachment(atachement, "opinion.png")

    message.channel.send({files: [senda]});
             
}
if(format == 'kiss'){
        
    if(!target) return message.reply('Put a target in m8.')

    const targetpfp = target.displayAvatarURL({ dynamic: false, format: 'png' });

    const image23 = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            
    const image = await canvacord.Canvas.kiss(image23, targetpfp);

    const icong = new Discord.MessageAttachment(image, "opinion.png")

    message.channel.send({files: [icong]});
}
}catch(err){console.log(err) 
    message.channel.send("I'm pretty sure you messed something up with this command...")}
    }
}