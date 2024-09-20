import type { ChatInputCommandInteraction } from "discord.js";
import type { Pickup } from "../models/pickup";

export default async function add(
  interaction: ChatInputCommandInteraction,
  pickup: Pickup,
) {
  if (interaction.commandName === "add") {
    if (
      pickup.players.some(
        (pickupPlayer) => pickupPlayer.discordId === interaction.user.id,
      )
    ) {
      await interaction.reply("Ya estas en el pickup");
      return;
    }

    pickup.addPlayer(
      {
        discordName: interaction.user.displayName,
        discordId: interaction.user.id,
      },
      interaction,
    );

    await interaction.reply({
      embeds: [pickup.getPickupStateAsEmbed()],
      content: `<@&${process.env.PLAYER_ROLE}> ${interaction.user.displayName} se sumo al pickup!`,
    });
  }
}
