
module.exports = {
    name: "iss",
    description: "Get the position of the ISS",
    cooldown: 0,
    usage: "iss",

    async execute(message, args, cmd, client, Discord) {

               let url = "http://api.open-notify.org/iss-now.json"

                        fetch(url)
                        .then(response => {
                            // indicates whether the response is successful (status code 200-299) or not
                            if (!response.ok) {
                            throw new Error(`Request failed with status ${reponse.status}`)
                            }
                            return response.json()
                        })
                        .then(data => {
                            console.log(data.iss_position)
                            let mapURL = `https://google.com/maps/search/${data.iss_position.latitude}+${data.iss_position.longitude}/@${data.iss_position.latitude},${data.iss_position.longitude}z`

                            let embed = new Discord.EmbedBuilder()
                            .setTitle("Where may the ISS be🚀")
                            .setDescription(mapURL)
                            .setURL(mapURL)
                            .addFields(
                                {name: "Latitude", value: data.iss_position.latitude},
                                {name: "Longitude", value: data.iss_position.longitude},
                            )
                            .setColor("Purple")
                            message.channel.send({embeds: [embed]})
                        })
                        .catch(error => console.log(error))

    }
}