const botconfig = require("../config.json");
const Discord = require("discord.js");



module.exports.run = async (client, message, args) => {
    let embed = new Discord.EmbedBuilder()
    .setTitle("Commands")
    .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley")
    .addFields( {name: 'User', value: '\`start\` - Generate your profile\n\`profile\` - User profile information\n\`inventory(inv)\` - Characters owned list\n\`balance\` - w.i.p'},
                {name: 'Admin', value: '\`purge\` - Mass remove messages '})
    return message.channel.send({embeds: [embed]})

}

module.exports.help = {
    name: "help",
    aliases: ["?"],
}