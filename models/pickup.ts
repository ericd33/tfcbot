import type { Client } from "discord.js";
export type PlayerPickupInfo = {
  discordName: string;
  discordId: string;
};

export class Pickup {
  players: PlayerPickupInfo[];
  client: Client;

  constructor(client: Client) {
    this.players = [];
    this.client = client;
  }

  addPlayer(player: PlayerPickupInfo) {
    this.players.push(player);
  }

  removePlayer(playerDiscordId: string) {
    this.players = this.players.filter((p) => p.discordId !== playerDiscordId);
  }

  async shoutState() {
    const channelId = process.env.PICKUP_CHANNEL_ID as string;
    const channel = await this.client.channels.fetch(channelId);

    if (channel && channel.isSendable()) {
      const playerNames = this.players.map((player) => player.discordName);

      channel.send(`Pickup ${this.players.length}/8 ${playerNames.toString()}`);
    }
  }
}
