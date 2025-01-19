import { PlayerSchema, PongRoomState } from "../schema/PongRoomState";

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
}
