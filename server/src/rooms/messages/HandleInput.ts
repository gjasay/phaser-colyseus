import { Client } from "colyseus";
import { InputMessage } from "../types";
import { GameUtils } from "../utils/GameUtils";
import { MyRoom } from "../MyRoom";

export const handleInput = (room: MyRoom, client: Client, input: InputMessage) => {
  const player = GameUtils.getPlayer(room, client.sessionId);
  const gameArea = room.state.gameArea;
  
  if (input.left && player.x > player.width / 2) {
    player.x -= 1;
  } else if (input.right && player.x < gameArea.width - player.width / 2) {
    player.x += 1;
  }
}
