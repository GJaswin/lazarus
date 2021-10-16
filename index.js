const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Lazarus is Online'));

app.listen(port, () => console.log(`Lazarus listening at http://localhost:${port}`));

//main imports
const fs = require('fs');

const { Client, Intents, Collection } = require('discord.js');
const { prefix } = require('./config.json');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();
const cmdFiles = fs.readdirSync('./cmds').filter(cmdfile => cmdfile.endsWith('.js'));

for (const cmdfile of cmdFiles) {
    const cmd = require(`./cmds/${cmdfile}`);
    client.commands.set(cmd.data.name, cmd);
}

//login

const env = require('dotenv').config({ path: "./login.env" });
const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);

client.once('ready', () => {
    console.log("Fired up! - " + client.user.tag);
        client.user.setStatus('idle');
    });

//interaction event
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
      await command.execute(interaction);
  } catch (error) {
      console.error(error);
      await interaction.reply({content: 'Error occured.', ephemeral: true});
  }
});


//message event
var gay = /(i'?m gay)/i;
var straight = /(i'?m straight|i'?m not gay)/i;

client.on('messageCreate', txt => {
//ars

if (!txt.content.startsWith(prefix)) {
    
    if (txt.content.match(gay)) {
        txt.reply('Congrats fag');
    } 

    else if (txt.content.match(straight)) {
        txt.react('🧢');
    }
} 
    
});

