import type { ChatInputCommandInteraction } from "discord.js";
import type { Pickup } from "../models/pickup";

export default async function rm(
  interaction: ChatInputCommandInteraction,
  pickup: Pickup,
) {
  if (interaction.commandName === "rm") {
    // Select map options

    pickup.removePlayer(interaction.user.id);

    await interaction.reply({
      embeds: [pickup.getPickupStateAsEmbed()],
      content: `${interaction.user.displayName} se removio del pickup.`,
    });
  }
}
