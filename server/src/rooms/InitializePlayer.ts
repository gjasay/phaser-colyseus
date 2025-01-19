import { Client } from "colyseus";
import { MyRoom } from "./MyRoom";
import { PlayerSchema } from "./schema/PongRoomState";

export const initializePlayer = (room: MyRoom, client: Client) => {
  let player: PlayerSchema;

  switch (room.clients.length) {
    case 1:
      player = room.state.playerOne;
      break;
    case 2:
      player = room.state.playerTwo;
      break;
    default:
      console.error("Too many players in room!");
  }
  
  player.sessionId = client.sessionId;
}
