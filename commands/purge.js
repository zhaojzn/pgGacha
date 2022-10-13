const Discord = require("discord.js");



module.exports.run = async (client, message, args) => { // team add 3 .. args[1] === addm args[2] === id
    var amount = parseInt(args[0])
    if(!amount) return message.channel.send("Please specifiy the amount of messages you want to delete.")
    if(amount < 0 || amount > 100) return message.channel.send("Please enter a number between 1-100")
    message.channel.bulkDelete(amount).catch(err =>{
        message.channel.send(':x: Due to Discord Limitations, I cannot delete messages older than 14 days')
    })
    let msg = await message.channel.send(`Deleted \`${amount}\` messages`)

}

module.exports.help = {
    name: "purge",
    aliases: ["prg"],
}