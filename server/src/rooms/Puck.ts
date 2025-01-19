import { Delayed } from "colyseus";
import { PlayerSchema, PuckSchema } from "./schema/PongRoomState";
import { MyRoom } from "./MyRoom";
import { GameUtils } from "./utils/GameUtils";

interface IDirection {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export class Puck {
  private room: MyRoom;
  private state: PuckSchema;
  private playerOne: PlayerSchema;
  private playerTwo: PlayerSchema;
  private movementInterval: Delayed;
  private direction: IDirection = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  constructor(room: MyRoom) {
    this.room = room;
    this.state = room.state.puck;
    this.playerOne = room.state.playerOne;
    this.playerTwo = room.state.playerTwo;
  }

  startMoving() {
    if (GameUtils.getRandomInt(1, 2) === 1) {
      this.direction.up = true;
    } else {
      this.direction.down = true;
    }

    this.state.position.x = -30;

    this.movementInterval = this.room.clock.setInterval(() => {
      this.move();
      if (GameUtils.checkCollision(this.playerOne, this.state)) console.log("SMASHED INTO PLAYER ONE");
      if (GameUtils.checkCollision(this.playerTwo, this.state)) console.log("SMASHED INTO PLAYER TWO");
    }, 1000 / 60);
  }
  stopMoving() {
    if (!this.movementInterval?.active) return;
    this.movementInterval.clear();
  }

  move() {
    if (
      this.direction.up &&
      this.state.position.y <
        this.room.state.gameArea.height - this.state.size.y
    ) {
      this.state.position.y += 1;
    } else if (
      this.direction.down &&
      this.state.position.y > -this.room.state.gameArea.height
    ) {
      this.state.position.y -= 1;
    }

    if (this.direction.right) {
      this.state.position.x += 1;
    } else if (this.direction.left) {
      this.state.position.x -= 1;
    }
  }
}
