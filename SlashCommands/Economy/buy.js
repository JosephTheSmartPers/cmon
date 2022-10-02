const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const profileModel = require("../../models/profileSchema");

let items = [
    {name: "drugs", price: 20, emojiName: "drugs💉", description: "(Use them to die!)"},
    {name: "guitar", price: 1000, emojiName: "guitars🎸", description: "(Play with them on the street!)"},
    {name: "broom", price: 40, emojiName: "brooms🧹", description: "(Whipe some dust!)"},
    {name: "tomato", price: 2, emojiName: " tomatoes🍅", description: "(Throw them at someone!)"},
    {name: "handgun", price: 2000, emojiName: "handguns🔫", description: "(This will protect you from robbers!)"},
    {name: "card", price: 2000, emojiName: "cards💳", description: "(Buy stuff without withdrawing!)"},
    {name: "typewriter", price: 5000, emojiName: "⌨️typewriter", description: "(Write articles with it!)"},
]

module.exports = {
    ...new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Buy an item from the shop.")
    .addStringOption(option => option.setName('item').setDescription("Select the item you wan't to buy.").setRequired(true).addChoices(
        { name: 'drugs💉', value: 'drugs' },
        { name: 'guitars🎸', value: 'guitar' },
        { name: 'brooms🧹' , value: 'broom' },
        { name: ' tomatoes🍅', value: 'tomato' },
        { name: 'handguns🔫', value: 'handgun' },
        { name: 'cards💳', value: 'card' },
        { name: '⌨️typewriter', value: 'typewriter' }
    )).addNumberOption(option => option.setName('amount').setDescription("How many of the item? (Blank for one)").setMinValue(1)),

    run: async (client, interaction, args) => {

        let item = interaction.options.getString("item")
        let number = interaction.options.getNumber("amount") || 1
        let moniyType = "moniy"

        let user = interaction.user
        const userData = await profileModel.findOne({ userID: user.id});

        async function buy(person, money, path){
            
            await profileModel.findOneAndUpdate({
                userID: person
                }, {
                    $inc: {
                [path]: money,
                    },
            });
        }

        async function buytem(person, itemAmount, price, path){
            let inv = userData.inv
            let current = parseInt(inv[path]) || 0
            inv[path] = current + itemAmount

            buy(person, -price, moniyType)
            await profileModel.findOneAndUpdate({
                userID: person
                }, {
                    $set: {
                inv: inv,
                    },
            });
        } 
        
        async function buyer(item, emojiItem, price, description){

            const amount = number * price
            if(userData[moniyType] < amount) return interaction.reply('you too poor LMAO💸.')
            try{
                buytem(user.id, number, amount, item)
            }catch(err){ console.log(err) }

            const drugEmbed = new EmbedBuilder()
                .setColor('Green')
                .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                .setTitle(`Succesfully bought some (${number}) ${emojiItem} for ${amount} moniy!`)
                .setDescription(`${description}`)
            return interaction.reply({embeds: [drugEmbed]});
        }

        items.forEach(i=>{
            if(i.name == item){
                if(args[1]){
                    number = parseInt(args[1])
                    if(number % 1 !=0 || number <= 0) return interaction.reply('you cant buy an item for a number like dis!:x:');
                }
                
                if(userData.inv.card > 0 && (number * i.price) > userData.moniy) moniyType = "banker"
                return buyer(i.name, i.emojiName, i.price, i.description)
            }
        })

	}
}

