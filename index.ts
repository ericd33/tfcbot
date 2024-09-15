// import discord.js
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  ComponentType,
  Events,
  GatewayIntentBits,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { init } from "./commands";

// create a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

init();

const mapInput = new StringSelectMenuOptionBuilder()
  .setLabel("openfire_lowgrens")
  .setDescription("4v4")
  .setValue("openfire_lowgrens");

const mapSelectorInput = new StringSelectMenuBuilder()
  .setCustomId("mappick")
  .addOptions(mapInput);

const submitButton = new ButtonBuilder()
  .setCustomId("mybutton")
  .setLabel("Confirmar")
  .setStyle(ButtonStyle.Success);

const firstActionRow =
  new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    mapSelectorInput,
  );
const secondActionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
  submitButton,
);

const maps = ["openfire_lowgrens", "schtop", "phantom_lg"];

// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const response = await interaction.reply({
      components: [firstActionRow, secondActionRow],
      content: "conte",
      ephemeral: true,
    });

    try {
      const collector = response.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 3_600_000,
      });

      collector.on("collect", async (i) => {
        const selection = i.values[0];
        await i.reply(`seleccionaste ${selection}!`);
      });
      console.log("a");
    } catch (err) {}
  }
});

// login with the token from .env.local
client.login(process.env.DISCORD_TOKEN);

