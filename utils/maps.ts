import { StringSelectMenuOptionBuilder } from "discord.js";
import type { MapsInfo } from "../constants/maps";

// takes an array of map, returns an array of options to put in
// a string select
export function mapsMapperIntoOpts(maps: MapsInfo) {
  return maps.map((map) => {
    return new StringSelectMenuOptionBuilder()
      .setLabel(map.name)
      .setDescription(map.description)
      .setValue(map.description);
  });
}
