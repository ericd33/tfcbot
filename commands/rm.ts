import type { CacheType, Interaction } from "discord.js";
import type { Pickup } from "../models/pickup";

export default async function rm(
  interaction: Interaction<CacheType>,
  pickup: Pickup,
) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "rm") {
    // Select map options

    pickup.removePlayer(interaction.user.id);

    await interaction.reply({
      embeds: [pickup.getPickupStateAsEmbed()],
      content: `${interaction.user.displayName} se removio del pickup.`,
    });
  }
}
