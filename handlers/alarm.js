/*const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({ path: "COM3", baudRate: 9600 })
const parser = new ReadlineParser()
port.pipe(parser)
*/
module.exports = async (Discord, client) =>{
   /* let on = true 
    let spam = 1
    const guild = client.guilds.cache.get('854979654661832714');
    let role = guild.roles.cache.get("775971844221960222")
    let channel = guild.channels.cache.get("962031410317774868")
    if(on == true)
    await parser.on('data', async function(data){
        
        if(spam > 3) {
            setTimeout(() => {
                spam = 1
            }, (30 * 1000));
            return
            try{ await port.close()}catch(err){

            }
            on = false

        }
        console.log(data)
        channel.send(data + `<@!483519738727759873>`)
        spam++
        
       
    })
*/
}
