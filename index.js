const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Lazarus listening at http://localhost:${port}`));


const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const env = require('dotenv').config({ path: "./login.env" });
const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);

client.once('ready', () => {
    console.log("Fired up! - " + client.user.tag);    
});


client.on('message', txt => {
    if (txt.content === 'lping') {
        txt.channel.send ('pong!');
} 

});