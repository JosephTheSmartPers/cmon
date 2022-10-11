const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const hastebin = require('hastebin-gen');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("rover")
    .setDescription("Get pictures from one of 3 Mars rovers.")
    .addSubcommand((subcommand) =>
    subcommand
        .setName('curiosity')
        .setDescription("Get data from curiosity")
        .addStringOption((option) => option.setName('camera').setDescription('The camera the picture was taken on').setRequired(true).addChoices(
            {name: "All", value: "all"},
            {name: "Front Hazard Avoidance Camera", value: "FHAZ"},
            {name: "Rear Hazard Avoidance Camera", value: "RHAZ"},
            {name: "Mast Camera", value: "MAST"},
            {name: "Chemistry and Camera Complex", value: "CHEMCAM"},
            {name: "Mars Hand Lens Imager", value: "MAHLI"},
            {name: "Mars Descent Imager", value: "MARDI"},
            {name: "Navigation Camera", value: "NAVCAM"}
        ))
        .addIntegerOption(option => option.setName("sol").setDescription("The solar day the picture was shot").setMinValue(1))
        .addIntegerOption(option => option.setName("year").setDescription("The year the picture was shot.").setMaxValue(2022).setMinValue(2015))
        .addIntegerOption(option => option.setName("month").setDescription("The month the picture was shot.").setMaxValue(12).setMinValue(1))
        .addIntegerOption(option => option.setName("day").setDescription("The day the picture was shot").setMaxValue(31).setMinValue(1))
        .addBooleanOption(option => option.setName("amount").setDescription("Do you wanna see one or all the pictures?")),
    )
    

.addSubcommand((subcommand) =>
    subcommand
        .setName('opportunity')
        .setDescription("Get data from opportunity")
        .addStringOption((option) => option.setName('camera').setDescription('The camera the picture was taken on').setRequired(true).addChoices(
            {name: "All", value: "all"},
            {name: "Front Hazard Avoidance Camera", value: "FHAZ"},
            {name: "Rear Hazard Avoidance Camera", value: "RHAZ"},
            {name: "Navigation Camera", value: "NAVCAM"},
            {name: "Panoramic Camera", value: "PANCAM"},
            {name: "Miniature Thermal Emission Spectrometer", value: "MINITES"},
        ))
        .addIntegerOption(option => option.setName("sol").setDescription("The solar day the picture was shot").setMinValue(1))
        .addIntegerOption(option => option.setName("year").setDescription("The year the picture was shot.").setMaxValue(2022).setMinValue(2015))
        .addIntegerOption(option => option.setName("month").setDescription("The month the picture was shot.").setMaxValue(12).setMinValue(1))
        .addIntegerOption(option => option.setName("day").setDescription("The day the picture was shot").setMaxValue(31).setMinValue(1))
        .addBooleanOption(option => option.setName("amount").setDescription("Do you wanna see one or all the pictures?")),
    )
