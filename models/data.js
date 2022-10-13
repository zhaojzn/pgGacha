const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    // types of data we want
    name: String,
    userID: String,
    money: Number,
    xp: Number,
    xpNeeded: Number,
    level: Number,
    daily: Number,
    characters: [ {
        name: String,
        id: Number,
        rarity: String,
        description: String,
        issues: [{
            issue: Number,
            }]
        }],
})

module.exports = mongoose.model("Data", dataSchema);