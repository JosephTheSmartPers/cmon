const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")

module.exports = {
    ...new SlashCommandBuilder()
    .setName("library")
    .setDescription("Search in all of NASA's images")
    .addStringOption(option => option.setName("q").setDescription("Search in all the fields."))
    .addStringOption(option => option.setName("description").setDescription("Don't write detailed stuff."))
    .addStringOption(option => option.setName("keywords").setDescription("Keywords, sepparate with commas"))
    .addStringOption(option => option.setName("location").setDescription("Where the picture was shot."))
    .addStringOption(option => option.setName("title").setDescription("Title of the picture"))
    .addIntegerOption(option => option.setName("start").setDescription("The start year for results").setMinValue(1960).setMaxValue(2022))
    .addIntegerOption(option => option.setName("end").setDescription("The end year for results").setMinValue(1960).setMaxValue(2022)),

    run: async (client, interaction, args) => {

        interaction.reply(`Searching the internet for pictures <a:loading:1026905223031173150>`)

        let q = args.getString("q")
        let description = args.getString("description")
        let keywords = args.getString("keywords")
        let location = args.getString("location")
        let title = args.getString("title")
        
        let start = args.getInteger("start")
        let end = args.getInteger("end")

        let yourDate = new Date()
        yourDate = yourDate.toISOString().split('T')[0]

        let url = `https://images-api.nasa.gov/search?`

        if(q){
            url += `q=${q.split(" ").join("%20")}`
        }
        if(description){
            if(url.split("")[url.length] != "?") url += `&description=${q.split(" ").join("%20")}`
            else url += `description=${q.split(" ").join("%20")}`
        }
        if(keywords){
            if(url.split("")[url.length] != "?") url += `&keywords=${keywords.split(" ").join("%20")}`
            else url += `keywords=${keywords}`
        }
        if(location){
            if(url.split("")[url.length] != "?") url += `&location=${location.split(" ").join("%20")}`
            else url += `location=${location.split(" ").join("%20")}`
        }
        if(title){
            if(url.split("")[url.length] != "?") url += `&title=${title.split(" ").join("%20")}`
            else url += `title=${title.split(" ").join("%20")}`
        }
        if(start){
            if(url.split("")[url.length] != "?") url += `&year_start=${start}`
            else url += `year_start=${start}`
        }
        if(end){
            if(url.split("")[url.length] != "?") url += `&year_end=${end}`
            else url += `year_end=${end}`
        }

        let satData = ""

        let descarray = []

        let countthing = ""

        let wierdarr = []

        await fetch(url)
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            return response.json()
        })
        .then(data => {
            satData = data
            
        })
        .catch(error => console.log(error))
        satData.collection.items.forEach(async item=>{
        if(item.href.split(" ")[0].includes("audio/")) return
        if(item.href.split(" ")[0].includes("video/")) return
        await fetch(item.href.split(" ")[0])
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            return response.json()
        })
        .then(data => {
            let goodimage = data.find(pic=> pic.includes(".jpg") && pic.includes("large"))
            if(!goodimage) return
            
            wierdarr.push({name: item.data[0].title, value: goodimage})
            
        }).then(thing=>{ 

            wierdarr.forEach(thing=>{
                countthing += `[${thing.name}](${thing.value})\n`
            })
    
                if(4096 >= countthing.length){
                    countthing = ""
                    wierdarr.forEach(thing=>{
                        
                        if(countthing.length + thing.length >= 4096) return
                        countthing += `[${thing.name}](${thing.value})` + "\n"
                    })
                }
    
                console.log(countthing)
                let embed = new EmbedBuilder()
                .setTitle(`Results`)
                .setDescription(
                    countthing
                )
                .setColor("Purple")
                interaction.editReply({content:"",embeds: [embed]})
    
    
            })  
        .catch(error => console.log(item.href))
        
        })
	}
}

