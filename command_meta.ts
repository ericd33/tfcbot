import { REST, Routes } from "discord.js";
export const commands = [
  {
    name: "add",
    description: "Addear al pickup.",
  },
  {
    name: "rm",
    description: "Removerte del pickup.",
  },
  {
    name: "st",
    description: "Status of the pickup.",
  },
  {
    name: "clear",
    description: "Vacia la lista",
  },
];

export async function init() {
  if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
    console.error("check .env");
    return;
  }

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    console.log(
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commands,
      }),
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
