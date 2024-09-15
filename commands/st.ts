import type { CacheType, Interaction } from "discord.js";
import type { Pickup } from "../models/pickup";

export default async function rm(
  interaction: Interaction<CacheType>,
  pickup: Pickup,
) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "st") {
    // Select map options

    await pickup.shoutState();
  }
}
