import { Room, Client } from "@colyseus/core";
import { PongRoomState } from "./schema/PongRoomState";
import { handleInput } from "./messages/HandleInput";
import { InputMessage } from "../types/messages";
import { initializePlayer } from "./InitializePlayer";

export class MyRoom extends Room<PongRoomState> {
  public maxClients = 2;

  onCreate (options: any) {
    this.setState(new PongRoomState());

    this.onMessage("input", (client, input: InputMessage) => handleInput(this, client, input));
  }

  onJoin (client: Client, _options: any) {
    console.log(client.sessionId, "joined!");
    client.send("playerId", this.clients.length);
    console.log("playerId set:", this.clients.length);

    initializePlayer(this, client);
  }

  onLeave (client: Client, _consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
