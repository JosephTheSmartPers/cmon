const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, Embed } = require("discord.js")

const profileModel = require("../../models/profileSchema");

let vehicles = [
    {smallVeh: "bike", vehicle: "🚲bike", minutes: 90, price: 500, upper: "🚲Bike"},
    {smallVeh: "bus", vehicle: "🚌bus", minutes: 80, price: 600, upper: "🚌Bus"},
    {smallVeh: "car", vehicle: "🚗car", minutes: 70, price: 2000, upper: "🚗Car"},
    {smallVeh: "train", vehicle: "🚃Train", minutes: 60, price: 2500, upper: "🚃Train"},
    {smallVeh: "horse", vehicle: "🐎horse", minutes: 50, price: 5000, upper: "🐎Horse"},
    {smallVeh: "racecar", vehicle: "🏎️racecar", minutes: 40, price: 10000, upper: "🏎️Racecar"},
    {smallVeh: "speedboat", vehicle: "🚤speedboat", minutes: 30, price: 50000, upper: "🚤Speedboat"},
    {smallVeh: "plane", vehicle: "✈️plane", minutes: 20, price: 200000, upper: "✈️Plane"},
    {smallVeh: "rocket", vehicle: "🚀rocket", minutes: 15, price: 20000000, upper: "🚀Rocket"},
  ]

module.exports = {
    sub: true,
    ...new SlashCommandBuilder()
    .setName("vehicle")
    .setDescription("See, manage, buy, or sell vehicles")

    			.addSubcommand((subcommand) =>
				subcommand
					.setName('buy')
					.setDescription("Buy a vehicle!")
					.addStringOption((option) =>
						option
							.setName('vehicle')
							.setDescription('What vehicle would you like to buy?')
							.addChoices(
                                { name: '🚲Bike', value: 'bike' },
                                { name: '🚌Bus', value: 'bus' },
                                { name: '🚗Car', value: 'car' },
                                { name: '🚃Train', value: 'train' },
                                { name: '🐎Horse', value: 'horse' },
                                { name: '🏎️Racecar' , value: 'racecar' },
                                { name: '🚤Speedboat', value: 'speedboat' },
                                { name: '✈️Plane', value: 'plane' },
                                { name: '🚀Rocket', value: 'rocket' }
                    )
                    .setRequired(true),
                    )
            )

	.addSubcommand(subcommand =>
		subcommand
			.setName('sell')
			.setDescription('Sell your current vehicle'))

    .addSubcommand(subcommand =>
        subcommand
			.setName('list')
			.setDescription('Lists all the vehicles'))

    .addSubcommand(subcommand =>
        subcommand
			.setName('current')
			.setDescription('Shows you your current vehicle')),

    run: async (client, interaction, args) => {

        async function embeder(veh2, veh, minutes, price){
            if(targetData.moniy < price) return interaction.reply(`You dont have enough moniy to buy a ${veh} (its ${price} moniy):x:`)

            vehObj = 
            {
                veh: veh2,
                min: minutes,
                price: price,
            }

            await profileModel.findOneAndUpdate({userID: user.id,}, 
                {$set: {veh: vehObj,},
            }); 
            
            await profileModel.findOneAndUpdate({
                userID: user.id,},{$inc: { moniy: -price, }
            });

            const embed = new EmbedBuilder()
                .setTitle(`You bought a ${veh2}!`)
                .setDescription(`You bought a nice little ${veh}, now you can finnaly work!\nYour work cooldown is ${minutes} minutes`)
                .setColor("Green")
            interaction.reply({embeds: [embed]})
        }

        let user = interaction.user
        const targetData = await profileModel.findOne({ userID: user.id});
        let tveh = targetData.veh || "none"
            
        if(interaction.options.getSubcommand() == "buy"){

            const vehicle = interaction.options.getString("vehicle")

            if(tveh.veh && tveh.veh != "none")return interaction.reply("You already have vehicle, do `/vehicle sell` if you wan't to sell it, than buy a new one!")
            vehicles.forEach(x=>{
                if(x.smallVeh == vehicle) embeder(x.smallVeh, x.vehicle, x.minutes, x.price)
                return
            })
        }
        
        if(interaction.options.getSubcommand() == "sell"){

            if(!tveh) return interaction.reply('You dont have a vehicle.:x:')
            const dhouse = tveh.veh
            if(dhouse == 'none') return interaction.reply('You dont have a vehicle.:x:')
            let sellingPrice = 0
            let housen = ""

            vehicles.forEach(h=>{
            if(dhouse == h.smallVeh ){
                sellingPrice = h.price * 0.7
                housen = h.upper
            }})
            houseobj = {
                veh: 'none',
                minutes: 200
            }

            await profileModel.findOneAndUpdate({userID: user.id,}, 
                {$set: {veh: houseobj,},
            }); 

            await profileModel.findOneAndUpdate({
                userID: user.id,},{$inc: { moniy: sellingPrice, }
            });

            const etfembed = new EmbedBuilder() 
                .setTitle('You sold your vehicle.')   
                .setDescription(`You sold your ${housen} for ${sellingPrice}💵.`)
                .setColor("Green")
            interaction.reply({embeds: [etfembed]})
        }

        if(interaction.options.getSubcommand() == "list"){
            const seembed = new EmbedBuilder()
                .setTitle('All the vehicles you can buy.')
                .setDescription('If you buy a vehicle you can have a lower cooldown for the **-work** command the better the vehicle the lower the timeout!')
                .setColor("Green")
                .addFields(vehicles.map(h=>{
                    return{
                        name: `${h.upper}`,
                        value: `**Price:** ${h.price} moniy\n**Cooldown:** ${h.minutes} minutes`,
                        inline: true,
                    }
                }))
            interaction.reply({embeds: [seembed]})
        }

        if(interaction.options.getSubcommand() == "current"){
            let housename = "🚶Legs"
            let sallary = 0
            let timeout = "100"
            if(!tveh || tveh.veh == "none" || !tveh.veh){
                housename = "🚶Legs"
                timeout = "100"
            }
            const dhouse = tveh.veh
            vehicles.forEach(h=>{
                if(dhouse == h.smallVeh){
                    housename = h.upper
                    timeout = h.minutes
                }
            })

            const etfembed = new EmbedBuilder() 
                .setTitle('This is your vehicle.')   
                .setDescription(`You have a ${housename}, your timeout is ${timeout.toString()} minutes.`)
                .setColor("Green")
            interaction.reply({embeds: [etfembed]})
        }
    }
}