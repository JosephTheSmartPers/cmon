/*const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({ path: "COM3", baudRate: 9600 })
const parser = new ReadlineParser()
port.pipe(parser)
*/
const profileModel = require("../models/profileSchema")
module.exports = async (client, person) =>{
    console.log("Setting inventory")
    const profileData = await profileModel.findOne({ userID: person});
    await profileModel.findOneAndUpdate({
        userID: person,
    }, 
    {$set: {
            veh: {
                drugs: profileData.drugs,
                guitar: profileData.guitar,
                broom: profileData.broom,
                tomato: profileData.tomato,
                handgun: profileData.handgun,
                creditcard: profileData.creditcard,
                pen: 0,
            },
            times: {}

        }});
 }