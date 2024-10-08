import type { ChatInputCommandInteraction } from "discord.js";
import type { Pickup } from "../models/pickup";

export default async function st(
  interaction: ChatInputCommandInteraction,
  pickup: Pickup,
) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "st") {
    // Select map options

    await pickup.shoutState(interaction);
  }
}
