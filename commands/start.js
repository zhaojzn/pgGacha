const mongoose = require("mongoose");
const botconfig = require("../config.json");
const Discord = require("discord.js");
//const { characters, c_characters, b_characters, a_characters, s_characters, ss_characters } = require('../DB/loadData');
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
        if (!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                money: 0,
                specialTickets: 0,
                xp: 0,
                xpNeeded: 20,
                level: 1,
                daily: 0,
                characters: [],
                 
            })
            newData.money += 1000;
            newData.specialTickets += 100;
            newData.save().catch(err => console.log(err));
            // success command
            let SuccessEmbed = new Discord.EmbedBuilder()
            .setColor("#F4E285")
            .setTitle("Account Created!!")
            // Send to channel
            message.channel.send({embeds: [SuccessEmbed]});
            return; 
            }
        else {
            let WarningEmbed = new Discord.EmbedBuilder()
            .setColor('#BC4B51')
            .setTitle('Account already created');
            message.channel.send({embeds: [WarningEmbed]});
            return;
        }
    });
}

module.exports.help = {
    name: "start",
    aliases: ["s"],
}