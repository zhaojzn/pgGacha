const mongoose = require("mongoose");
const botconfig = require("../config.json");
const Discord = require("discord.js");
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
        let xpPercent = (data.xp/data.xpNeeded) * 100;
        xpPercent = xpPercent.toFixed(2);
        let profileEmbed = new Discord.EmbedBuilder()
        .setTitle("Test")
        .setColor('#645f85')
        .setThumbnail(message.author.displayAvatarURL()) // Change to pfp
        .addFields(
            { name: '💫 Level', value: `${data.level}  (${xpPercent}%)`, inline: true},
            { name: '💰 Balance', value: `${data.money}`, inline: true },
        )
        .setTimestamp()
        message.channel.send({embeds: [profileEmbed]});
        return;
    });

}

module.exports.help = {
    name: "profile",
    aliases: ["pr"]
}