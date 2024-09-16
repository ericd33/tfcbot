import type { CacheType, Interaction } from "discord.js";
import {
  ActionRowBuilder,
  ComponentType,
  StringSelectMenuBuilder,
} from "discord.js";
import { mapsMapperIntoOpts } from "../utils/maps";
import { maps } from "../constants/maps";
import type { Pickup } from "../models/pickup";

export default async function add(
  interaction: Interaction<CacheType>,
  pickup: Pickup,
) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    if (
      pickup.players.some(
        (pickupPlayer) => pickupPlayer.discordId === interaction.user.id,
      )
    ) {
      await interaction.reply("Ya estas en el pickup");
      return;
    }
    // Select map options
    const stringOptions = mapsMapperIntoOpts(maps);

    // Map's menu
    const mapSelectorInput = new StringSelectMenuBuilder()
      .setCustomId("mappick")
      .addOptions(stringOptions);

    //Message row
    const firstActionRow =
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        mapSelectorInput,
      );

    const response = await interaction.reply({
      components: [firstActionRow],
      content: "Si queres sugerir un mapa, seleccionalo",
      ephemeral: true,
    });

    try {
      const collector = response.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 3_600_000,
      });

      collector.on("collect", async (i) => {
        // this gets the map
        // const selection = i.values[0];
        pickup.addPlayer({
          discordName: interaction.user.displayName,
          discordId: interaction.user.id,
        });

        await i.reply({
          embeds: [pickup.getPickupStateAsEmbed()],
          content: `<@&${process.env.PLAYER_ROLE}> ${interaction.user.displayName} se sumo al pickup!`,
        });
      });
    } catch (err) {}
  }
}
