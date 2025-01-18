import { Room, Client } from "@colyseus/core";
import { PongRoomState } from "./schema/PongRoomState";

export class MyRoom extends Room<PongRoomState> {
  maxClients = 4;

  onCreate (options: any) {
    this.setState(new PongRoomState());


  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
