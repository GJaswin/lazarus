const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Lazarus is Online'));

app.listen(port, () => console.log(`Lazarus listening at http://localhost:${port}`));


const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of cmdFiles) {
    const command = require ('./commands/${file}');
    client.commands.set(command.name, command);
}

const env = require('dotenv').config({ path: "./login.env" });
const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);

client.once('ready', () => {
    console.log("Fired up! - " + client.user.tag);
        client.user.setActivity('your mom', {
            type: 'WATCHING'
        });
    });


client.on('message', txt => {

    if (txt.author.bot) return;
    
    var gay = /(im gay|i'm gay)/i;
    var gaytest = txt.content.match(gay);

var straight = /(im straight|i'm straight)/i;
var straighttest = txt.content.match(straight);


    if (txt.content === 'l.ping') {
        txt.channel.send ('pong!');
        return;
    }

else if (txt.content === 'l.invite') {
    txt.channel.send ('Invite Link: https://discord.com/api/oauth2/authorize?client_id=813046916920115261&permissions=8&scope=bot');
    return;
}

else if (txt.content = gaytest) {
    txt.reply('Congrats fag');
    return;
}

else if (txt.content = straighttest) {
    txt.react('🧢');
    return;
}

});