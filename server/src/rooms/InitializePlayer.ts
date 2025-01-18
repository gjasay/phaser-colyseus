import { Client } from "colyseus";
import { MyRoom } from "./MyRoom";
import { GameUtils } from "./utils/GameUtils";
import { PlayerSchema } from "./schema/PongRoomState";

export const initializePlayer = (room: MyRoom, client: Client) => {
  let player: PlayerSchema;

  switch (room.clients.length) {
    case 1:
      player = room.state.playerOne;
      player.position.y = 10;
      break;
    case 2:
      player = room.state.playerTwo;
      player.position.y = 90;
      break;
    default:
      console.error("Too many players in room!");
  }

  player.sessionId = client.sessionId;
};
