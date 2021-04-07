const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Lazarus is Online'));

app.listen(port, () => console.log(`Lazarus listening at http://localhost:${port}`));

//main imports
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix } = require('./config.json');
client.commands = new Discord.Collection();
client.ars = new Discord.Collection();
const cmdFiles = fs.readdirSync('./commands').filter(cmdfile => cmdfile.endsWith('.js'));
const arFiles = fs.readdirSync('./autoresponses').filter(arfile => arfile.endsWith('.js'));

for (const cmdfile of cmdFiles) {
    const cmd = require('./commands/${cmdfile}');
    client.commands.set(cmd.name, cmd);
}

for (const arfile of arFiles) {
    const ar = require('./autoresponses/${arfile}');
    client.ars.set(ar.name, ar);
}

//login

const env = require('dotenv').config({ path: "./login.env" });
const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);

client.once('ready', () => {
    console.log("Fired up! - " + client.user.tag);
        client.user.setActivity('your mom', {
            type: 'WATCHING'
        });
    });

//message events
client.on('message', txt => {

    if (!txt.content.startsWith(prefix) || txt.author.bot) return;

    const args = txt.content.slice(prefix.length).trim().spilt(/ +/);
    const cmd = args.shift().toLowerCase(); 
    
    if (cmd === 'ping') {
        client.commands.get('ping').execute(txt, args); 

    } else if (cmd === 'invite') {
        client.commands.get('invite').execute(txt, args);
    }

});