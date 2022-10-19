const path = require('path');
const fs = require('fs');

const characters = JSON.parse(fs.readFileSync(path.join(__dirname, './characters.json')));
const common = characters.filter(el => el.rarity == "Common");
const rare = characters.filter(el => el.rarity == "Rare");

module.exports = {
    characters,
    common,
    rare,
};