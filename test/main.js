import { Client } from "../lib/index.js";

const client = new Client("http://localhost:90", "123456789");

client.registerCommand({
    name: "test",
    type: 1,
    description: "This is a test!"
});

client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    message.channel.sendMessage({ content: "hi" }).then(m => {
        m.addReaction("🙂");
    });
    client.members?.get(message.author.id).addRole("1286807904824987719");
});

client.on("interactionCreate", (interaction) => {
    interaction.reply({ content: "Testing!" });
});