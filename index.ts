// import discord.js
import { Client, Events, GatewayIntentBits } from "discord.js";
import { init } from "./command_meta";
import add from "./commands/add";
import { Pickup } from "./models/pickup";
import rm from "./commands/remove";

// create a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const pickup = new Pickup(client);

init();

// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.channel?.id !== process.env.PICKUP_CHANNEL_ID) return;
  await add(interaction, pickup);
  await rm(interaction, pickup);
});

// login with the token from .env.local
client.login(process.env.DISCORD_TOKEN);
