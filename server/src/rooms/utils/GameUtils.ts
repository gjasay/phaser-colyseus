import { PlayerSchema, PongRoomState } from "../schema/PongRoomState";
import { Entity } from "../types";

export class GameUtils {
  public static getPlayer(state: PongRoomState, sessionId: string): PlayerSchema
  {
    if (sessionId === state.playerOne.sessionId) {
      return state.playerOne;
    } else if (sessionId === state.playerTwo.sessionId) {
      return state.playerTwo;
    } else {
      throw new Error("Player not found");
    }
  }

  public static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static checkCollision(a: Entity, b: Entity) {
    return a.position.x < b.position.x + b.size.x &&
           a.position.x + a.size.x > b.position.x &&
           a.position.y < b.position.y + b.size.y &&
           a.position.y + a.size.y > b.position.y;
  }
}
