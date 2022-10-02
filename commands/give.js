const Discord = require('discord.js')

const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'give',
    aliases: ["add"],
    cooldown: 0,
    permissions: [],
    description: 'Give someone money, (it doesnt remove yours).',
    async execute(message, args, cmd, client, discord, profileData){

 //if(!message.authorsfsaasf) return message.channel.send('This command is currently disabled due to abusing of it.')
            
        
        if(message.author.id == '483519738727759873'){ 
                if(!args.length) return message.channel.send('You need to mention someone to give moniy to!');
       const amount = args[1];
       const target = message.mentions.users.first();
       if(!target) return message.reply('Dis dude is not even real.');
        if(amount % 1 !=0 || amount <= 0) return message.reply('you cant give someone a number like this!');
        try{
            const targetData = await profileModel.findOne({ userID: target.id});
            if(!targetData) return message.reply('This dude doesnt have an acount in da database yet!');
            await profileModel.findOneAndUpdate({

            userID: target.id
            }, {
                $inc: {
            moniy: amount,
                },
        }
        );
        const giveEmbed = new Discord.MessageEmbed()
        .setColor('#fff85f')
        .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
        .setTitle(`Succesfully given ${amount} moniy! to ${target.tag}`)
         .setFooter(`Thank ${message.author.tag} btw.`)
        return message.channel.send({embeds: [giveEmbed]});
        }catch(err){
            console.log(err)
      
        }
        
    }
    else if(message.author.id =='621884868845895694'){
    if(!args.length) return message.channel.send('You need to mention someone to give moniy to!');
    const amount = args[1];
    const target = message.mentions.users.first();
    if(!target) return message.reply('Dis dude is not even real.');
     if(amount % 1 !=0 || amount <= 0) return message.reply('you cant give someone a number like this!');
     try{
         const targetData = await profileModel.findOne({ userID: target.id});
         if(!targetData) return message.reply('This dude doesnt have an acount in da database yet!');
         await profileModel.findOneAndUpdate({

         userID: target.id
         }, {
             $inc: {
         moniy: amount,
             },
     }
     );
     const giveEmbed = new Discord.MessageEmbed()
     .setColor('#fff85f')
     .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
     .setTitle(`Succesfully given ${amount} moniy! to ${target.tag}`)
      .setFooter(`Thank ${message.author.tag} btw.`)
     return message.channel.send({embeds: [giveEmbed]});
     }catch(err){
         console.log(err)
   
     }
    }
    else if(message.author.id =='826753607427817483'){
        if(!args.length) return message.channel.send('You need to mention someone to give moniy to!');
        const amount = args[1];
        const target = message.mentions.users.first();
        if(!target) return message.reply('Dis dude is not even real.');
         if(amount % 1 !=0 || amount <= 0) return message.reply('you cant give someone a number like this!');
         try{
             const targetData = await profileModel.findOne({ userID: target.id});
             if(!targetData) return message.reply('This dude doesnt have an acount in da database yet!');
             await profileModel.findOneAndUpdate({
    
             userID: target.id
             }, {
                 $inc: {
             moniy: amount,
                 },
         }
         );
         const giveEmbed = new Discord.MessageEmbed()
         .setColor('#fff85f')
         .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
         .setTitle(`Succesfully given ${amount} moniy! to ${target.tag}`)
          .setFooter(`Thank ${message.author.tag} btw.`)
         return message.channel.send({embeds: [giveEmbed]});
         }catch(err){
             console.log(err)
       
         }
        }
        else{
            const fraudEmbed = new Discord.MessageEmbed()
            .setColor('#e10000')
            .setTitle('Error!')
            .addFields(
                 {name: 'Barnibot entered an error trying to execute this command', value: 'You are a fraud, you are not god(with small g) AKA: Car or Bright, or you are not God(big G) AKA:  (@Barni, ) so this command is not for you!'}
            )
            .setFooter('🛑')
            message.channel.send({embeds: [fraudEmbed]}) 
        }
    },
};