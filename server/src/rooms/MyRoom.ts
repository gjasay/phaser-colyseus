import { Room, Client } from "@colyseus/core";
import { PongRoomState } from "./schema/PongRoomState";

export class MyRoom extends Room<PongRoomState> {
  public maxClients = 2;

  onCreate (options: any) {
    this.setState(new PongRoomState());


  }

  onJoin (client: Client, _options: any) {
    console.log(client.sessionId, "joined!");
    client.send("playerId", this.clients.length);
    console.log("playerId set:", this.clients.length);
  }

  onLeave (client: Client, _consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
