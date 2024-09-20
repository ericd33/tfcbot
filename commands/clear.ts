import type { ChatInputCommandInteraction } from "discord.js";
import type { Pickup } from "../models/pickup";

export default async function clear(
  interaction: ChatInputCommandInteraction,
  pickup: Pickup,
) {
  if (interaction.commandName === "clear") {
    pickup.clear();
    pickup.shoutState(interaction);
  }
}
