const mongoose = require("mongoose");
const botconfig = require("../config.json");
const Discord = require("discord.js");
const fs = require('fs')
//connect to db
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const path = require('path');

const { common, rare, characters } = require('../data/loadData.js');

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
        let result = randomChance();
        let card;
         switch(result) {
            case 1: card = randomCard(common); break;
            case 2: card = randomCard(rare); break;
        } 
        card.issue++;

        for (let i = 0; i < data.characters.length; i++) {
            if (data.characters[i].id === card.id) {
                data.characters[i].issues.push({issue: card.issue})


                let cardEmbed = new Discord.EmbedBuilder()
                .setColor(embedColor(card.rarity))
                .setTitle(`${card.name} (#${card.issue})`) // {c_characters[0].name JSON.stringify(randomCard(c_characters).name) 
                .setDescription(`*${card.description}*`)
                .addFields(
                    { name: '⚔️ **Rarity**', value: `${card.rarity}`, inline: true },
                )
                .setImage(card.thumbnail);
                cardEmbed.setFooter({text: `${data.name} pulled a another card! \n(id: ${card.id})`, iconURL: message.author.displayAvatarURL()});
                message.channel.send({embeds: [cardEmbed]});
                data.save().catch(err => console.log(err));
                return;
            }
        }
        //Player does not have this card
        data.characters.push({ name: card.name, 
                                id: card.id, 
                                rarity: card.rarity, 
                                description: card.description, 
                                issues: {
                                    issue: card.issue
                                }
                               });
        data.save().catch(err => console.log(err));

        fs.writeFile(path.join(__dirname, '../data/characters.json'), JSON.stringify(common), err =>{
            if(err) console.log(err);
        })
        let cardEmbed = new Discord.EmbedBuilder()
        .setColor(embedColor(card.rarity))
        .setTitle(`${card.name} (#${card.issue})`) // {c_characters[0].name JSON.stringify(randomCard(c_characters).name) 
        .setDescription(`*${card.description}*`)
        .addFields(
            { name: '⚔️ **Rarity**', value: `${card.rarity}`, inline: true },
        )
        .setImage(card.thumbnail);
        cardEmbed.setFooter({text: `${data.name} pulled a new card! \n(id: ${card.id})`, iconURL: message.author.displayAvatarURL()});
        message.channel.send({embeds: [cardEmbed]});

        return;
        
    });

}

function randomCard(arr) { // Randomly select from characters within rarity
    return arr[Math.floor(Math.random() * arr.length)];
}

function embedColor(string){
    if(string.toLowerCase() == "common"){
        return "#5a5d61"
    }
    if(string.toLowerCase() == "rare"){
        return "#21b4d1"
    }
    if(string.toLowerCase() == "epic"){
        return "#6231cc"
    }
    if(string.toLowerCase() == "legendary"){
        return "#c9a820"
    }
}

function randomChance(){
    let chance = Math.random() * 100;
    if(chance > 80){
        return 2;
    }else{
        return 1;
    }

}

module.exports.help = {
    name: "drop",
    aliases: ["drop"],
}