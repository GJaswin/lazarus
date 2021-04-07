module.exports = {
    name: "invite",
    description: "Invite Link",
    execute(txt, args) {
        txt.channel.send ('Invite Link: https://discord.com/api/oauth2/authorize?client_id=813046916920115261&permissions=8&scope=bot');
    }
};