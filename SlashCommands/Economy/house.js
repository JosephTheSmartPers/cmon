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
    .setName("house")
    .setDescription("See, manage, buy, or sell houses")

    			.addSubcommand((subcommand) =>
				subcommand
					.setName('buy')
					.setDescription("Buy a house!")
					.addStringOption((option) =>
						option
							.setName('house')
							.setDescription('What house would you like to buy?')
							.addChoices(
                                { name: '🏚️shack', value: 'shack' },
                                { name: '⛺tent', value: 'tent' },
                                { name: '🏬flat', value: 'flat' },
                                { name: '🏡house', value: 'house' },
                                { name: '🏢modern house', value: 'modernhouse'},
                                { name: '🏰mansion', value: 'mansion' },
                                { name: '🚐minibus', value: 'minibus' },
                                { name: '🏯osaka', value: 'osaka' },
                                { name: '🏝️island' , value: 'island' }
                    )
                    .setRequired(true),
                    )
            )

	.addSubcommand(subcommand =>
		subcommand
			.setName('sell')
			.setDescription('Sell your current house'))

    .addSubcommand(subcommand =>
        subcommand
			.setName('list')
			.setDescription('Lists all the houses'))

    .addSubcommand(subcommand =>
        subcommand
			.setName('current')
			.setDescription('Shows you your current house')),
    run: async (client, interaction, args) => {

        const targetData = await profileModel.findOne({ userID: interaction.user.id});
        const house = interaction.options.getString("house")
        const thouse = targetData.house

        // Some random ass fucntion I really don't know why tf I did this but it must have felt clean or somehitng.
        async function embeder(house2, house, pay, price){
            if(targetData.moniy < price) return interaction.reply(`You dont have enough moniy to buy a ${house} (its ${price} moniy):x:`)
            houseobj = {
              house: house2,
              pay: pay,
              price: price,
                  }
            await profileModel.findOneAndUpdate({userID: interaction.user.id,}, 
              {$set: {house: houseobj,},
            }); 
            
                        await profileModel.findOneAndUpdate({
                          userID: interaction.user.id,},{$set: { moniy: targetData.moniy - price, }});
                        const embed = new EmbedBuilder()
                            .setTitle(`You bought a ${house2}!`)
                            .setDescription(`You bought a nice little ${house}, now you can finnaly work!\nYour sallary is ${pay} moniy`)
                            .setColor("Green")
                        interaction.reply({embeds: [embed]})
        }

        //Handling all the dumb subcommands


        // In case of BUYING
        if(interaction.options.getSubcommand() == "buy"){

            if(thouse.house && thouse.house != "none")return interaction.reply("You already have house, do `/house sell` if you wan't to sell it, than buy a new one!")
            houses.forEach(x=>{
                if(x.house2 == house) embeder(x.house2, x.house, x.pay, x.price)
                return
              })
            if(houses.filter(x=> x.house2 === house) == "") return interaction.reply(`There is no such house as \`${house}\` do \`-house list\``)

        }
        // In case of SELLING
        if(interaction.options.getSubcommand() == "sell"){

        if(!thouse) return interaction.reply('You dont have a house.:x:')

        const dhouse = thouse.house

        if(dhouse == 'none') return interaction.reply('You dont have a house.:x:')

        let sellingPrice = 0
        let housen = ""

        //Selling the god damn thing
        houses.forEach(h=>{
            if(dhouse == h.house2){
                sellingPrice = h.price * 0.7
                housen = h.upper
            }})
            houseobj = {
                house: 'none',
                pay: 0,
            }

        await profileModel.findOneAndUpdate({userID: interaction.user.id,}, 
            {$set: {house: houseobj,},
        }); 
        await profileModel.findOneAndUpdate({
            userID: interaction.user.id,},{$inc: { moniy: sellingPrice, }});

        const etfembed = new EmbedBuilder() 
            .setTitle('You sold your house.')   
            .setDescription(`You sold your ${housen} for ${sellingPrice}💵.`)
            .setColor("Green")
        interaction.reply({embeds: [etfembed]})
        }
    


    if(interaction.options.getSubcommand() == "list"){

        const seembed = new EmbedBuilder()
            .setTitle('All the houses you can buy.')
            .setDescription('If you buy a house you can use the **-work** command the better the house the better the sallary!')
            .setColor("Green")
            .addFields(houses.map(h=>{
            return{
                name: `${h.upper}`,
                value: `**Price:** ${h.price} moniy\n**Sallary:** ${h.pay} moniy`,
                inline: true,
            }}))
        interaction.reply({embeds: [seembed]})
        }
    
    if(interaction.options.getSubcommand() == "current"){
        let housename = ""
        let sallary = 0
        if(!thouse || thouse.house == "none") return interaction.reply('You dont have a house.:x:')
    const dhouse = thouse.house
    houses.forEach(h=>{
      if(dhouse == h.house2){
        housename = h.upper
        sallary = h.pay
      }
    })
    const etfembed = new EmbedBuilder() 
    .setTitle('This is your house.')   
    .setDescription(`You have a ${housename}, your sallary is ${sallary.toString()}$.`)
    .setColor("Green")
    interaction.reply({embeds: [etfembed]})
    }

	}
}

