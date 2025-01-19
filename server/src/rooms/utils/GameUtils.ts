import { MyRoom } from "../MyRoom";
import { PlayerSchema, PongRoomState } from "../schema/PongRoomState";
import { IEntity, IPaddleSide, IVector2 } from "../types";

export class GameUtils {
  public static getPlayer(room: MyRoom, sessionId: string): PlayerSchema {
    const state: PongRoomState = room.state;

    if (sessionId === state.playerOne.sessionId) {
      return state.playerOne;
    } else if (sessionId === state.playerTwo.sessionId) {
      return state.playerTwo;
    } else {
      console.error("Cannot find player with sessionId: " + sessionId);
      room.disconnect();
    }
  }

  public static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static checkCollision(puck: IEntity, paddle: IEntity): IPaddleSide {
    const paddleSide: IPaddleSide = { left: false, right: false };

    const puckPos: IVector2 = this.getTopLeftPosition(puck);
    const paddlePos: IVector2 = this.getTopLeftPosition(paddle);

    if (
      puckPos.x < paddlePos.x + paddle.width &&
      puckPos.x + puck.width > paddlePos.x &&
      puckPos.y < paddlePos.y + paddle.height &&
      puckPos.y + puck.height > paddlePos.y
    ) {
      if (puckPos.x < paddlePos.x + paddle.width / 2) {
        paddleSide.left = true;
      } else {
        paddleSide.right = true;
      }
      console.log(paddleSide);
    }


    return paddleSide;
  }

  public static getTopLeftPosition(entity: IEntity): IVector2 {
    return { x: entity.x - entity.width / 2, y: entity.y - entity.height / 2 };
  }
}
