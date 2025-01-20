import { Room, Client, Delayed } from "@colyseus/core";
import { PongRoomState } from "./schema/PongRoomState";
import { handleInput } from "./messages/HandleInput";
import { InputMessage } from "./types";
import { initializePlayer } from "./InitializePlayer";
import { Puck } from "./Puck";
import { GameUtils } from "./utils/GameUtils";

export class MyRoom extends Room<PongRoomState> {
  public maxClients = 2
  private puck: Puck;

  onCreate(_options: any) {
    this.setState(new PongRoomState());
    this.puck = new Puck(this);

    this.onMessage("input", (client, input: InputMessage) =>
      handleInput(this, client, input),
    );
  }

  onJoin(client: Client, _options: any) {
    console.log(client.sessionId, "joined!");
    client.send("playerId", this.clients.length);
    console.log("playerId set:", this.clients.length);

    if (this.clients.length === 2) {
      GameUtils.startCountdown(this, 3, () => this.start());
    }

    initializePlayer(this, client);
  }

  onLeave(client: Client, _consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  start() {
    console.log("Game started!");
    this.puck.startMoving();
  }
}
