    const Discord = require('discord.js')
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: 'buy',
    aliases: [],
    cooldown: 0,
    permissions: [],
    description: 'Buy an item',
    usage: "buy <item> <amount>",
    async execute(message, args, cmd, client, discord, profileData){
        const userData = await profileModel.findOne({ userID: message.author.id});
        async function buy(person, money, path){
            
            await profileModel.findOneAndUpdate({
                userID: person
                }, {
                    $inc: {
                [path]: money,
                    },
            }
            );
        }
        async function buytem(person, itemAmount, price, path){
            let inv = userData.inv
            let current = parseInt(inv[path])
            inv[path] = current + itemAmount

            buy(person, -price, moniyType)
            await profileModel.findOneAndUpdate({
                userID: person
                }, {
                    $set: {
                inv: inv,
                    },
            }
            );
        }
        async function buyer(item, emojiItem, price, description){

            const amount = number * price
            if(userData[moniyType] < amount) return message.reply('you too poor LMAO💸.')
            try{
                buytem(message.author.id, number, amount, item)
            }catch(err){console.log(err)}

            const drugEmbed = new Discord.EmbedBuilder()
            .setColor('Green')
            .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setTitle(`Succesfully bought some (${number}) ${emojiItem} for ${amount} moniy!`)
            .setDescription(`${description}`)
            return message.channel.send({embeds: [drugEmbed]});
        }

        let items = [
            {name: "drugs", price: 20, emojiName: "drugs💉", description: "(Use them to die!)"},
            {name: "guitar", price: 1000, emojiName: "guitars🎸", description: "(Play with them on the street!)"},
            {name: "broom", price: 40, emojiName: "brooms🧹", description: "(Whipe some dust!)"},
            {name: "tomato", price: 2, emojiName: " tomatoes🍅", description: "(Throw them at someone!)"},
            {name: "handgun", price: 2000, emojiName: "handguns🔫", description: "(This will protect you from robbers!)"},
            {name: "card", price: 2000, emojiName: "cards💳", description: "(Buy stuff without withdrawing!)"},
            {name: "typewriter", price: 5000, emojiName: "⌨️typewriter", description: "(Write articles with it!)"},
        ] 
        
                if(!args.length) return message.channel.send('You need to input an item after the command "buy🛒');
       const item = args[0];
        let number = 1
        let moniyType = "moniy"
        items.forEach(i=>{
            if(i.name == item){
                if(args[1]){
                    number = parseInt(args[1])
                    if(number % 1 !=0 || number <= 0) return message.reply('you cant buy an item for a number like dis!:x:');
                }
                
                if(userData.inv.card > 0 && (number * i.price) > userData.moniy) moniyType = "banker"
                return buyer(i.name, i.emojiName, i.price, i.description)
            }
        })
        
        if(items.filter(i=>i.name == item) == ""){
    const fraudEmbed = new Discord.EmbedBuilder()
    .setColor('#e10000')
    .setTitle('Error!')
    .setTitle('Incorrect item name:x:!')
    .setDescription("Do `-shop` for a list of items you can buy")
       message.channel.send({embeds: [fraudEmbed]}) 
        }
    },
};