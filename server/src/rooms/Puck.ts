import { Delayed } from "colyseus";
import { PlayerSchema, PuckSchema } from "./schema/PongRoomState";
import { MyRoom } from "./MyRoom";
import { GameUtils } from "./utils/GameUtils";
import { IPaddleSide } from "./types";

interface IDirection {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export class Puck {
  private _room: MyRoom;
  private _state: PuckSchema;
  private _playerOne: PlayerSchema;
  private _playerTwo: PlayerSchema;
  private _movementInterval: Delayed;
  private _speed: number = 3;

  private _direction: IDirection = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  private _p1PaddleCollision: IPaddleSide = {
    left: false,
    right: false,
  };

  private _p2PaddleCollision: IPaddleSide = {
    left: false,
    right: false,
  };

  constructor(room: MyRoom) {
    this._room = room;
    this._state = room.state.puck;
    this._playerOne = room.state.playerOne;
    this._playerTwo = room.state.playerTwo;
  }

  public startMoving() {
    // Clear direction state
    this._direction = { up: false, down: false, left: false, right: false };

    // Randomize the direction of the serve
    if (GameUtils.getRandomInt(1, 2) === 1) {
      this._direction.up = true;
    } else {
      this._direction.down = true;
    }

    // Reset puck position
    this._state.x = 100;
    this._state.y = 100;

    // Puck movement loop
    this._movementInterval = this._room.clock.setInterval(() => {
      const p1Pos = GameUtils.getTopLeftPosition(this._playerOne);
      const p2Pos = GameUtils.getTopLeftPosition(this._playerTwo);

      if (
        this._state.y > p2Pos.y + this._playerTwo.height &&
        this._state.y < p1Pos.y
      ) {
        this.detectPaddleCollision();
      }
      this.move();
    }, 1000 / 60);
  }

  public stopMoving() {
    if (!this._movementInterval?.active) return;
    console.log("Puck stopped moving");
    this._movementInterval.clear();
  }

  private detectPaddleCollision() {
    this._p1PaddleCollision = GameUtils.checkCollision(
      this._state,
      this._playerOne,
    );
    this._p2PaddleCollision = GameUtils.checkCollision(
      this._state,
      this._playerTwo,
    );
  }

  private move() {
    // Collision detection
    if (
      this._p1PaddleCollision.left ||
      this._p1PaddleCollision.right ||
      this._p2PaddleCollision.left ||
      this._p2PaddleCollision.right
    ) {
      this.flipYDirection();
      this._direction.left =
        this._p1PaddleCollision.left || this._p2PaddleCollision.left;
      this._direction.right =
        this._p1PaddleCollision.right || this._p2PaddleCollision.right;
    }

    // Y-axis movement
    if (this._direction.up) {
      this._state.y -= this._speed;
    } else if ( this._direction.down) {
      this._state.y += this._speed;
    }

    if (this._state.y < 0) {
      this._room.state.playerOne.score += 1;
      this.stopMoving();
      GameUtils.startCountdown(this._room, 3, () => this.startMoving());
    } else if (this._state.y > this._room.state.gameArea.height) {
      this._room.state.playerTwo.score += 1;
      this.stopMoving();
      GameUtils.startCountdown(this._room, 3, () => this.startMoving());
    }

    // X-axis movement
    if (this._direction.right) {
      this._state.x += this._speed;
    } else if (this._direction.left) {
      this._state.x -= this._speed;
    }

    if (
      this._state.x - this._state.width / 2 < 0 ||
      this._state.x + this._state.width / 2 > this._room.state.gameArea.width
    ) {
      this.flipXDirection();
    }
  }

  private flipYDirection() {
    this._direction.up = !this._direction.up;
    this._direction.down = !this._direction.down;
  }

  private flipXDirection() {
    this._direction.left = !this._direction.left;
    this._direction.right = !this._direction.right;
  }
}
