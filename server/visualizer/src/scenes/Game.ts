import { Scene } from "phaser";
import * as Colyseus from "colyseus.js";
import { PongRoomState } from "../schemas/PongRoomState";
import { PlayerSchema } from "../schemas/PlayerSchema";
import { PuckSchema } from "../schemas/PuckSchema";

export class Game extends Scene {
  client: Colyseus.Client;
  room: Colyseus.Room<PongRoomState>;
  p1state: PlayerSchema;
  p2state: PlayerSchema;
  puckState: PuckSchema;
  p1obj: Phaser.GameObjects.Rectangle;
  p2obj: Phaser.GameObjects.Rectangle;
  puckObj: Phaser.GameObjects.Rectangle;

  constructor() {
    super("Game");
  }

  async create() {
    this.client = new Colyseus.Client("ws://localhost:2567");
    await this.connectToServer();

    this.p1state = this.room.state.playerOne;
    this.p2state = this.room.state.playerTwo;
    this.puckState = this.room.state.puck;

    this.room.onMessage("playerId", (id) => console.log(id));

    this.p1obj = this.add.rectangle(0, 0, 0, 0, 0x00000);
    this.p2obj = this.add.rectangle(0, 0, 0, 0, 0x00000);
    this.puckObj = this.add.rectangle(0, 0, 0, 0, 0x00000);

    this.room.state.listen('playerOne', (cur, _prev) => {
      this.p1state = cur;
    });

    this.room.state.listen('playerTwo', (cur, _prev) => {
      this.p2state = cur;
    });

    this.room.state.listen('puck', (cur, _prev) => {
      this.puckState = cur;
    });

    // Player 1
    this.p1state.onChange(() => {
      this.p1obj.setPosition(this.p1state.x, this.p1state.y);
      this.p1obj.setSize(this.p1state.width, this.p1state.height);
    });

    // Player 2
    this.p2state.onChange(() => {
      this.p2obj.setPosition(this.p2state.x, this.p2state.y);
      this.p2obj.setSize(this.p2state.width, this.p2state.height);
    });

    // Puck
    this.puckState.onChange(() => {
      this.puckObj.setPosition(this.puckState.x, this.puckState.y);
      this.puckObj.setSize(this.puckState.width, this.puckState.height);
    });
  }

  update()
  {
    if (!this.room) return;
    this.room.send("input", { left: this.input.keyboard!.addKey('A').isDown, right: this.input.keyboard!.addKey('D').isDown });
  }

  async connectToServer(): Promise<void> {
    try {
      this.room = await this.client.joinOrCreate("pong_room");
      return;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
