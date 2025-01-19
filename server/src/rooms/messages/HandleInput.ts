import { Client } from "colyseus";
import { InputMessage } from "../types";
import { GameUtils } from "../utils/GameUtils";
import { MyRoom } from "../MyRoom";

export const handleInput = (room: MyRoom, client: Client, input: InputMessage) => {
  const player = GameUtils.getPlayer(room.state, client.sessionId);
  const gameArea = room.state.gameArea;
  
  if (input.left && player.position.x > -gameArea.width) {
    player.position.x -= 1;
  } else if (input.right && player.position.x < gameArea.width - player.size.x) {
    player.position.x += 1;
  }
}
