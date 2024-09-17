module.exports = {
    permissions: ["SPEAK"],
    name: 'disable',
    aliases: [], 
    cooldown: 0,
        description: 'Set bots status',
    async execute(message, args, cmd, client, Discord){
        console.log("hi")
        if(message.author.id != "483519738727759873") return message.reply("wtf bro")
        try{
            const { SerialPort, ReadlineParser } = require('serialport')
            const port = await new SerialPort({ path: "COM3", baudRate: 9600 })
const parser = await new ReadlineParser()
await port.pipe(parser)
await port.write('STOP')

        }catch(err){
            console.log(err)
        }
        setTimeout(async() => {
            try{ await port.close()}catch(err){

            }
        }, 5000);

    }
}