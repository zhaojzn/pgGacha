const mongoose = require("mongoose");
const botconfig = require("../config.json");
const Discord = require("discord.js");
const fs = require('fs')

//connect to db
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Data = require("../models/data.js");


module.exports.run = async (client, message, args) => {
    Data.findOne({
        userID: message.author.id 
    }, (err, data) => {
        // Check if user started game
        if (!data) {
            let WarningEmbed = new Discord.EmbedBuilder()
            .setColor('#D62828')
            .setTitle("You need to create a profile")
            message.channel.send({embeds: [WarningEmbed]})
            return;
        }
        if(!args[0])
        {
            data.characters.sort((a,b) => (a.id > b.id) ? 1: -1);
            let invString = ``
            if(data.characters.length > 0)
            {
                for (let i = 0; i < data.characters.length; i++) {
                    invString += `\`${data.characters[i].name} (id: ${data.characters[i].id})\` - Amount (x${data.characters[i].issues.length})\n `
                }
                let embed = new Discord.EmbedBuilder()
                .setColor('#D62828')
                .addFields(
                    { name: '💫 Inventory', value: invString, inline: true},
                )
                message.channel.send({embeds: [embed]})
            }
        }else if(!isNaN(args[0])){
            
        }


        return;
    });
}

module.exports.help = {
    name: "inventory",
    aliases: ["inv"],
}