.addSubcommand(subcommand =>
    subcommand
        .setName('spirit')
        .setDescription('Get data from spirit')
        .addStringOption((option) => option.setName('camera').setDescription('The camera type the picture was taken on').setRequired(true).addChoices(
            {name: "All", value: "all"},
            {name: "Front Hazard Avoidance Camera", value: "FHAZ"},
            {name: "Rear Hazard Avoidance Camera", value: "RHAZ"},
            {name: "Navigation Camera", value: "NAVCAM"},
            {name: "Panoramic Camera", value: "PANCAM"},
            {name: "Miniature Thermal Emission Spectrometer", value: "MINITES"},
        ))
        .addIntegerOption(option => option.setName("sol").setDescription("The solar day the picture was shot").setMinValue(1))
        .addIntegerOption(option => option.setName("year").setDescription("The year the picture was shot.").setMaxValue(2022).setMinValue(2015))
        .addIntegerOption(option => option.setName("month").setDescription("The month the picture was shot.").setMaxValue(12).setMinValue(1))
        .addIntegerOption(option => option.setName("day").setDescription("The day the picture was shot").setMaxValue(31).setMinValue(1))
        .addBooleanOption(option => option.setName("amount").setDescription("Do you wanna see one or all the pictures?")),
    ),

    run: async (client, interaction, args) => {

        await interaction.reply(`Searching the for the APOD <a:loading:1026905223031173150>`)
    

        let year = args.getInteger("year") || "n"
        let month = args.getInteger("month") ||  "n"
        let day = args.getInteger("day") ||  "n"

        let amount = args.getString("amount") || false  

        let format = args.getSubcommand()

        let yourDate = new Date()
        
        yourDate = yourDate.toISOString().split('T')[0]
        yourDate = yourDate.split("-")
        yourDate[1] =  "0" + (yourDate[1] - 4).toString()
        yourDate = yourDate.join("-")

        if(year == "2022" && parseInt(month) > 9) return interaction.editReply(`Ayo I cant see into da future`)

        let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${format}/photos?`

        if(args.getString("camera") != "all"){

            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${format}/photos?camera=${args.getString("camera")}&`
        } 

       if(args.getInteger("sol")){ 
        url = url + `sol=${args.getInteger("sol")}`
    }
       else if(year != "n" && month != "n" && day != "n"){
        url = url + `earth_date=${year}-${month}-${day}`
    } else{
        year = yourDate.split("-")[0]
        month = yourDate.split("-")[1]
        day = yourDate.split("-")[2]
        url = url + `earth_date=${year}-${month}-${day}`
    }


    url = url + `&api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1`
    
    console.log(url)

        await fetch(url)
        .then(response => {
            if(!response.ok){
                return interaction.editReply("something went wrong :(")
            }
            return response.json()
        })
        .then(async data => {
            if(amount == false){
                satData = data.photos
                let longstring = satData.map(photo =>{
                    return `${photo.img_src}`
                })
                let url1
                await hastebin(longstring.join("\n")).then(r => {url1 = r})
                let embed 
                if(satData.length > 25){
                    embed = new EmbedBuilder()
                        .setTitle(`Pictures from ${satData[0].rover.name}`)
                        .setURL(url1)
                        .setDescription("Click on the title for like 25+ pictures")
                        .setColor("Purple")
                        .setFooter({text: `SOL: ${satData[0].sol}\nEarth Day: ${satData[0].earth_date}`})
                }
                else{
                    embed = new EmbedBuilder()
                    .setTitle(`Pictures from ${satData[0].rover.name}`)
                    .addFields(
                        satData.map(photo=>{
                            return {name:`Picture id: \`${photo.id}\`\nCamera: \`${photo.camera.full_name}\``, value:`[Click here for da picture](${photo.img_src})`}
                        })
                    )
        
                    .setColor("Purple")
                    .setImage(satData.img_src)
                    .setFooter({text: `SOL: ${satData[0].sol}\nEarth Day: ${satData[0].earth_date}`})
                }
               return interaction.editReply({content: "", embeds: [embed]})
            }
            satData = data.photos[Math.floor(Math.random() * data.photos.length)]
            console.log(data)
            let embed = new EmbedBuilder()
                .setTitle(`Pictures from ${satData.rover.name}`)
                .addFields(
                    {name: "Earth Date:", value: `${satData.earth_date}`, inline: true},
                    {name: "Mars solar day:", value: `${satData.sol}`, inline: true},
                    {name: "Rover Stats:", value: `Rover ID: ${satData.rover.id}\nLaunch Date: ${satData.rover.launch_date}\nLanding Date: ${satData.rover.landing_date}`},
                    {name: "Camera Stats:", value: `Camera ID: ${satData.camera.id}\nCamera Type: ${satData.camera.full_name}`}
                )
                    
                .setColor("Purple")
                .setImage(satData.img_src)
                .setFooter({text: `ID: ${satData.id}`})
                interaction.editReply({content: "", embeds: [embed]})    
        })
        .catch(error => {
            console.log(error) 
            return interaction.editReply("No pictures for this ):")
        })
        
        


	}
}

