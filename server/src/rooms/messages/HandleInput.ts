import { Client } from "colyseus";
import { InputMessage } from "../../types/messages";
import { GameUtils } from "../utils/GameUtils";
import { MyRoom } from "../MyRoom";

export const handleInput = (room: MyRoom, client: Client, input: InputMessage) => {
  const player = GameUtils.getPlayer(room.state, client.sessionId);
  
  if (input.left) {
    player.position.x -= 1;
  } else if (input.right) {
    player.position.x += 1;
  }
}
