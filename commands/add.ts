import type { CacheType, Interaction } from "discord.js";
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
import { mapsMapperIntoOpts } from "../utils/maps";
import { maps } from "../constants/maps";

export default async function Add(interaction: Interaction<CacheType>) {
  const stringOptions = mapsMapperIntoOpts(maps);

  const mapSelectorInput = new StringSelectMenuBuilder()
    .setCustomId("mappick")
    .addOptions(stringOptions);

  const secondActionRow =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      mapSelectorInput,
    );

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
}
