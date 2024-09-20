import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  type Client,
} from "discord.js";
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

  addPlayer(player: PlayerPickupInfo, i: ChatInputCommandInteraction) {
    if (this.players.includes(player)) {
      i.reply("Ya estas en el pickup.");
    }
    this.players.push(player);
  }

  removePlayer(playerDiscordId: string) {
    this.players = this.players.filter((p) => p.discordId !== playerDiscordId);
  }

  getPickupStateAsEmbed() {
    const playerNames = this.players.map((player) => {
      return { name: "\u200b", value: player.discordName };
    });
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`TFC Pickup ${this.players.length}/8`)
      .setDescription("Se viene el pickup...")
      .addFields(...playerNames);

    return embed;
  }
  async clear() {
    this.players = [];
  }

  async shoutState(interaction: ChatInputCommandInteraction) {
    const channelId = process.env.PICKUP_CHANNEL_ID as string;
    const channel = await this.client.channels.fetch(channelId);

    if (channel && channel.isSendable()) {
      const embed = this.getPickupStateAsEmbed();
      return interaction.reply({ embeds: [embed] });
    }
  }
}
